
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Building, Calendar, DollarSign, Filter, Home, MapPin, Search as SearchIcon, SlidersHorizontal, Tag, User } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

// Sample search results
const sampleProperties = [
  {
    id: 1,
    title: "Luxury Condo",
    location: "SoHo, Manhattan",
    price: "$3,200,000",
    lastSold: "January 2024",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format&fit=crop",
    sqft: "2,450",
    type: "Residential",
    borough: "Manhattan"
  },
  {
    id: 2,
    title: "Commercial Office",
    location: "Midtown, Manhattan",
    price: "$5,800,000",
    lastSold: "November 2023",
    image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=800&auto=format&fit=crop",
    sqft: "5,200",
    type: "Commercial",
    borough: "Manhattan"
  },
  {
    id: 3,
    title: "Brownstone Townhouse",
    location: "Park Slope, Brooklyn",
    price: "$4,100,000",
    lastSold: "March 2024",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&auto=format&fit=crop",
    sqft: "3,650",
    type: "Multi-family",
    borough: "Brooklyn"
  },
];

const sampleInvestors = [
  {
    id: 1,
    name: "Blackstone Realty",
    properties: 42,
    value: "$120M+",
    focus: "Commercial",
    borough: "Manhattan"
  },
  {
    id: 2,
    name: "Brooklyn Partners LLC",
    properties: 15,
    value: "$45M+",
    focus: "Multi-family",
    borough: "Brooklyn"
  },
];

const sampleTransactions = [
  {
    id: 1,
    property: "SoHo Office Plaza",
    buyer: "Blackstone Realty",
    seller: "SoHo Developments",
    price: "$28.5M",
    date: "Feb 12, 2024",
    borough: "Manhattan"
  },
  {
    id: 2,
    property: "Williamsburg Heights",
    buyer: "Brooklyn Partners LLC",
    seller: "Private Owner",
    price: "$12.3M",
    date: "Jan 5, 2024",
    borough: "Brooklyn"
  },
];

const Search = () => {
  const [showResults, setShowResults] = useState(false);
  const [selectedTab, setSelectedTab] = useState("properties");
  const [priceRange, setPriceRange] = useState([1, 10]);

  const handleSearch = () => {
    setShowResults(true);
  };

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
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Search Filters
          </CardTitle>
          <CardDescription>
            Refine your search with multiple criteria
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="properties" className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                Properties
              </TabsTrigger>
              <TabsTrigger value="investors" className="flex items-center gap-1">
                <User className="w-4 h-4" />
                Investors
              </TabsTrigger>
              <TabsTrigger value="transactions" className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                Transactions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="properties" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    Property Type
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="multi-family">Multi-family</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="mixed-use">Mixed-Use</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Borough
                  </label>
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
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  Price Range (in millions)
                </label>
                <div className="pt-4 pb-2 px-2">
                  <Slider
                    defaultValue={[1, 10]} 
                    max={20}
                    min={1}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>${priceRange[0]}M</span>
                    <span>${priceRange[1]}M</span>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Timeframe
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-months">Last 3 months</SelectItem>
                      <SelectItem value="6-months">Last 6 months</SelectItem>
                      <SelectItem value="1-year">Last year</SelectItem>
                      <SelectItem value="5-years">Last 5 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 flex items-center">
                  <div className="flex items-center space-x-2 mt-8">
                    <Switch id="recent-sales" />
                    <Label htmlFor="recent-sales">Only show recent sales</Label>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="investors" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1">
                    <User className="w-4 h-4" />
                    Investor Type
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select investor type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="llc">LLC</SelectItem>
                      <SelectItem value="corporation">Corporation</SelectItem>
                      <SelectItem value="reit">REIT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Primary Borough
                  </label>
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
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  Portfolio Value Range (in millions)
                </label>
                <div className="pt-4 pb-2 px-2">
                  <Slider
                    defaultValue={[10, 100]} 
                    max={250}
                    min={10}
                    step={10}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>$10M</span>
                    <span>$250M+</span>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    Investment Focus
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select focus" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="mixed">Mixed-Use</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 flex items-center">
                  <div className="flex items-center space-x-2 mt-8">
                    <Switch id="active-only" />
                    <Label htmlFor="active-only">Only active investors</Label>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="transactions" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    Property Type
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="multi-family">Multi-family</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Timeframe
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-months">Last 3 months</SelectItem>
                      <SelectItem value="6-months">Last 6 months</SelectItem>
                      <SelectItem value="1-year">Last year</SelectItem>
                      <SelectItem value="2-years">Last 2 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  Transaction Value (in millions)
                </label>
                <div className="pt-4 pb-2 px-2">
                  <Slider
                    defaultValue={[1, 20]} 
                    max={50}
                    min={1}
                    step={1}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>$1M</span>
                    <span>$50M+</span>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Borough
                  </label>
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
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1">
                    <SlidersHorizontal className="w-4 h-4" />
                    Sort By
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date-desc">Most Recent</SelectItem>
                      <SelectItem value="date-asc">Oldest First</SelectItem>
                      <SelectItem value="price-desc">Highest Price</SelectItem>
                      <SelectItem value="price-asc">Lowest Price</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex gap-4 pt-2">
            <Input 
              placeholder={`Enter keywords for ${selectedTab}...`} 
              className="flex-1" 
            />
            <Button size="lg" onClick={handleSearch}>
              <SearchIcon className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {showResults && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              Showing results for {selectedTab}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedTab === "properties" && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sampleProperties.map((property) => (
                  <Card key={property.id} className="overflow-hidden hover:shadow-md transition-all">
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{property.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1" />
                        {property.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 pb-2">
                      <p className="text-xl font-bold">{property.price}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Home className="w-3 h-3" />
                          {property.type}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {property.borough}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="text-sm text-muted-foreground pt-2 border-t">
                      Last sold: {property.lastSold}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
            
            {selectedTab === "investors" && (
              <div className="grid gap-4 md:grid-cols-2">
                {sampleInvestors.map((investor) => (
                  <Card key={investor.id} className="hover:shadow-md transition-all">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User className="w-5 h-5" />
                        {investor.name}
                      </CardTitle>
                      <CardDescription>
                        {investor.focus} focus in {investor.borough}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-xl font-bold">{investor.value}</p>
                        <p className="text-sm">{investor.properties} properties</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            {selectedTab === "transactions" && (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left">Property</th>
                      <th className="py-3 px-4 text-left">Buyer</th>
                      <th className="py-3 px-4 text-left">Seller</th>
                      <th className="py-3 px-4 text-left">Price</th>
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Borough</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">{transaction.property}</td>
                        <td className="py-3 px-4">{transaction.buyer}</td>
                        <td className="py-3 px-4">{transaction.seller}</td>
                        <td className="py-3 px-4 font-medium">{transaction.price}</td>
                        <td className="py-3 px-4">{transaction.date}</td>
                        <td className="py-3 px-4">{transaction.borough}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Search;
