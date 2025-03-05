
export interface Property {
  id: string;
  address: string;
  neighborhood: string;
  borough: string;
  price: number;
  saleDate: string;
  propertyType: string;
  buyer: string;
  seller: string;
  latitude?: number;
  longitude?: number;
}

export interface Buyer {
  id: string;
  name: string;
  totalPurchases: number;
  totalValue: number;
  averageHoldingPeriod: number;
  preferredNeighborhoods: string[];
  preferredPropertyTypes: string[];
}
