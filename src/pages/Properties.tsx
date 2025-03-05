
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Building, MapPin, Search, Ruler, Tag } from "lucide-react";

// Sample properties data with varied information
const propertiesData = [
  {
    id: 1,
    title: "Luxury Condo",
    location: "SoHo, Manhattan",
    price: "$3,200,000",
    lastSold: "January 2024",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format&fit=crop",
    sqft: "2,450",
    type: "Residential",
    color: "bg-blue-50"
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
    color: "bg-amber-50"
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
    color: "bg-green-50"
  },
  {
    id: 4,
    title: "Studio Apartment",
    location: "Lower East Side, Manhattan",
    price: "$895,000",
    lastSold: "December 2023",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format&fit=crop",
    sqft: "620",
    type: "Condo",
    color: "bg-purple-50"
  },
  {
    id: 5,
    title: "Mixed-Use Building",
    location: "Williamsburg, Brooklyn",
    price: "$7,250,000",
    lastSold: "February 2024",
    image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=800&auto=format&fit=crop",
    sqft: "8,100",
    type: "Mixed-Use",
    color: "bg-rose-50"
  },
  {
    id: 6,
    title: "Waterfront Penthouse",
    location: "Battery Park, Manhattan",
    price: "$12,500,000",
    lastSold: "October 2023",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&auto=format&fit=crop",
    sqft: "4,800",
    type: "Luxury",
    color: "bg-cyan-50"
  },
];

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
        {propertiesData.map((property, i) => (
          <Card
            key={property.id}
            className={`animate-scale-in hover:shadow-md transition-all ${property.color}`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <img 
                src={property.image} 
                alt={property.title}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
            <CardHeader className="flex flex-row items-center gap-4">
              <Building className="w-8 h-8" />
              <div>
                <CardTitle className="text-lg">{property.title}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  {property.location}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{property.price}</p>
              <div className="flex flex-wrap gap-2 mt-3 mb-3">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {property.type}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Ruler className="w-3 h-3" />
                  {property.sqft} sqft
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Last sold: {property.lastSold}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Properties;
