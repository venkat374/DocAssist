import { createClient } from "@supabase/supabase-js";

// ✅ Replace with your actual Supabase credentials
const SUPABASE_URL = "https://fsyxlkpudwjqzzxgrxsz.supabase.co";  // ✅ REAL URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzeXhsa3B1ZHdqcXp6eGdyeHN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MTA3NzMsImV4cCI6MjA1ODM4Njc3M30.uTGIIrksA6Tmvml9tFfWys5e4ccUAN8YvBNCawF12NA";         // ✅ REAL API KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
