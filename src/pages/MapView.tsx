
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Building, Filter, DollarSign, Calendar, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Define property sale type
interface PropertySale {
  id: number;
  document_id: string;
  property_address: string;
  borough: string;
  document_amt: number;
  document_date: string;
  property_type: string;
  block: number;
  lot: number;
}

const MapView = () => {
  const [selectedBorough, setSelectedBorough] = useState<string>("All Boroughs");
  const [selectedType, setSelectedType] = useState<string>("All Types");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [propertySales, setPropertySales] = useState<PropertySale[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProperty, setSelectedProperty] = useState<PropertySale | null>(null);

  useEffect(() => {
    fetchPropertyData();
  }, []);

  const fetchPropertyData = async () => {
    setLoading(true);
    try {
      // Fetch 10 most recent property sales with amount > 0
      let query = supabase
        .from('property_sales')
        .select('*')
        .order('recorded_datetime', { ascending: false })
        .gt('document_amt', 0)
        .limit(10);
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      setPropertySales(data || []);
      
      // Set a sample property as selected for demo purposes
      if (data && data.length > 0) {
        setSelectedProperty(data[0]);
      }
    } catch (error) {
      console.error("Error fetching property data:", error);
      toast.error("Failed to load property data");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('property_sales')
        .select('*')
        .order('recorded_datetime', { ascending: false })
        .gt('document_amt', 0)
        .limit(50);
      
      // Apply borough filter
      if (selectedBorough !== "All Boroughs") {
        query = query.eq('borough', selectedBorough);
      }
      
      // Apply property type filter
      if (selectedType !== "All Types") {
        query = query.eq('property_type', selectedType);
      }
      
      // Apply price range filters
      if (minPrice) {
        query = query.gte('document_amt', parseFloat(minPrice) * 1000000); // Convert to millions
      }
      if (maxPrice) {
        query = query.lte('document_amt', parseFloat(maxPrice) * 1000000); // Convert to millions
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      setPropertySales(data || []);
      toast.success("Filters applied successfully");
      
      // Reset selected property when filters change
      setSelectedProperty(null);
    } catch (error) {
      console.error("Error applying filters:", error);
      toast.error("Failed to apply filters");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Property Map</h1>
        <p className="text-muted-foreground">
          Visualize real estate investments across NYC with data from NYCDB
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Map Filters</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Borough</label>
                <select 
                  className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2"
                  value={selectedBorough}
                  onChange={(e) => setSelectedBorough(e.target.value)}
                >
                  <option>All Boroughs</option>
                  <option>MANHATTAN</option>
                  <option>BROOKLYN</option>
                  <option>QUEENS</option>
                  <option>BRONX</option>
                  <option>STATEN ISLAND</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Property Type</label>
                <select 
                  className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option>All Types</option>
                  <option>RESIDENTIAL</option>
                  <option>COMMERCIAL</option>
                  <option>MIXED-USE</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Price Range (in millions)</label>
                <div className="flex gap-2 mt-1">
                  <input 
                    type="text" 
                    placeholder="Min" 
                    className="w-1/2 rounded-md border border-input bg-background px-3 py-2"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <input 
                    type="text" 
                    placeholder="Max" 
                    className="w-1/2 rounded-md border border-input bg-background px-3 py-2"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
              <Button className="w-full" onClick={applyFilters} disabled={loading}>
                <Filter className="w-4 h-4 mr-2" />
                {loading ? 'Applying...' : 'Apply Filters'}
              </Button>
            </div>

            {propertySales.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">Recent Transactions</h3>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                  {propertySales.map((property) => (
                    <div 
                      key={property.id}
                      className={`p-2 rounded-md cursor-pointer text-xs border ${
                        selectedProperty?.id === property.id 
                          ? 'bg-blue-50 border-blue-200' 
                          : 'hover:bg-gray-50 border-gray-100'
                      }`}
                      onClick={() => setSelectedProperty(property)}
                    >
                      <div className="font-medium truncate">{property.property_address || 'Address not available'}</div>
                      <div className="flex justify-between mt-1">
                        <span className="text-muted-foreground">{property.borough}</span>
                        <span className="font-semibold">{formatCurrency(property.document_amt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
        
        <Card className="flex-1 h-[calc(100vh-16rem)] animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="h-full w-full bg-gray-100 relative">
              {/* NYC Map mockup */}
              <div className="absolute inset-0 bg-[#E9EDF1]">
                {/* Manhattan outline shape */}
                <div className="absolute left-1/2 top-1/3 w-16 h-48 bg-[#D1D9E2] rounded-lg transform -translate-x-1/2 -rotate-12"></div>
                
                {/* Brooklyn/Queens shape */}
                <div className="absolute left-2/3 top-1/2 w-32 h-32 bg-[#D1D9E2] rounded-lg transform -translate-x-1/2"></div>
                
                {/* Water */}
                <div className="absolute inset-0 bg-[#A4C8E1] opacity-20"></div>
                
                {/* Property markers - dynamically render based on filtered data */}
                {propertySales.map((property, index) => {
                  // Calculate marker position based on borough
                  // This is a simplified approach - a real implementation would use geocoding
                  let left = "50%";
                  let top = "40%";
                  
                  if (property.borough === "MANHATTAN") {
                    left = `${45 + (index % 5)}%`;
                    top = `${30 + (index % 5)}%`;
                  } else if (property.borough === "BROOKLYN") {
                    left = `${55 + (index % 5)}%`;
                    top = `${50 + (index % 5)}%`;
                  } else if (property.borough === "QUEENS") {
                    left = `${65 + (index % 5)}%`;
                    top = `${40 + (index % 5)}%`;
                  } else if (property.borough === "BRONX") {
                    left = `${45 + (index % 5)}%`;
                    top = `${20 + (index % 5)}%`;
                  } else if (property.borough === "STATEN ISLAND") {
                    left = `${35 + (index % 5)}%`;
                    top = `${60 + (index % 5)}%`;
                  }
                  
                  return (
                    <div 
                      key={property.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer"
                      style={{ left, top }}
                      onClick={() => setSelectedProperty(property)}
                    >
                      <div className="relative group">
                        <MapPin 
                          className={`h-8 w-8 ${
                            selectedProperty?.id === property.id 
                              ? 'text-red-500 scale-125' 
                              : 'text-blue-500 hover:scale-110'
                          }`} 
                          fill={selectedProperty?.id === property.id ? "rgba(239, 68, 68, 0.2)" : "rgba(59, 130, 246, 0.2)"} 
                        />
                        <div className={`absolute -top-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                          selectedProperty?.id === property.id ? 'bg-red-500' : 'bg-blue-500'
                        }`}></div>
                        <div className="absolute opacity-0 group-hover:opacity-100 bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none transition-opacity">
                          {formatCurrency(property.document_amt)}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Heatmap gradient overlay */}
                <div className="absolute left-[45%] top-[30%] w-24 h-24 bg-red-500 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute left-[65%] top-[50%] w-32 h-32 bg-green-500 rounded-full opacity-10 blur-xl"></div>
                
                {/* Legend */}
                <div className="absolute bottom-4 right-4 bg-white p-3 rounded-md shadow-md">
                  <div className="text-sm font-medium mb-2">Property Density</div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-16 bg-gradient-to-r from-green-200 via-yellow-200 to-red-300 rounded"></div>
                    <div className="flex justify-between w-full text-xs">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Property Detail Panel */}
          {selectedProperty ? (
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-bold mb-2 flex items-center">
                    <Building className="mr-2 h-5 w-5 text-blue-500" />
                    {selectedProperty.property_address || 'Address not available'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Block: {selectedProperty.block}, Lot: {selectedProperty.lot} • {selectedProperty.borough}
                  </p>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {formatCurrency(selectedProperty.document_amt)}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(selectedProperty.document_date)}
                    </Badge>
                    {selectedProperty.property_type && (
                      <Badge variant="outline">
                        {selectedProperty.property_type}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Search className="h-4 w-4 mr-2" />
                    View Property Details
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm p-6 text-center">
              <p className="text-md font-medium">
                {loading ? 'Loading property data...' : propertySales.length > 0 ? 'Select a property marker to view details' : 'No properties found matching your criteria'}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {propertySales.length > 0 ? 'Explore NYC real estate transactions using filters and the interactive map' : 'Try adjusting your filters to see more properties'}
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MapView;
