
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.6'
import { unzip } from 'https://deno.land/x/unzip@v0.3.0/mod.ts';
import { parse as csvParse } from 'https://deno.land/std@0.177.0/encoding/csv.ts';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Create a Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;
const supabase = createClient(supabaseUrl, supabaseKey);

// Define the NYCDB data URL for property sales
const PROPERTY_SALES_URL = 'https://data.cityofnewyork.us/api/views/5pgy-q343/rows.csv?accessType=DOWNLOAD';

async function fetchAndProcessPropertySales() {
  console.log('Starting to fetch property sales data from NYCDB...');
  
  try {
    // Fetch the CSV file
    console.log(`Fetching data from: ${PROPERTY_SALES_URL}`);
    const response = await fetch(PROPERTY_SALES_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }
    
    // Read the CSV content
    const csvText = await response.text();
    console.log(`Successfully downloaded CSV data (${csvText.length} bytes)`);
    
    // Parse the CSV
    const records = await csvParse(csvText, {
      skipFirstRow: true,
      columns: [
        'borough', 'neighborhood', 'building_class_category', 
        'tax_class_at_present', 'block', 'lot', 'easement', 
        'building_class_at_present', 'address', 'apartment_number', 
        'zip_code', 'residential_units', 'commercial_units', 
        'total_units', 'land_square_feet', 'gross_square_feet', 
        'year_built', 'tax_class_at_time_of_sale', 'building_class_at_time_of_sale', 
        'sale_price', 'sale_date'
      ]
    });
    
    console.log(`Parsed ${records.length} records from CSV`);
    
    // Process records in batches to avoid hitting limits
    const BATCH_SIZE = 500;
    let processedCount = 0;
    let successCount = 0;
    
    for (let i = 0; i < records.length; i += BATCH_SIZE) {
      const batch = records.slice(i, i + BATCH_SIZE);
      const formattedBatch = batch.map(record => {
        // Map CSV fields to our database schema
        return {
          borough: record.borough || null,
          property_address: record.address || null,
          block: parseInt(record.block) || null,
          lot: parseInt(record.lot) || null,
          document_amt: parseFloat(record.sale_price) || 0,
          document_date: record.sale_date ? new Date(record.sale_date).toISOString() : null,
          property_type: determinePropertyType(record.building_class_category),
          recorded_datetime: record.sale_date ? new Date(record.sale_date).toISOString() : null,
        };
      }).filter(r => r.document_amt > 0); // Filter out $0 sales
      
      // Insert into Supabase
      if (formattedBatch.length > 0) {
        const { data, error } = await supabase
          .from('property_sales')
          .insert(formattedBatch);
        
        if (error) {
          console.error(`Error inserting batch: ${error.message}`);
        } else {
          successCount += formattedBatch.length;
        }
      }
      
      processedCount += batch.length;
      console.log(`Processed ${processedCount}/${records.length} records. Inserted ${successCount} valid records.`);
    }
    
    return { success: true, processed: processedCount, inserted: successCount };
  } catch (error) {
    console.error('Error processing property sales data:', error);
    return { success: false, error: error.message };
  }
}

// Helper function to determine property type based on building class
function determinePropertyType(buildingClassCategory: string): string {
  if (!buildingClassCategory) return 'UNKNOWN';
  
  const category = buildingClassCategory.toUpperCase();
  
  if (category.includes('FAMILY') || category.includes('RESIDENTIAL') || 
      category.includes('APARTMENT') || category.includes('DWELLING') ||
      category.includes('CONDO')) {
    return 'RESIDENTIAL';
  } else if (category.includes('COMMERCIAL') || category.includes('OFFICE') || 
            category.includes('RETAIL') || category.includes('STORE') ||
            category.includes('HOTEL') || category.includes('FACTORY')) {
    return 'COMMERCIAL';
  } else if (category.includes('MIXED')) {
    return 'MIXED-USE';
  } else {
    return 'OTHER';
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Process based on request method
    if (req.method === 'POST') {
      const result = await fetchAndProcessPropertySales();
      
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: result.success ? 200 : 500,
      });
    } else {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 405,
      });
    }
  } catch (error) {
    console.error('Edge function error:', error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
