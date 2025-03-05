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
import { Badge } from "@/components/ui/badge";
import { Briefcase, Building, Search, TrendingUp, TrendingDown, Users, User, Calendar, Home, MapPin } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const investorsData = [
  {
    id: 1,
    name: "Blackstone Realty",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&auto=format&fit=crop",
    properties: 42,
    value: "$120M+",
    trend: "up",
    focus: "Commercial",
    recentPurchase: "Office Tower in Midtown",
    topProperties: ["SoHo Office Plaza", "Manhattan Heights"],
    lastTransaction: "February 2024",
    color: "bg-blue-50"
  },
  {
    id: 2,
    name: "Greenwich Ventures",
    image: "https://images.unsplash.com/photo-1529119513315-c7c361862bd8?w=400&auto=format&fit=crop",
    properties: 23,
    value: "$78M+",
    trend: "up",
    focus: "Luxury Residential",
    recentPurchase: "Penthouse in Upper East Side",
    topProperties: ["Central Park View Condos", "Tribeca Lofts"],
    lastTransaction: "March 2024",
    color: "bg-amber-50"
  },
  {
    id: 3,
    name: "Brooklyn Partners LLC",
    image: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?w=400&auto=format&fit=crop",
    properties: 15,
    value: "$45M+",
    trend: "down",
    focus: "Multi-family",
    recentPurchase: "Brownstone in Park Slope",
    topProperties: ["Williamsburg Heights", "Fort Greene Apartments"],
    lastTransaction: "January 2024",
    color: "bg-green-50"
  },
  {
    id: 4,
    name: "Queens Development Corp",
    image: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?w=400&auto=format&fit=crop",
    properties: 18,
    value: "$62M+",
    trend: "up",
    focus: "Mixed-Use",
    recentPurchase: "Retail/Residential in Astoria",
    topProperties: ["Long Island City Tower", "Jackson Heights Plaza"],
    lastTransaction: "December 2023",
    color: "bg-purple-50"
  },
  {
    id: 5,
    name: "Manhattan Holdings",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop",
    properties: 31,
    value: "$230M+",
    trend: "up",
    focus: "Luxury Commercial",
    recentPurchase: "High-rise in Financial District",
    topProperties: ["Fifth Avenue Offices", "Madison Square Tower"],
    lastTransaction: "February 2024",
    color: "bg-rose-50"
  },
  {
    id: 6,
    name: "Bronx Opportunity Fund",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&auto=format&fit=crop",
    properties: 12,
    value: "$35M+",
    trend: "up",
    focus: "Affordable Housing",
    recentPurchase: "Apartment Complex in South Bronx",
    topProperties: ["Concourse Village", "Mott Haven Residences"],
    lastTransaction: "November 2023",
    color: "bg-cyan-50"
  },
];

const Investors = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Investors</h1>
        <p className="text-muted-foreground">Track major real estate investors across NYC</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Investors</CardTitle>
          <CardDescription>Find investors by name, portfolio, or investment type</CardDescription>
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

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Investors</TabsTrigger>
          <TabsTrigger value="commercial">Commercial</TabsTrigger>
          <TabsTrigger value="residential">Residential</TabsTrigger>
          <TabsTrigger value="mixed">Mixed-Use</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {investorsData.map((investor, i) => (
              <Card
                key={investor.id}
                className={`animate-scale-in hover:shadow-md transition-all ${investor.color}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="relative h-36 overflow-hidden rounded-t-lg">
                  <img 
                    src={investor.image} 
                    alt={investor.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <CardHeader className="flex flex-row items-center gap-4">
                  <User className="w-8 h-8" />
                  <div>
                    <CardTitle className="text-lg">{investor.name}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Briefcase className="w-3.5 h-3.5 mr-1" />
                      {investor.focus}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-2xl font-bold">{investor.value}</p>
                      <p className="text-sm text-muted-foreground">Portfolio value</p>
                    </div>
                    <div className="flex items-center">
                      {investor.trend === "up" ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex gap-2 items-center">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span>{investor.properties} properties</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Home className="w-4 h-4 text-muted-foreground" />
                      <span>Top: {investor.topProperties[0]}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Last: {investor.lastTransaction}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {investor.recentPurchase.includes("Manhattan") ? "Manhattan" : 
                       investor.recentPurchase.includes("Brooklyn") ? "Brooklyn" :
                       investor.recentPurchase.includes("Queens") ? "Queens" :
                       investor.recentPurchase.includes("Bronx") ? "Bronx" : "NYC"}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground border-t pt-4">
                  Recent purchase: {investor.recentPurchase}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="commercial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {investorsData
              .filter(investor => investor.focus.includes("Commercial"))
              .map((investor, i) => (
                <Card
                  key={investor.id}
                  className={`animate-scale-in hover:shadow-md transition-all ${investor.color}`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="relative h-36 overflow-hidden rounded-t-lg">
                    <img 
                      src={investor.image} 
                      alt={investor.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <User className="w-8 h-8" />
                    <div>
                      <CardTitle className="text-lg">{investor.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Briefcase className="w-3.5 h-3.5 mr-1" />
                        {investor.focus}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-2xl font-bold">{investor.value}</p>
                        <p className="text-sm text-muted-foreground">Portfolio value</p>
                      </div>
                      <div className="flex items-center">
                        {investor.trend === "up" ? (
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex gap-2 items-center">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <span>{investor.properties} properties</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Home className="w-4 h-4 text-muted-foreground" />
                        <span>Top: {investor.topProperties[0]}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>Last: {investor.lastTransaction}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {investor.recentPurchase.includes("Manhattan") ? "Manhattan" : 
                        investor.recentPurchase.includes("Brooklyn") ? "Brooklyn" :
                        investor.recentPurchase.includes("Queens") ? "Queens" :
                        investor.recentPurchase.includes("Bronx") ? "Bronx" : "NYC"}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="text-sm text-muted-foreground border-t pt-4">
                    Recent purchase: {investor.recentPurchase}
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="residential" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {investorsData
              .filter(investor => 
                investor.focus.includes("Residential") || 
                investor.focus.includes("Housing") || 
                investor.focus.includes("Apartment")
              )
              .map((investor, i) => (
                <Card
                  key={investor.id}
                  className={`animate-scale-in hover:shadow-md transition-all ${investor.color}`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="relative h-36 overflow-hidden rounded-t-lg">
                    <img 
                      src={investor.image} 
                      alt={investor.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <User className="w-8 h-8" />
                    <div>
                      <CardTitle className="text-lg">{investor.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Briefcase className="w-3.5 h-3.5 mr-1" />
                        {investor.focus}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-2xl font-bold">{investor.value}</p>
                        <p className="text-sm text-muted-foreground">Portfolio value</p>
                      </div>
                      <div className="flex items-center">
                        {investor.trend === "up" ? (
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex gap-2 items-center">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <span>{investor.properties} properties</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Home className="w-4 h-4 text-muted-foreground" />
                        <span>Top: {investor.topProperties[0]}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>Last: {investor.lastTransaction}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {investor.recentPurchase.includes("Manhattan") ? "Manhattan" : 
                        investor.recentPurchase.includes("Brooklyn") ? "Brooklyn" :
                        investor.recentPurchase.includes("Queens") ? "Queens" :
                        investor.recentPurchase.includes("Bronx") ? "Bronx" : "NYC"}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="text-sm text-muted-foreground border-t pt-4">
                    Recent purchase: {investor.recentPurchase}
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="mixed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {investorsData
              .filter(investor => investor.focus.includes("Mixed"))
              .map((investor, i) => (
                <Card
                  key={investor.id}
                  className={`animate-scale-in hover:shadow-md transition-all ${investor.color}`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="relative h-36 overflow-hidden rounded-t-lg">
                    <img 
                      src={investor.image} 
                      alt={investor.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <User className="w-8 h-8" />
                    <div>
                      <CardTitle className="text-lg">{investor.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Briefcase className="w-3.5 h-3.5 mr-1" />
                        {investor.focus}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-2xl font-bold">{investor.value}</p>
                        <p className="text-sm text-muted-foreground">Portfolio value</p>
                      </div>
                      <div className="flex items-center">
                        {investor.trend === "up" ? (
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex gap-2 items-center">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <span>{investor.properties} properties</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Home className="w-4 h-4 text-muted-foreground" />
                        <span>Top: {investor.topProperties[0]}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>Last: {investor.lastTransaction}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {investor.recentPurchase.includes("Manhattan") ? "Manhattan" : 
                        investor.recentPurchase.includes("Brooklyn") ? "Brooklyn" :
                        investor.recentPurchase.includes("Queens") ? "Queens" :
                        investor.recentPurchase.includes("Bronx") ? "Bronx" : "NYC"}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="text-sm text-muted-foreground border-t pt-4">
                    Recent purchase: {investor.recentPurchase}
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Investors;
