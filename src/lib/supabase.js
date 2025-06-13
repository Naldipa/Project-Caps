import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ssolqxmgedrzgxnaqnly.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzb2xxeG1nZWRyemd4bmFxbmx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NzU3MTUsImV4cCI6MjA2NTI1MTcxNX0.ZqLr7IfEtPuqpolsYMnCGI85ddh7O7QqjQt3wvPJzp0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
