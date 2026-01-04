import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qccxdllfemjqsoetcofr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjY3hkbGxmZW1qcXNvZXRjb2ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1MzA1NTQsImV4cCI6MjA4MzEwNjU1NH0.kg74p77gLcUdTuVYO_jqMQq_YeA0LPUIRgfQS_RVmXY';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
