import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const isAuthenticated = () => {
  const user = supabase.auth.getUser();
  console.log(user);
    if (!!user) return true;
  return false;
};
