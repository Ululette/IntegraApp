import React from 'react';
import supabase from '../../supabase.config.js';

function AdminMedicAdd() {
    return (
        <form>
            <input type='text' name='name' placeholder='Nombre del medico' />
            <input type='number' name='dni' placeholder='DNI del medico' />
            <input type='text' name='name' placeholder='Nombre del medico' />
            <input type='text' name='name' placeholder='Nombre del medico' />
            <input type='text' name='name' placeholder='Nombre del medico' />
            <input type='text' name='name' placeholder='Nombre del medico' />
            <input type='text' name='name' placeholder='Nombre del medico' />
        </form>
    );
}
