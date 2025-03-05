
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Building, Search } from "lucide-react";

const Properties = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
        <p className="text-muted-foreground">
          Browse and analyze NYC real estate properties
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Properties</CardTitle>
          <CardDescription>
            Find properties by address, neighborhood, or price range
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input placeholder="Search properties..." className="max-w-sm" />
            <Button>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card
            key={i}
            className="animate-scale-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <Building className="w-8 h-8" />
              <div>
                <CardTitle className="text-lg">Sample Property {i + 1}</CardTitle>
                <CardDescription>Manhattan, NYC</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">$2,500,000</p>
              <p className="text-sm text-muted-foreground">
                Last sold: January 2024
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Properties;
