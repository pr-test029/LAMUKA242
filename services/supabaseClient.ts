import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wadjstocvndezfhyofew.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhZGpzdG9jdm5kZXpmaHlvZmV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMjYwMTUsImV4cCI6MjA3OTgwMjAxNX0.fONeIOYnGVicDfU6FecGflahivjlRnxnVwTXkTfKc-c';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);