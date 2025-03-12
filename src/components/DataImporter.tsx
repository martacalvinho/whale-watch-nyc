
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Database, Download, Check, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function DataImporter() {
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<null | {
    success: boolean;
    processed?: number;
    inserted?: number;
    error?: string;
  }>(null);
  const [dataCount, setDataCount] = useState<number | null>(null);

  // Check if we have data
  const checkDataExists = async () => {
    try {
      const { count, error } = await supabase
        .from('property_sales')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      setDataCount(count);
      
      return count;
    } catch (error) {
      console.error("Error checking data:", error);
      toast.error("Failed to check existing data");
      return 0;
    }
  };

  // Trigger import from the edge function
  const startImport = async () => {
    setIsImporting(true);
    setImportStatus(null);
    
    try {
      toast.info("Starting data import from NYC Department of Finance...", {
        duration: 5000,
      });
      
      // Call the edge function with a timeout
      const timeoutId = setTimeout(() => {
        setIsImporting(false);
        setImportStatus({ 
          success: false, 
          error: "The import is taking longer than expected. Check the logs for progress." 
        });
        toast.error("Import timeout - check the function logs.");
      }, 60000); // 60-second timeout for UI feedback only
      
      const { data, error } = await supabase.functions.invoke('fetch-nycdb-data', {
        method: 'POST',
      });
      
      clearTimeout(timeoutId);
      
      if (error) throw error;
      
      setImportStatus(data);
      
      if (data.success) {
        toast.success(`Successfully imported ${data.inserted} records!`);
        checkDataExists(); // Refresh the count
      } else {
        toast.error(`Import failed: ${data.error}`);
      }
    } catch (error: any) {
      console.error("Error during import:", error);
      setImportStatus({ 
        success: false, 
        error: error.message || "Network error or timeout. Please try again." 
      });
      toast.error(`Import failed: ${error.message || "Unknown error"}`);
    } finally {
      setIsImporting(false);
    }
  };

  // Check for existing data on component mount
  useState(() => {
    checkDataExists();
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          NYC Property Sales Data Import
        </CardTitle>
        <CardDescription>
          Import property sales data from NYC Department of Finance
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {dataCount !== null && (
            <div className="flex items-center justify-between">
              <span className="text-sm">Current data in database:</span>
              <Badge variant={dataCount > 0 ? "secondary" : "destructive"}>
                {dataCount > 0 ? `${dataCount.toLocaleString()} records` : "No data"}
              </Badge>
            </div>
          )}
          
          {isImporting && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Importing data...</span>
                <span>This may take a minute or two</span>
              </div>
              <Progress value={isImporting ? 75 : 0} className="w-full" />
            </div>
          )}
          
          {importStatus && (
            <div className={`p-4 rounded-md ${importStatus.success ? 'bg-green-50' : 'bg-red-50'}`}>
              {importStatus.success ? (
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Import successful</p>
                    <p className="text-sm">
                      Processed {importStatus.processed?.toLocaleString()} records and imported {importStatus.inserted?.toLocaleString()} valid entries.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Import failed</p>
                    <p className="text-sm text-red-700">{importStatus.error}</p>
                    <p className="text-xs text-gray-700 mt-1">
                      Try again or check the Supabase Edge Function logs for more details.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={checkDataExists} 
          disabled={isImporting}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
        
        <Button 
          onClick={startImport} 
          disabled={isImporting}
        >
          {isImporting ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Importing...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Import NYC Data
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
