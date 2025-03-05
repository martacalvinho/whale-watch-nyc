
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, DollarSign, TrendingUp, Users } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

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

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of NYC real estate investment activity
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
