import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { corsHeaders } from "../_shared/cors.ts";

const COMPANY_NAME = "CTRL Tech";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { city, state } = await req.json();

    if (!city || !state) {
      throw new Error("City and state are required");
    }

    // Create content for the location
    const content = `
      <div class="prose max-w-none">
        <h2>Professional IT Services in ${city}, ${state}</h2>
        <p>${COMPANY_NAME} provides comprehensive IT solutions and services to businesses in ${city}, ${state}. Our team of experienced professionals delivers reliable technology support, cybersecurity solutions, and strategic IT consulting to help your business thrive.</p>
        
        <h3>Local IT Support in ${city}</h3>
        <p>As your trusted technology partner in ${city}, ${COMPANY_NAME} offers:</p>
        <ul>
          <li>24/7 IT Support and Help Desk Services</li>
          <li>Network Security and Monitoring</li>
          <li>Cloud Solutions and Migration Services</li>
          <li>Data Backup and Recovery</li>
          <li>IT Infrastructure Management</li>
        </ul>
        
        <h3>Why Choose ${COMPANY_NAME} in ${city}, ${state}?</h3>
        <p>Our local presence in ${city} allows us to provide rapid response times and personalized service to meet your specific business needs. We understand the unique challenges faced by businesses in ${state} and offer tailored solutions to help you succeed.</p>
      </div>
    `;

    const metaTitle = `${COMPANY_NAME} IT Services in ${city}, ${state} | Professional Technology Solutions`;
    const metaDescription = `${COMPANY_NAME} provides professional IT services, support, and solutions in ${city}, ${state}. Contact us for reliable technology support and strategic IT consulting.`;

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert the location data
    const { data, error } = await supabase
      .from("locations")
      .insert({
        city,
        state,
        content,
        meta_title: metaTitle,
        meta_description: metaDescription,
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      throw error;
    }

    return new Response(
      JSON.stringify(data),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 400,
      }
    );
  }
});