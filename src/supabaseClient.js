import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ggajxxfhnoieyfkuiimy.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnYWp4eGZobm9pZXlma3VpaW15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDk2ODEsImV4cCI6MjA5MTUyNTY4MX0.6sY1taHZVHX9QJd4-yYve4lYlMCAA_0KqpbDgl3vZMw';

export const supabase = createClient(supabaseUrl, supabaseKey);

