import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://airdwtypeztisoymjbex.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpcmR3dHlwZXp0aXNveW1qYmV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MDYwMjMsImV4cCI6MjA2MjI4MjAyM30.wnuKLAGHbBrp93flko7NTT6pAFGNbMYJAM4kRZ3pZwc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
