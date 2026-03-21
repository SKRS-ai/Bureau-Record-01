<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<script>
  // Replace these with your actual Project URL and API Key from Supabase Settings
  const SUPABASE_URL = 'https://your-project-url.supabase.co';
  const SUPABASE_KEY = 'your-anon-key';
  const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  // Example: Tracking a "Tier Click" for a potential order
  async function initiateEnrollment(tierName, price) {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("AUTHORIZATION REQUIRED: Please Login or Register at PHL-01 Root.");
      window.location.href = "register.html";
      return;
    }

    // Record the intent to purchase in the database
    const { error } = await supabase
      .from('orders')
      .insert([{ user_id: user.id, tier_selected: tierName, amount_paid: price }]);

    if (!error) {
      window.location.href = `purchase-${tierName.toLowerCase()}.html`;
    }
  }
</script>