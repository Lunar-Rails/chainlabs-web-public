import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface DemoRequest {
  id: string;
  first_name: string;
  last_name: string;
  business_email: string;
  company_name: string;
  phone_number: string;
  organization_type?: string;
  country?: string;
  solution_of_interest?: string;
  referral_source?: string;
  custom_message?: string;
  created_at: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const payload = await req.json();
    const record = payload.record as DemoRequest;

    const emailContent = `
      New Demo Request Received
      ========================
      
      Contact Information:
      -------------------
      Name: ${record.first_name} ${record.last_name}
      Email: ${record.business_email}
      Company: ${record.company_name}
      Phone: ${record.phone_number}
      
      Organization Details:
      --------------------
      Type: ${record.organization_type || 'Not specified'}
      Country: ${record.country || 'Not specified'}
      
      Interest:
      ---------
      Solution: ${record.solution_of_interest || 'Not specified'}
      
      How they heard about us:
      -----------------------
      ${record.referral_source || 'Not specified'}
      
      Custom Message:
      --------------
      ${record.custom_message || 'Not specified'}
      
      Submission Details:
      ------------------
      Request ID: ${record.id}
      Timestamp: ${new Date(record.created_at).toLocaleString()}
      
      ---
      This is an automated notification from the Chainlabs demo request form.
    `;

    console.log('Demo request received:', {
      id: record.id,
      email: record.business_email,
      company: record.company_name,
    });

    console.log('Email content prepared for sending:', emailContent);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Notification processed',
        requestId: record.id,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error processing demo request notification:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      }
    );
  }
});
