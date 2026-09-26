const SUPABASE_URL = "https://wlpnkvdezajrqibxetik.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_22bxyhjP9-ic-vnttkcXrg_E1i75Hzf";

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);