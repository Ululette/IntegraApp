import {
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Slide,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@material-ui/core';
import {
    ArrowForwardIos,
    AssignmentInd,
    Favorite,
    Note,
    Payment,
    Receipt,
} from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import supabase from '../../../supabase.config.js';
import styles from './UserHome.module.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function UserHome() {
    const affiliateData = JSON.parse(localStorage.getItem('affiliatedata'));
    const userData = JSON.parse(localStorage.getItem('userdata'));
    const [familyGroup, setFamilyGroup] = useState([]);
    const [lastConsults, setLastConsults] = useState([]);
    const [payments, setPayments] = useState([]);
    const [authorizations, setAuthorizations] = useState([]);
    const [lastStudies, setLastStudies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [lastPrescriptions, setLastPrescriptions] = useState([]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const fetchData = async () => {
        const { data: group } = await supabase
            .from('partners')
            .select('*')
            .eq('family_group', affiliateData.family_group);
        if (group.length > 0) {
            setFamilyGroup(group);
        }

        const dniFamilyGroup = group.map((el) => el.dni);

        const { data: consults } = await supabase
            .from('medical_consultations')
            .select('*')
            .in('partner_dni', dniFamilyGroup)
            .limit(3);
        if (consults && consults.length > 0) {
            setLastConsults(consults);
        }

        const { data: noPayments } = await supabase
            .from('payments')
            .select('expiration_date, amount')
            .match({ partner_dni: userData.dni, payed: false });
        if (noPayments && noPayments.length > 0) {
            setPayments(noPayments);
        }

        const { data: auths } = await supabase
            .from('orders')
            .select('*, order_status(name)')
            .in('partner_dni', dniFamilyGroup)
            .order('date', { ascending: false })
            .limit(3);
        if (auths && auths.length > 0) {
            setAuthorizations(auths);
        }

        const { data: studies } = await supabase
            .from('orders')
            .select('*')
            .in('partner_dni', dniFamilyGroup)
            .eq('status', 5)
            .order('date', { ascending: false })
            .limit(3);

        if (studies && studies.length > 0) {
            setLastStudies(studies);
        }

        const { data: favs } = await supabase
            .from('favorites')
            .select('medics (name, lastname, medical_specialities (name))')
            .eq('partner_dni', userData.dni)
            .limit(3);
        if (favs && favs.length > 0) {
            setFavorites(favs);
        }

        const { data: pres } = await supabase
            .from('prescriptions')
            .select('*')
            .in('partner_dni', dniFamilyGroup)
            .order('date', { ascending: false })
            .limit(3);
        if (pres && pres.length > 0) {
            setLastPrescriptions(pres);
        }
    };

    useEffect(() => {
        fetchData();
        //eslint-disable-next-line
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.name}>Hola {affiliateData.name}</h1>
            <header className={styles.header}>
                <img
                    src='../../../assets/images/leftHomeUser.png'
                    alt='Left user home.'
                    width='auto'
                    height='75px'
                />
                <article className={styles.titles}>
                    <h3>
                        <span>Cuidarte</span> es cosa de nosotros.
                    </h3>
                </article>
                <img
                    src='../../../assets/images/rightHomeUser.png'
                    alt='Right user home.'
                    width='auto'
                    height='75px'
                />
            </header>

            <div className={styles.dashContainer}>
                <section className={styles.leftSide}>
                    <article className={styles.lastConsults}>
                        <ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <AssignmentInd
                                        style={{ color: '00897b' }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary='Historial de atenciones' />
                                <ListItemIcon>
                                    <ArrowForwardIos
                                        className={styles.arrowForward}
                                        style={{ color: '00897b' }}
                                    />
                                </ListItemIcon>
                            </ListItem>
                            <Divider />
                            {lastConsults.length > 0 ? (
                                lastConsults.map((el, idx) => (
                                    <>
                                        <ListItem key={`consult-${idx}`} button>
                                            <ListItemText
                                                primary={el.date}
                                                secondary={
                                                    <>
                                                        <Typography component='p'>
                                                            Familiar:{' '}
                                                            {
                                                                familyGroup.find(
                                                                    (fam) =>
                                                                        el.partner_dni ===
                                                                        fam.dni
                                                                ).name
                                                            }{' '}
                                                            {
                                                                familyGroup.find(
                                                                    (fam) =>
                                                                        el.partner_dni ===
                                                                        fam.dni
                                                                ).lastname
                                                            }
                                                        </Typography>
                                                        <Typography component='p'>
                                                            Razon: {el.reason}
                                                        </Typography>
                                                    </>
                                                }
                                            />
                                        </ListItem>
                                        <Divider />
                                    </>
                                ))
                            ) : (
                                <p className={styles.noOne}>
                                    No hay consultas recientes
                                </p>
                            )}
                        </ListItem>
                    </article>
                    <article className={styles.payments}>
                        <List>
                            <ListItem button>
                                <ListItemIcon>
                                    <Payment style={{ color: '00897b' }} />
                                </ListItemIcon>
                                <ListItemText primary='Pago Online' />
                                <ListItemIcon>
                                    <ArrowForwardIos
                                        className={styles.arrowForward}
                                        style={{ color: '00897b' }}
                                    />
                                </ListItemIcon>
                            </ListItem>
                        </List>
                        <Divider />
                        <div className={styles.boxPayments}>
                            <h3>
                                ${' '}
                                {payments.length !== 0
                                    ? payments.reduce(
                                          (accu, el) => accu + el.amount,
                                          0
                                      )
                                    : '0,00'}
                            </h3>
                        </div>
                        <p
                            style={{
                                fontSize: '1.2rem',
                                margin: '1rem',
                                textAlign: 'center',
                            }}
                        >
                            <strong>
                                Pendiente a pagar el{' '}
                                {`23-${
                                    String(new Date().getMonth()).length === 1
                                        ? '0' +
                                          String(new Date().getMonth() + 1)
                                        : String(new Date().getMonth())
                                }-${new Date().getFullYear()}`}
                            </strong>
                        </p>
                        <p style={{ fontSize: '1rem', margin: '1rem' }}>
                            <strong>
                                El importe a pagar corresponde ser abonado por
                                el asociado en concepto de copagos por
                                prestaciones realizadas y otros gastos por fuera
                                de la cobertura del plan.
                            </strong>
                        </p>
                        <p style={{ margin: '1rem' }}>
                            <strong>
                                Para conocer los medios de pago habilitados hacé{' '}
                                <span
                                    onClick={handleClickOpen}
                                    style={{ color: 'blue', cursor: 'pointer' }}
                                >
                                    click aquí
                                </span>
                                .
                            </strong>
                            <Divider />
                        </p>
                    </article>
                    <article className={styles.lastAuths}>
                        <List>
                            <ListItem button>
                                <ListItemIcon>
                                    <Note style={{ color: '00897b' }} />
                                </ListItemIcon>
                                <ListItemText primary='Autorizaciones' />
                                <ListItemIcon>
                                    <ArrowForwardIos
                                        className={styles.arrowForward}
                                        style={{ color: '00897b' }}
                                    />
                                </ListItemIcon>
                            </ListItem>
                            <Divider />
                            {authorizations.length > 0 ? (
                                authorizations.map((el) => (
                                    <>
                                        <ListItem button>
                                            <ListItemText
                                                primary={el.date}
                                                secondary={
                                                    <>
                                                        <Typography component='p'>
                                                            Familiar:{' '}
                                                            {
                                                                familyGroup.find(
                                                                    (fam) =>
                                                                        el.partner_dni ===
                                                                        fam.dni
                                                                ).name
                                                            }{' '}
                                                            {
                                                                familyGroup.find(
                                                                    (fam) =>
                                                                        el.partner_dni ===
                                                                        fam.dni
                                                                ).lastname
                                                            }
                                                        </Typography>
                                                        <Typography component='p'>
                                                            Estudio:{' '}
                                                            {el.study_name}
                                                        </Typography>
                                                        <Typography component='p'>
                                                            Estado:{' '}
                                                            {
                                                                el.order_status
                                                                    .name
                                                            }
                                                        </Typography>
                                                    </>
                                                }
                                            />
                                        </ListItem>
                                        <Divider />
                                    </>
                                ))
                            ) : (
                                <p className={styles.noOne}>
                                    No hay autorizacion por el momento.
                                </p>
                            )}
                        </List>
                    </article>
                </section>
                <section className={styles.rightSide}>
                    <article className={styles.lastStudies}>
                        <List>
                            <ListItem button>
                                <ListItemIcon>
                                    <Note style={{ color: '00897b' }} />
                                </ListItemIcon>
                                <ListItemText primary='Estudios realizados' />
                                <ListItemIcon>
                                    <ArrowForwardIos
                                        className={styles.arrowForward}
                                        style={{ color: '00897b' }}
                                    />
                                </ListItemIcon>
                            </ListItem>
                            <Divider />
                            {lastStudies.length > 0 ? (
                                lastStudies.map((el) => (
                                    <>
                                        <ListItem button>
                                            <ListItemText
                                                primary={el.date}
                                                secondary={
                                                    <>
                                                        <Typography component='p'>
                                                            Familiar:{' '}
                                                            {
                                                                familyGroup.find(
                                                                    (fam) =>
                                                                        el.partner_dni ===
                                                                        fam.dni
                                                                ).name
                                                            }{' '}
                                                            {
                                                                familyGroup.find(
                                                                    (fam) =>
                                                                        el.partner_dni ===
                                                                        fam.dni
                                                                ).lastname
                                                            }
                                                        </Typography>
                                                        <Typography component='p'>
                                                            Estudio:{' '}
                                                            {el.results.name}
                                                        </Typography>
                                                    </>
                                                }
                                            />
                                        </ListItem>
                                        <Divider />
                                    </>
                                ))
                            ) : (
                                <p className={styles.noOne}>
                                    No hay estudios por el momento.
                                </p>
                            )}
                        </List>
                    </article>
                    <article className={styles.favorites}>
                        <List>
                            <ListItem button>
                                <ListItemIcon>
                                    <Favorite style={{ color: '00897b' }} />
                                </ListItemIcon>
                                <ListItemText primary='Favoritos de cartilla' />
                                <ListItemIcon>
                                    <ArrowForwardIos
                                        className={styles.arrowForward}
                                        style={{ color: '00897b' }}
                                    />
                                </ListItemIcon>
                            </ListItem>
                            <Divider />
                            {favorites.length > 0 ? (
                                favorites.map((el) => (
                                    <>
                                        <ListItem button>
                                            <ListItemText
                                                primary={`${el.medics.name} ${el.medics.lastname}`}
                                                secondary={
                                                    el.medics
                                                        .medical_specialities
                                                        .length > 0
                                                        ? el.medics.medical_specialities.map(
                                                              (spec) => (
                                                                  <Typography component='p'>
                                                                      {
                                                                          spec.name
                                                                      }
                                                                  </Typography>
                                                              )
                                                          )
                                                        : null
                                                }
                                            />
                                        </ListItem>
                                        <Divider />
                                    </>
                                ))
                            ) : (
                                <p className={styles.noOne}>
                                    No hay favoritos por el momento.
                                </p>
                            )}
                        </List>
                    </article>
                    <article className={styles.lastPrescriptions}>
                        <List>
                            <ListItem button>
                                <ListItemIcon>
                                    <Receipt style={{ color: '00897b' }} />
                                </ListItemIcon>
                                <ListItemText primary='Ultimas recetas' />
                                <ListItemIcon>
                                    <ArrowForwardIos
                                        className={styles.arrowForward}
                                        style={{ color: '00897b' }}
                                    />
                                </ListItemIcon>
                            </ListItem>
                            <Divider />
                            {lastPrescriptions.length > 0 ? (
                                lastPrescriptions.map((el) => (
                                    <>
                                        <ListItem button>
                                            <ListItemText
                                                primary={el.date}
                                                secondary={
                                                    <>
                                                        <Typography component='p'>
                                                            Familiar:{' '}
                                                            {
                                                                familyGroup.find(
                                                                    (fam) =>
                                                                        el.partner_dni ===
                                                                        fam.dni
                                                                ).name
                                                            }{' '}
                                                            {
                                                                familyGroup.find(
                                                                    (fam) =>
                                                                        el.partner_dni ===
                                                                        fam.dni
                                                                ).lastname
                                                            }
                                                        </Typography>
                                                        <Typography component='p'>
                                                            Medicamento:{' '}
                                                            {el.drug_name}
                                                        </Typography>
                                                        {el.drug_name_2 ? (
                                                            <Typography component='p'>
                                                                Medicamento 2:{' '}
                                                                {el.drug_name_2}
                                                            </Typography>
                                                        ) : null}
                                                    </>
                                                }
                                            />
                                        </ListItem>
                                        <Divider />
                                    </>
                                ))
                            ) : (
                                <p className={styles.noOne}>
                                    No hay recetas por el momento.
                                </p>
                            )}
                        </List>
                    </article>
                </section>
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <DialogTitle>{'Medios de pago disponibles'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <img
                            src='../../../assets/images/mercadopago.jpg'
                            alt='Medios de pago.'
                            width='90%'
                            height='auto'
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={handleClose}
                        className={styles.closeButton}
                    >
                        Cerrar
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default UserHome;
