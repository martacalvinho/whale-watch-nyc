
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, DollarSign, TrendingUp, Users } from "lucide-react";

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
        <Card className="animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,345</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="animate-scale-in" style={{ animationDelay: "100ms" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">+12 new this month</p>
          </CardContent>
        </Card>
        <Card className="animate-scale-in" style={{ animationDelay: "200ms" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Properties Tracked</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-muted-foreground">Across all boroughs</p>
          </CardContent>
        </Card>
        <Card className="animate-scale-in" style={{ animationDelay: "300ms" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Price</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.4M</div>
            <p className="text-xs text-muted-foreground">+4.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder for future charts and detailed analytics */}
        <Card className="col-span-full animate-fade-in">
          <CardHeader>
            <CardTitle>More features coming soon!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Charts, analytics, and detailed insights will be added in upcoming updates.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
