import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';

function RenderPDF({ firebase }) {
    const [urlFile, setUrlFile] = useState(null);
    const storage = firebase.storage();
    const medRecRef = storage.ref('medical_records_affiliates');
    const userData = JSON.parse(localStorage.getItem('userdata'));
    const fileName = `${userData.dni}.pdf`;
    const fileRef = medRecRef.child(fileName);

    const handleRedirect = async () => {
        const url = await fileRef.getDownloadURL();
        setUrlFile(url);
    };
    useEffect(() => {
        if (typeof window.orientation !== 'undefined') {
            document.getElementById('descargaPdf').click();
            window.close();
        }
        handleRedirect();
        //eslint-disable-next-line
    }, []);

    if (!urlFile)
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </div>
        );

    return (
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
            <object
                data={urlFile}
                type='application/pdf'
                width='100%'
                height='100%'
                aria-label='Error loading PDF'
            >
                <a
                    href={urlFile}
                    id='descargaPdf'
                    download='mymedicalrecords.pdf'
                >
                    Tu dispositivo no puede visualizar el archivo, da click aqui
                    para descargarlo
                </a>
            </object>
        </div>
    );
}

export default RenderPDF;
