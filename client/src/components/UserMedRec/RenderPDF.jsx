import React, { useEffect } from 'react';

function RenderPDF() {
    useEffect(() => {
        if (typeof window.orientation !== 'undefined') {
            document.getElementById('descargaPdf').click();
            window.close();
        }
    }, []);

    return (
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
            <object
                data='../../assets/docs/F10.pdf'
                type='application/pdf'
                width='100%'
                height='100%'
                aria-label='Error loading PDF'
            >
                <a
                    href='../../assets/docs/F10.pdf'
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
