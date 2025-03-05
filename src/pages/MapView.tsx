
import { Card } from "@/components/ui/card";

const MapView = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Property Map</h1>
        <p className="text-muted-foreground">
          Visualize real estate investments across NYC
        </p>
      </div>

      <Card className="h-[calc(100vh-16rem)] animate-fade-in">
        <div className="p-6 h-full flex items-center justify-center">
          <p className="text-muted-foreground text-center">
            Interactive map coming soon!<br />
            Will display property locations, investment hotspots, and transaction details.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default MapView;
