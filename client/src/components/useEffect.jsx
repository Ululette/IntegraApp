import React, { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qeubfsxlcvapzvjihzep.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDMyNDU4NCwiZXhwIjoxOTM1OTAwNTg0fQ.l9ZzKLUoPFsMWMCismH6RkXsEzBiSrDMylGB9V_HHjI';
const supabase = createClient(supabaseUrl, SUPABASE_KEY);

function Test() {
    useEffect(() => {
        const fetchNews = async () => {
            let { data: news, error } = await supabase.from('news').select('*');
            console.log(news);
        };

        fetchNews();
    });

    return (
        <div>
            <h1>Holis</h1>
        </div>
    );
}

export default Test;
