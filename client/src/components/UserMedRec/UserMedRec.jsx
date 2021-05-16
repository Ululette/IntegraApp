import React from 'react';

function UserMedRec({ match }) {
    const idUser = match.params.id;
    return (
        <div>
            <a
                href={`/${idUser}/mymedicalrecords/pdf`}
                target='_blank'
                rel='noreferrer'
            >
                <button>Ir a mi ficha medica</button>
            </a>
        </div>
    );
}

export default UserMedRec;
