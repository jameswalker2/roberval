import {createClient} from "@supabase/supabase-js";

const supabaseURL = 'https://wqymrxkvfutakyhzjhjv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxeW1yeGt2ZnV0YWt5aHpqaGp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgxNjEwODAsImV4cCI6MjAxMzczNzA4MH0.RykusE6LHv6gak3o7hu1UO3hwwT9bVOxKwZr2RYJlwI'

export const supabase = createClient(supabaseURL, supabaseAnonKey)
