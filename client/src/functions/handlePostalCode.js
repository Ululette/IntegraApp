import supabase from '../supabase.config.js';

function handlePostalCode(postalCode) {
    let results = [];
    if (!postalCode) return;
    const search = async () => {
        const { data: info, error: errorSearch } = await supabase
            .from('localities')
            .select('name, states (name)')
            .eq('postal_code', postalCode);
        if (errorSearch) return console.log(errorSearch);
        results.concat(info);
    };
    search();
    console.log(results);
    return results;
}

export default handlePostalCode;
