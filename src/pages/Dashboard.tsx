
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Building, Users, DollarSign, Briefcase, TrendingUp, MapPin } from "lucide-react";
import { DataImporter } from "@/components/DataImporter";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Dashboard Page
const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalTransactions: 0,
    activeInvestors: 0,
    averagePrice: 0,
    totalProperties: 0,
    topInvestors: [],
    investmentHotspots: [],
    boroughDistribution: [],
    monthlyTransactions: [],
    priceRangeDistribution: [],
    assetClassTrends: []
  });

  const fetchDashboardData = async () => {
    try {
      // First, check if we have any data
      const { count } = await supabase
        .from('property_sales')
        .select('*', { count: 'exact', head: true });
      
      if (!count || count === 0) {
        // No data yet, so we don't try to load anything else
        setDataLoaded(true);
        return;
      }
      
      // We have data, let's get dashboard metrics
      // For a real implementation, these would be separate queries optimized for each data point
      // For now, we'll simulate with the data we have and transform it
      
      // Count transactions
      const { data: propertyData, error: propertyError } = await supabase
        .from('property_sales')
        .select('*')
        .order('document_date', { ascending: false })
        .limit(1000);  // Get recent data for analysis
      
      if (propertyError) throw propertyError;
      
      // Process the data we fetched
      const transformedData = processPropertyData(propertyData || []);
      setDashboardData(transformedData);
      setDataLoaded(true);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
      setDataLoaded(true);
    }
  };

  // Process the property data to extract dashboard metrics
  const processPropertyData = (data: any[]) => {
    if (!data.length) return {
      totalTransactions: 0,
      activeInvestors: 0,
      averagePrice: 0,
      totalProperties: 0,
      topInvestors: [],
      investmentHotspots: [],
      boroughDistribution: [],
      monthlyTransactions: [],
      priceRangeDistribution: [],
      assetClassTrends: []
    };
    
    // Count total transactions
    const totalTransactions = data.length;
    
    // Calculate average price
    const totalValue = data.reduce((sum, item) => sum + (Number(item.document_amt) || 0), 0);
    const averagePrice = totalValue / totalTransactions;
    
    // Get unique properties (by block/lot combo)
    const uniqueProperties = new Set(data.map(item => `${item.block}-${item.lot}`));
    const totalProperties = uniqueProperties.size;
    
    // Count document IDs as "investors" for simulation purposes
    const investorCounts: Record<string, number> = {};
    data.forEach(item => {
      if (!item.document_id) return;
      investorCounts[item.document_id] = (investorCounts[item.document_id] || 0) + 1;
    });
    
    // Extract active investors
    const activeInvestorsList = Object.entries(investorCounts)
      .map(([id, count]) => ({ id, count }))
      .sort((a, b) => b.count - a.count);
    
    const activeInvestors = activeInvestorsList.length;
    
    // Top investors - we use document_id as a proxy
    const topInvestors = activeInvestorsList.slice(0, 5).map((investor, index) => {
      // Generate fake investor names for demonstration
      const companyNames = [
        "NYC Property Holdings LLC", 
        "Manhattan Realty Group", 
        "Brooklyn Bridge Investments",
        "Queens Development Corp",
        "Bronx Building Partners",
        "Staten Island Properties",
        "Empire State Investors",
        "Hudson River Holdings",
        "Central Park Acquisitions"
      ];
      
      return {
        name: companyNames[index % companyNames.length],
        id: investor.id,
        transactions: investor.count,
        value: data
          .filter(item => item.document_id === investor.id)
          .reduce((sum, item) => sum + (Number(item.document_amt) || 0), 0)
      };
    });
    
    // Group by borough for distribution
    const boroughCounts: Record<string, number> = {};
    data.forEach(item => {
      if (!item.borough) return;
      boroughCounts[item.borough] = (boroughCounts[item.borough] || 0) + 1;
    });
    
    const boroughDistribution = Object.entries(boroughCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
    
    // Group by neighborhood (using address as proxy) for hotspots
    const neighborhoodCounts: Record<string, number> = {};
    data.forEach(item => {
      if (!item.property_address) return;
      // Extract neighborhood from address (simplified)
      const neighborhood = item.property_address.split(',')[0];
      if (!neighborhood) return;
      
      neighborhoodCounts[neighborhood] = (neighborhoodCounts[neighborhood] || 0) + 1;
    });
    
    const investmentHotspots = Object.entries(neighborhoodCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    // Monthly transaction volumes
    const monthCounts: Record<string, number> = {};
    data.forEach(item => {
      if (!item.document_date) return;
      const month = new Date(item.document_date).toLocaleString('default', { month: 'short' });
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    });
    
    const monthlyTransactions = Object.entries(monthCounts)
      .map(([name, value]) => ({ name, value }));
    
    // Price range distribution
    const priceRanges = [
      { name: "< $1M", min: 0, max: 1000000, count: 0 },
      { name: "$1M-$5M", min: 1000000, max: 5000000, count: 0 },
      { name: "$5M-$10M", min: 5000000, max: 10000000, count: 0 },
      { name: "$10M-$50M", min: 10000000, max: 50000000, count: 0 },
      { name: "> $50M", min: 50000000, max: Infinity, count: 0 }
    ];
    
    data.forEach(item => {
      const price = Number(item.document_amt) || 0;
      const range = priceRanges.find(r => price >= r.min && price < r.max);
      if (range) range.count++;
    });
    
    const priceRangeDistribution = priceRanges.map(r => ({ name: r.name, value: r.count }));
    
    // Asset class trends
    const propertyCounts: Record<string, number> = {};
    data.forEach(item => {
      if (!item.property_type) return;
      propertyCounts[item.property_type] = (propertyCounts[item.property_type] || 0) + 1;
    });
    
    const assetClassTrends = Object.entries(propertyCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
    
    return {
      totalTransactions,
      activeInvestors,
      averagePrice,
      totalProperties,
      topInvestors,
      investmentHotspots,
      boroughDistribution,
      monthlyTransactions,
      priceRangeDistribution,
      assetClassTrends
    };
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const colors = ["#3b82f6", "#2dd4bf", "#f43f5e", "#f59e0b", "#8b5cf6"];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of NYC real estate investment market in {selectedYear}
        </p>
      </div>

      {!dataLoaded ? (
        <div className="h-96 w-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-lg">Loading dashboard data...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Year Selection Tab */}
          <Tabs defaultValue={selectedYear} className="space-y-4">
            <TabsList>
              <TabsTrigger value="2023">2023</TabsTrigger>
              <TabsTrigger value="2024">2024</TabsTrigger>
              <TabsTrigger value="2025">2025</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedYear} className="space-y-4">
              {/* Data Importer Card - only show if no data */}
              {dashboardData.totalTransactions === 0 && (
                <div className="grid gap-4 md:grid-cols-1">
                  <DataImporter />
                </div>
              )}

              {/* KPI Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* KPI cards */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.totalTransactions.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      Transactions in {selectedYear}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Investors</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.activeInvestors.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      Market participants
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Price</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(dashboardData.averagePrice)}</div>
                    <p className="text-xs text-muted-foreground">
                      Avg. transaction value
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Properties Tracked</CardTitle>
                    <Building className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.totalProperties.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      Unique properties sold
                    </p>
                  </CardContent>
                </Card>
              </div>

              {dashboardData.totalTransactions > 0 && (
                <>
                  {/* Top Investors */}
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <Card className="col-span-1">
                      <CardHeader>
                        <CardTitle>Top 5 Investors</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {dashboardData.topInvestors.map((investor, i) => (
                            <div key={i} className="flex items-center">
                              <div className={`w-2 h-2 rounded-full bg-blue-600 mr-3`} />
                              <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">{investor.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {investor.transactions} transactions • {formatCurrency(investor.value)}
                                </p>
                              </div>
                              <div className="font-medium">
                                #{i + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Investment Hotspots */}
                    <Card className="col-span-1">
                      <CardHeader>
                        <CardTitle>Investment Hotspots</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dashboardData.investmentHotspots}>
                              <XAxis dataKey="name" tickFormatter={(value) => value.substring(0, 10) + (value.length > 10 ? '...' : '')} />
                              <YAxis />
                              <Tooltip formatter={(value) => [`${value} transactions`, 'Volume']} />
                              <Bar dataKey="count" fill="#3b82f6" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Borough Distribution & Monthly Transactions */}
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <Card className="col-span-1">
                      <CardHeader>
                        <CardTitle>Borough Distribution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={dashboardData.boroughDistribution}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                                label={(entry) => entry.name}
                              >
                                {dashboardData.boroughDistribution.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value) => [`${value} transactions`, 'Volume']} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Monthly Transactions */}
                    <Card className="col-span-1">
                      <CardHeader>
                        <CardTitle>Monthly Transaction Volume</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dashboardData.monthlyTransactions}>
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip formatter={(value) => [`${value} transactions`, 'Volume']} />
                              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Price Range & Asset Class */}
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <Card className="col-span-1">
                      <CardHeader>
                        <CardTitle>Price Range Distribution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dashboardData.priceRangeDistribution}>
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip formatter={(value) => [`${value} properties`, 'Count']} />
                              <Bar dataKey="value" fill="#8b5cf6" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Asset Class Trends */}
                    <Card className="col-span-1">
                      <CardHeader>
                        <CardTitle>Asset Class Trends</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={dashboardData.assetClassTrends}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                                label={(entry) => entry.name}
                              >
                                {dashboardData.assetClassTrends.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value) => [`${value} properties`, 'Count']} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default Dashboard;
