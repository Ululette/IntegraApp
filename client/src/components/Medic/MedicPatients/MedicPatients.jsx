import React, { useState, useEffect } from 'react';
import supabase from '../../../supabase.config.js';
import styles from './MedicPatients.module.css';
import calculateAge from '../../../functions/calculateAge';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Material-UI components
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

// Material-UI icons
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        background: '#00897B',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    buttonPatient: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        border: '1px solid #2c7f7b',
        color: '#fafafa',
        fontWeight: 'bold',
        backgroundColor: '#2c7f7b',
        '&hover': {
            backgroundColor: 'red',
            color: 'red',
        },
    },
    closeButton: {
        color: '#00897B',
        border: '1px solid #00897B',
        height: '42px',
    },
    newButton: {
        color: '#fff',
        background: '#00897B',
    },
    closeStudy: {
        color: '#00897B',
    },
    nuevo: {},
}));

function MedicPatients() {
    const classes = useStyles();
    const [listPatients, setListPatients] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentPatient, setCurrentPatient] = useState('');
    const [searchDni, setSearchDni] = useState('');
    const [listStudies, setListStudies] = useState([]);
    const [openStudy, setOpenStudy] = useState(false);
    const [studyDetails, setStudyDetails] = useState('');

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const medicData = JSON.parse(localStorage.getItem('medicdata'));
    const dniPatients = medicData.my_patients.map((el) => el.partner_dni);
    const MySwal = withReactContent(Swal);

    const handleOpenStudy = (study) => {
        setStudyDetails(study);
        setOpenStudy(true);
    };

    const handleCloseStudy = () => {
        setOpenStudy(false);
    };

    const fetchPatients = async () => {
        let hasError = false;
        let messageError = '';
        const patients = [];
        for (let dni of dniPatients) {
            const { data: patientsData, error: errorFetchPatients } =
                await supabase
                    .from('partners')
                    .select(
                        '*, pathologies_partners(date_registered, pathologies(name)))'
                    )
                    .eq('dni', dni);
            if (errorFetchPatients) {
                hasError = true;
                messageError = errorFetchPatients.message;
                break;
            }
            patients.push(patientsData[0]);
        }
        if (hasError) {
            return MySwal.fire({
                title: 'Error con el fetch de pacientes.',
                text: `${messageError}`,
                icon: 'error',
            });
        }
        setListPatients(patients.filter((el) => el.state === 'aceptado'));
    };

    const fetchStudies = async (current) => {
        const { data: studiesList, error: errorFetchStudies } = await supabase
            .from('orders')
            .select(
                'study_name, date, results, medical_consultations(medic_dni), order_status(name)'
            )
            .eq('partner_dni', current.dni);
        if (errorFetchStudies) {
            return MySwal.fire({
                title: 'Error con el fetch de estudios.',
                text: `${errorFetchStudies.message}`,
                icon: 'error',
            });
        }
        setListStudies(studiesList);
    };

    useEffect(() => {
        fetchPatients();
        if (currentPatient !== '') {
            fetchStudies(currentPatient);
        }
        // eslint-disable-next-line
    }, [currentPatient]);

    const handleClickOpen = (indexPatient) => {
        setCurrentPatient(listPatients[indexPatient]);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeDni = (e) => {
        const value = e.target.value;
        const regexDni = /^[0-9\b]+$/;
        if (regexDni.test(value) || value === '') {
            setSearchDni(value);
            if (value === '') {
                fetchPatients();
            }
            return setListPatients(
                listPatients.filter((e) => String(e.dni).includes(value))
            );
        }
    };

    return (
        <div className={styles.container}>
            <h1>Mis pacientes</h1>
            <div className={styles.searchbar}>
                <Paper className={styles.paper}>
                    <InputBase
                        placeholder='DNI'
                        type='text'
                        value={searchDni}
                        className={styles.inputSearch}
                        onChange={handleChangeDni}
                    />
                    <SearchIcon />
                </Paper>
            </div>
            <div className={styles.listPatients}>
                {listPatients.map((pat, idx) => (
                    <div key={`div-${idx}`} className={styles.eachPatient}>
                        <Button
                            variant='outlined'
                            className={styles.buttonPatient}
                            key={`patient-${idx}`}
                            onClick={() => handleClickOpen(idx)}
                        >
                            <ListItem>
                                <ListItemText
                                    className={classes.nuevo}
                                    primary={`${pat.dni}`}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={`${pat.name}, ${pat.lastname}`}
                                />
                            </ListItem>
                        </Button>
                        <Divider key={`divider-${idx}`} />
                    </div>
                ))}
            </div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                aria-labelledby='Informacion del paciente'
                className={styles.dialog}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography variant='h6' className={classes.title}>
                            {`Paciente ${currentPatient.name} ${currentPatient.lastname}`}
                        </Typography>
                        <IconButton
                            edge='end'
                            color='inherit'
                            onClick={handleClose}
                            aria-label='close'
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <List className={styles.completeList}>
                        <section className={styles.dataPatient}>
                            <p className={styles.titleContact}>
                                Datos del paciente:
                            </p>
                            <ListItem className={styles.listItem}>
                                <ListItemText
                                    primary={`DNI: ${currentPatient.dni}`}
                                />
                            </ListItem>
                            <ListItem className={styles.listItem}>
                                <ListItemText
                                    primary={`Nombre: ${currentPatient.name}`}
                                />
                            </ListItem>
                            <ListItem className={styles.listItem}>
                                <ListItemText
                                    primary={`Apellido: ${currentPatient.lastname}`}
                                />
                            </ListItem>
                            <ListItem className={styles.listItem}>
                                <ListItemText
                                    primary={`Edad: ${calculateAge(
                                        currentPatient.birthdate
                                    )}`}
                                />
                            </ListItem>
                            <ListItem className={styles.listItem}>
                                <ListItemText
                                    primary={`Genero: ${currentPatient.gender}`}
                                />
                            </ListItem>
                        </section>
                        <section className={styles.dataContact}>
                            <p className={styles.titleContact}>
                                Datos de contacto:
                            </p>
                            <ListItem className={styles.listContact}>
                                <ListItemText
                                    primary={`Email: ${currentPatient.email}`}
                                />
                            </ListItem>
                            <ListItem className={styles.listContact}>
                                <ListItemText
                                    primary={`Telefono: ${currentPatient.phone_number}`}
                                />
                            </ListItem>
                        </section>
                        <section className={styles.pathologies}>
                            <p className={styles.titleContact}>
                                Patologias existentes
                            </p>
                            {currentPatient &&
                            currentPatient.pathologies_partners.length === 0 ? (
                                <ListItem className={styles.listPathology}>
                                    <ListItemText
                                        primary={`Ninguna registrada hasta la fecha.`}
                                    />
                                </ListItem>
                            ) : (
                                currentPatient &&
                                currentPatient.pathologies_partners.map(
                                    (pathology) => (
                                        <ListItem
                                            className={styles.listPathology}
                                        >
                                            <ListItemText
                                                primary={`${pathology.pathologies.name}`}
                                                secondary={`Registrada desde ${pathology.date_registered}`}
                                            />
                                        </ListItem>
                                    )
                                )
                            )}
                        </section>
                        <section className={styles.orders}>
                            <p className={styles.titleContact}>
                                Estudios recientes
                            </p>
                            {listStudies.length === 0 ? (
                                <ListItem>
                                    <ListItemText
                                        className={styles.listColumn}
                                        primary={`Ningun estudio hasta la fecha.`}
                                    />
                                </ListItem>
                            ) : (
                                listStudies.map((study, idx) => (
                                    <article
                                        key={`study-${idx}`}
                                        className={styles.listStudies}
                                    >
                                        <ListItem className={styles.listColumn}>
                                            <ListItemText primary={`Estudio`} />
                                            <ListItemText
                                                primary={`${study.study_name}`}
                                            />
                                        </ListItem>
                                        <ListItem className={styles.listColumn}>
                                            <ListItemText
                                                primary={`Fecha del estudio`}
                                            />
                                            <ListItemText
                                                primary={`${study.date}`}
                                            />
                                        </ListItem>
                                        <ListItem className={styles.listColumn}>
                                            {study.order_status.name ===
                                            'Realizada' ? (
                                                <a
                                                    href='#!'
                                                    onClick={() =>
                                                        handleOpenStudy(study)
                                                    }
                                                    className={
                                                        styles.studyDetails
                                                    }
                                                >
                                                    Ver detalles del estudio
                                                </a>
                                            ) : (
                                                <p
                                                    className={
                                                        styles.studyDetailsParagraph
                                                    }
                                                >
                                                    En proceso...
                                                </p>
                                            )}
                                        </ListItem>
                                    </article>
                                ))
                            )}
                        </section>
                    </List>
                </DialogContent>
                <DialogActions className={styles.buttonsDialog}>
                    <Button
                        autoFocus
                        onClick={handleClose}
                        className={classes.closeButton}
                    >
                        Cerrar
                    </Button>
                    <a
                        href={`/${medicData.dni}/patients/${currentPatient.dni}/newconsultation?dni=${currentPatient.dni}&name=${currentPatient.name}&lastname=${currentPatient.lastname}&birthdate=${currentPatient.birthdate}&gender=${currentPatient.gender}&email=${currentPatient.email}`}
                        target='_blank'
                        rel='noreferrer'
                    >
                        <Button
                            variant='contained'
                            size='large'
                            className={classes.newButton}
                            onClick={handleClose}
                            autoFocus
                        >
                            Nueva Consulta
                        </Button>
                    </a>
                </DialogActions>
            </Dialog>
            {studyDetails === '' ? null : (
                <Dialog
                    fullScreen={fullScreen}
                    open={openStudy}
                    onClose={handleCloseStudy}
                    aria-labelledby='responsive-dialog-title'
                >
                    <DialogTitle
                        id='responsive-dialog-title'
                        style={{ textTransform: 'capitalize' }}
                    >
                        {`${studyDetails.study_name} de ${currentPatient.name} ${currentPatient.lastname}`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {`${studyDetails.results.name}`}
                        </DialogContentText>
                        <DialogContentText>
                            {`Realizado y evaluado por: ${studyDetails.results.results.medic_name}`}
                        </DialogContentText>
                        <DialogContentText>
                            {`Realizado el dia, mes y año: ${studyDetails.results.results.date}`}
                        </DialogContentText>
                        <DialogContentText>{`Resultados:`}</DialogContentText>
                        <DialogContentText style={{ whiteSpace: 'pre' }}>
                            {`${studyDetails.results.results.results.replace(
                                /\|/g,
                                '\n'
                            )}`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleCloseStudy}
                            className={classes.closeStudy}
                            autoFocus
                        >
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
}

export default MedicPatients;
