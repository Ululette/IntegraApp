import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Select, TextField, MenuItem, Avatar } from '@material-ui/core';
import styles from './Login.module.css';

function Login() {
    const [role, setRole] = useState(10);
    const [doc, setDoc] = useState(40);
    const [input, setInput] = useState({ doc: '', pass: '' });

    const handleChange = (event) => {
        const value = event.target.value;
        value <= 30 ? setRole(value) : setDoc(value);
    };

    const handleInput = (event) => {
        const value = event.target.value;
        const label = event.target.label;
        const regex = /^[0-9\b]+$/; // this regex is to accept only numbers

        if (label === 'Email') setInput({ doc: value });

        if ((value === '' || regex.test(value)) && value.length <= 8)
            setInput({ doc: value });
    };

    return (
        <div className={styles.container}>
            <aside className={styles.header}>
                <h2>¡Bienvenido a Mi Integra Salud!</h2>
                <p>
                    Aqui podras administrar tu informacion, gestionar tramites,
                    recetas, estudios. Todo en un mismo lugar y mucho mas facil.
                </p>
                <NavLink to='/register'>
                    <button className={styles.buttonRegister}>Asociate</button>
                </NavLink>
            </aside>
            <form className={styles.formLogin}>
                <section>
                    <label className={styles.labelRole} htmlFor='role'>
                        Ingresar como:
                    </label>
                    <Select
                        value={role}
                        id='role'
                        className={styles.selectRole}
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Socio</MenuItem>
                        <MenuItem value={20}>Medico</MenuItem>
                        <MenuItem value={30}>Admin</MenuItem>
                    </Select>
                </section>

                <img
                    src='../../assets/images/logo.png'
                    alt='Logo Integra.'
                    className={styles.logo}
                />
                <img
                    src='https://picsum.photos/200'
                    alt='Avatar icon.'
                    className={styles.userPic}
                />
                {role === 20 ? (
                    <p className={styles.matricula}>Bienvenido Doctor</p>
                ) : role === 10 ? (
                    <Select
                        value={doc}
                        className={styles.selectDoc}
                        onChange={handleChange}
                    >
                        <MenuItem value={40}>DNI</MenuItem>
                        <MenuItem value={50}>Pasaporte</MenuItem>
                    </Select>
                ) : (
                    <p className={styles.matricula}>Bienvenido Admin</p>
                )}
                <TextField
                    className={styles.inputData}
                    label={
                        role === 10
                            ? 'Nº de documento'
                            : role === 20
                            ? 'Nº de matricula'
                            : 'Email'
                    }
                    value={input.doc}
                    onChange={handleInput}
                    required
                />
                <TextField
                    className={styles.inputData}
                    label='Contraseña'
                    type='password'
                    required
                />
                <input
                    className={styles.buttonLogin}
                    type='submit'
                    value='Ingresar'
                />
            </form>
        </div>
    );
}

export default Login;
