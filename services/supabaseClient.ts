import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qherpyxlmxsxjxqlterp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoZXJweXhsbXhzeGp4cWx0ZXJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MDgwODUsImV4cCI6MjA3OTk4NDA4NX0.oqeoLrVrfMfRZL44nLznUsZUomXMeVEJV2xJl_ziovY';

export const supabase = createClient(supabaseUrl, supabaseKey);