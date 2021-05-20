import React from 'react';
import Button from '@material-ui/core/Button';
import styles from './UserMedRec.module.css';

function UserMedRec() {
    return (
        <div className={styles.container}>
            <a
                href={`../mymedicalrecords/pdf`}
                target='_blank'
                rel='noreferrer'
            >
                <Button variant='outlined' color='secondary'>
                    Ir a mi ficha medica
                </Button>
            </a>
        </div>
    );
}

export default UserMedRec;
