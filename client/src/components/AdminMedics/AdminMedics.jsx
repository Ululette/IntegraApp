import React, {useState, useEffect} from 'react';
import styles from './AdminMedic.module.css';
import supabase from '../../supabase.config.js'

function AdminMedic() {
    const [listMedics, setListMedics] = useState([]);

    return (
        <div>
            <h2>Lista de medicos</h2>
        </div>
    )
}

export default AdminMedic;