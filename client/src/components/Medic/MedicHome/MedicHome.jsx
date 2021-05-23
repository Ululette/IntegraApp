import React from 'react';

function MedicHome({ medicData }) {
    return (
        <div>
            <h1>
                Bienvenido {medicData.name} {medicData.lastname}
            </h1>
        </div>
    );
}

export default MedicHome;
