
import { Button } from "@/components/ui/button";
import { Building, MapPin, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: MapPin,
    title: "Neighborhood Tracking",
    description: "Monitor real estate investments across NYC neighborhoods",
  },
  {
    icon: Users,
    title: "Investor Insights",
    description: "Identify and analyze major property buyers",
  },
  {
    icon: Building,
    title: "Property Analysis",
    description: "Track property types, prices, and transaction patterns",
  },
  {
    icon: TrendingUp,
    title: "Market Trends",
    description: "Stay informed about shifting investment strategies",
  },
];

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-2rem)] flex flex-col items-center justify-center max-w-5xl mx-auto px-4 py-12 animate-fade-in">
      <div className="text-center space-y-6 mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
          Track NYC's Biggest Real Estate Investors
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Whale Watch NYC helps you identify and analyze major property buyers,
          their investment patterns, and market trends across New York City.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="animate-scale-in">
            <Link to="/dashboard">View Dashboard</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="animate-scale-in">
            <Link to="/map">Explore Map</Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-16 w-full">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="flex items-start space-x-4 p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors animate-fade-in"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <feature.icon className="w-6 h-6 text-primary shrink-0" />
            <div className="space-y-1">
              <h3 className="font-medium">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
