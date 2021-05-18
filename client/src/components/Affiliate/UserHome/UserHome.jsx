import React, { useState, useEffect } from 'react';
import supabase from '../../../supabase.config.js';

function UserHome() {
    const affiliateData = JSON.parse(localStorage.getItem('affiliatedata'));
    return (
        <div>
            <h1>Hola {affiliateData.name}</h1>
        </div>
    );
}

export default UserHome;
