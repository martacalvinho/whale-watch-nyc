
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Building, Filter } from "lucide-react";

const MapView = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Property Map</h1>
        <p className="text-muted-foreground">
          Visualize real estate investments across NYC
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Map Filters</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Borough</label>
                <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2">
                  <option>All Boroughs</option>
                  <option>Manhattan</option>
                  <option>Brooklyn</option>
                  <option>Queens</option>
                  <option>Bronx</option>
                  <option>Staten Island</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Property Type</label>
                <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2">
                  <option>All Types</option>
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Mixed-Use</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Price Range</label>
                <div className="flex gap-2 mt-1">
                  <input 
                    type="text" 
                    placeholder="Min" 
                    className="w-1/2 rounded-md border border-input bg-background px-3 py-2"
                  />
                  <input 
                    type="text" 
                    placeholder="Max" 
                    className="w-1/2 rounded-md border border-input bg-background px-3 py-2"
                  />
                </div>
              </div>
              <Button className="w-full">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
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
                
                {/* Property markers */}
                <div className="absolute left-[45%] top-[30%] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <MapPin className="h-8 w-8 text-red-500" fill="rgba(239, 68, 68, 0.2)" />
                    <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white"></div>
                  </div>
                </div>
                
                <div className="absolute left-[55%] top-[35%] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <MapPin className="h-8 w-8 text-blue-500" fill="rgba(59, 130, 246, 0.2)" />
                    <div className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 rounded-full border-2 border-white"></div>
                  </div>
                </div>
                
                <div className="absolute left-[65%] top-[50%] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <Building className="h-8 w-8 text-green-500" />
                    <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                </div>

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
          <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm p-6 text-center">
            <p className="text-md font-medium">
              Interactive map coming soon!
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Will feature property heatmaps, investment hotspots, and detailed transaction data.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MapView;
