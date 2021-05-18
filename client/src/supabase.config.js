import { createClient } from '@supabase/supabase-js';
const { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY } = process.env;

const SUPABASE_URL = REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = REACT_APP_SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
