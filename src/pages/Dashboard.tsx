
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Building, DollarSign, TrendingUp, Users, MapPin, ArrowRight, Clock, Home, Factory } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";

// Sample data for the transaction chart
const transactionData = [
  { month: "Jan", amount: 12.4 },
  { month: "Feb", amount: 14.8 },
  { month: "Mar", amount: 10.2 },
  { month: "Apr", amount: 15.6 },
  { month: "May", amount: 18.2 },
  { month: "Jun", amount: 16.9 },
  { month: "Jul", amount: 21.3 },
];

// Sample data for the borough breakdown
const boroughData = [
  { name: "Manhattan", value: 42 },
  { name: "Brooklyn", value: 28 },
  { name: "Queens", value: 14 },
  { name: "Bronx", value: 10 },
  { name: "Staten Island", value: 6 },
];

// Key investors data
const topInvestorsData = [
  { name: "Blackstone Real Estate", type: "REIT", properties: 42, totalValue: "1.8B", focus: "Commercial" },
  { name: "NYC Property Partners LLC", type: "LLC", properties: 36, totalValue: "620M", focus: "Multi-family" },
  { name: "Hudson Yards Investors", type: "REIT", properties: 29, totalValue: "1.2B", focus: "Mixed-use" },
  { name: "Maxwell Development Group", type: "LLC", properties: 24, totalValue: "475M", focus: "Residential" },
  { name: "Gotham Acquisition Fund", type: "Private Equity", properties: 18, totalValue: "380M", focus: "Retail" },
];

// Property holding vs flipping data
const holdingVsFlippingData = [
  { name: "Holding (>2 years)", value: 68, color: "#8884d8" },
  { name: "Flipping (<1 year)", value: 32, color: "#82ca9d" },
];

// Price range distribution data
const priceRangeData = [
  { name: "Luxury ($10M+)", value: 25, color: "#8884d8" },
  { name: "High-end ($5-10M)", value: 30, color: "#82ca9d" },
  { name: "Mid-tier ($1-5M)", value: 35, color: "#ffc658" },
  { name: "Budget (<$1M)", value: 10, color: "#ff8042" },
];

// Asset class trends (last 12 months)
const assetClassTrendsData = [
  { month: "Aug", residential: 15, commercial: 8, industrial: 5 },
  { month: "Sep", residential: 12, commercial: 9, industrial: 6 },
  { month: "Oct", residential: 10, commercial: 11, industrial: 7 },
  { month: "Nov", residential: 8, commercial: 12, industrial: 8 },
  { month: "Dec", residential: 9, commercial: 14, industrial: 7 },
  { month: "Jan", residential: 7, commercial: 15, industrial: 9 },
  { month: "Feb", residential: 8, commercial: 16, industrial: 10 },
  { month: "Mar", residential: 9, commercial: 17, industrial: 9 },
  { month: "Apr", residential: 11, commercial: 18, industrial: 8 },
  { month: "May", residential: 10, commercial: 16, industrial: 10 },
  { month: "Jun", residential: 12, commercial: 15, industrial: 11 },
  { month: "Jul", residential: 13, commercial: 17, industrial: 12 },
];

// Neighborhood investment hotspots
const neighborhoodHotspotsData = [
  { name: "Hudson Yards", borough: "Manhattan", value: 18, growth: "+15%" },
  { name: "Williamsburg", borough: "Brooklyn", value: 15, growth: "+12%" },
  { name: "Long Island City", borough: "Queens", value: 12, growth: "+20%" },
  { name: "Bushwick", borough: "Brooklyn", value: 10, growth: "+25%" },
  { name: "Financial District", borough: "Manhattan", value: 9, growth: "+8%" },
];

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of NYC real estate investment activity and key market insights
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="animate-scale-in bg-blue-50 hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <DollarSign className="h-6 w-6 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,345</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="animate-scale-in bg-amber-50 hover:shadow-md transition-all" style={{ animationDelay: "100ms" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investors</CardTitle>
            <Users className="h-6 w-6 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">+12 new this month</p>
          </CardContent>
        </Card>
        <Card className="animate-scale-in bg-green-50 hover:shadow-md transition-all" style={{ animationDelay: "200ms" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Properties Tracked</CardTitle>
            <Building className="h-6 w-6 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-muted-foreground">Across all boroughs</p>
          </CardContent>
        </Card>
        <Card className="animate-scale-in bg-purple-50 hover:shadow-md transition-all" style={{ animationDelay: "300ms" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Price</CardTitle>
            <TrendingUp className="h-6 w-6 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.4M</div>
            <p className="text-xs text-muted-foreground">+4.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Key Investor Insights</CardTitle>
          <CardDescription>Analysis of major players and their investment patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="buyers">
            <TabsList className="mb-4">
              <TabsTrigger value="buyers">Big Buyers</TabsTrigger>
              <TabsTrigger value="neighborhoods">Target Neighborhoods</TabsTrigger>
              <TabsTrigger value="strategy">Investment Strategy</TabsTrigger>
              <TabsTrigger value="trends">Asset Class Trends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="buyers" className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Top 5 Investment Entities
                </h3>
                <p className="text-sm text-muted-foreground">Entities making the most significant NYC real estate purchases</p>
              </div>
              
              <div className="space-y-4">
                {topInvestorsData.map((investor, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-blue-50 transition-colors">
                    <div className="flex flex-col">
                      <span className="font-medium">{investor.name}</span>
                      <span className="text-sm text-muted-foreground">Focus: {investor.focus}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-white">{investor.type}</Badge>
                      <div className="text-right">
                        <div className="font-medium">${investor.totalValue}</div>
                        <div className="text-xs text-muted-foreground">{investor.properties} properties</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="neighborhoods" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-1 mb-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-red-500" />
                      Investment Hotspots
                    </h3>
                    <p className="text-sm text-muted-foreground">Neighborhoods with highest investment concentration</p>
                  </div>
                  
                  <div className="space-y-3">
                    {neighborhoodHotspotsData.map((hood, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50">
                        <div className="flex flex-col">
                          <span className="font-medium">{hood.name}</span>
                          <span className="text-xs text-muted-foreground">{hood.borough}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <div className="font-medium">{hood.value}%</div>
                            <div className="text-xs text-green-600">{hood.growth}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="space-y-1 mb-4">
                    <h3 className="text-lg font-medium">Borough Distribution</h3>
                    <p className="text-sm text-muted-foreground">Investment allocation across NYC boroughs</p>
                  </div>
                  
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={boroughData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={90}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {boroughData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={
                                index === 0 ? '#8884d8' : 
                                index === 1 ? '#82ca9d' : 
                                index === 2 ? '#ffc658' : 
                                index === 3 ? '#ff8042' : '#8dd1e1'
                              } 
                            />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Investment Share']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="strategy" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-1 mb-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <div className="flex gap-1">
                        <ArrowRight className="h-5 w-5 text-green-500" />
                        <Clock className="h-5 w-5 text-purple-500" />
                      </div>
                      Flipping vs. Holding
                    </h3>
                    <p className="text-sm text-muted-foreground">Are investors flipping properties or holding long-term?</p>
                  </div>
                  
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={holdingVsFlippingData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name} ${value}%`}
                        >
                          {holdingVsFlippingData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span><strong>68%</strong> of investors are holding properties long-term (more than 2 years)</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <ArrowRight className="h-4 w-4 text-green-500" />
                      <span><strong>32%</strong> are flipping properties within a year of purchase</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="space-y-1 mb-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-amber-500" />
                      Price Range Focus
                    </h3>
                    <p className="text-sm text-muted-foreground">Investment concentration by property value</p>
                  </div>
                  
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={priceRangeData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {priceRangeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-3">
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">
                      Key Insight: Most activity in $1M-$10M range (65%)
                    </Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="trends" className="space-y-6">
              <div className="space-y-1 mb-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <div className="flex gap-1">
                    <Home className="h-5 w-5 text-blue-500" />
                    <Factory className="h-5 w-5 text-purple-500" />
                  </div>
                  Asset Class Shifts (Last 12 Months)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Investment trends across different property types showing a shift towards commercial spaces
                </p>
              </div>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={assetClassTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis label={{ value: 'Transaction Volume (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="residential" name="Residential" fill="#8884d8" />
                    <Bar dataKey="commercial" name="Commercial" fill="#82ca9d" />
                    <Bar dataKey="industrial" name="Industrial" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="font-medium mb-2">Key Asset Class Insights:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>Commercial property investment has increased by 35% year-over-year</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span>Industrial spaces seeing steady growth at 18% annually</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />
                    <span>Residential investment has declined by 12% as investors shift focus</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Monthly Transaction Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={transactionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Billion $', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`$${value}B`, 'Transaction Volume']} />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Investment Distribution by Borough</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {boroughData.map((item, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-2/3">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full" 
                        style={{ 
                          width: `${item.value}%`, 
                          backgroundColor: i === 0 ? '#8884d8' : 
                                          i === 1 ? '#82ca9d' : 
                                          i === 2 ? '#ffc658' : 
                                          i === 3 ? '#ff8042' : '#8dd1e1' 
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-1/3 pl-4">
                    <div className="text-sm text-muted-foreground">
                      {i === 0 ? 'Highest activity' : 
                       i === 1 ? 'Growing rapidly' : 
                       i === 2 ? 'Steady growth' : 
                       i === 3 ? 'Emerging market' : 'Limited transactions'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
