
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Advanced Search</h1>
        <p className="text-muted-foreground">
          Search across properties, investors, and transactions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Filters</CardTitle>
          <CardDescription>
            Refine your search with multiple criteria
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="properties">Properties</SelectItem>
                  <SelectItem value="investors">Investors</SelectItem>
                  <SelectItem value="transactions">Transactions</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Borough</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select borough" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manhattan">Manhattan</SelectItem>
                  <SelectItem value="brooklyn">Brooklyn</SelectItem>
                  <SelectItem value="queens">Queens</SelectItem>
                  <SelectItem value="bronx">Bronx</SelectItem>
                  <SelectItem value="staten-island">Staten Island</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-4">
            <Input placeholder="Enter keywords..." className="flex-1" />
            <Button size="lg">
              <SearchIcon className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
          <CardDescription>Your results will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            Enter your search criteria above to see results
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Search;
