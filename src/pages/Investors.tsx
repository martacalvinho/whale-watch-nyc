
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";

const Investors = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Investors</h1>
        <p className="text-muted-foreground">Track major real estate investors</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Investors</CardTitle>
          <CardDescription>Find investors by name or property portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input placeholder="Search investors..." className="max-w-sm" />
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
              <User className="w-8 h-8" />
              <div>
                <CardTitle className="text-lg">Investor {i + 1}</CardTitle>
                <CardDescription>15 properties</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">$50M+</p>
              <p className="text-sm text-muted-foreground">Total investment value</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Investors;
