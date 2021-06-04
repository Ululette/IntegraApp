import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styles from './NotFound.module.css';

function NotFound() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title: 'Error 404',
        html: 'La pagina no existe o debe iniciar sesion para poder acceder.',
        icon: 'error',
        confirmButtonText: '<a href="/login">Iniciar Sesion</a>',
        showCloseButton: false,
        showCancelButton: false,
        focusConfirm: true,
    });
    return <div className={styles.container}></div>;
}

export default NotFound;
