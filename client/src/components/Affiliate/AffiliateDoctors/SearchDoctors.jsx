import React, { useState, useEffect } from 'react';
import { makeStyles, StylesProvider, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import supabase from '../../../supabase.config';
import ReactPaginate from 'react-paginate';
import PopUp from './PopUp';
import styles from './SearchDoctors.module.css';

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function SearchDoctors() {
    const [showPopup, setShowPup] = useState(false);
    const [medicalSpeciality, setMedicalSpeciality] = useState('');
    // const [locality, setLocality] = useState([]);
    const [speciality, setSpeciality] = useState([]);
    let [doctors, setDoctors] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    // const [user, setUser] = useState(null);
    const [doctor, setDoctor] = useState({});
    const docsPerPage = 10;
    const pagesVisited = pageNumber * docsPerPage;

    function togglePopup(index) {
        if (index) {
            console.log(doctors, 'hola');
            let selected = doctors.filter((d) => d.dni === index);
            setDoctor(...selected);
        }
        setShowPup(!showPopup);
        console.log(index, 'index');
    }
    /*      const fetchUserData = async => {
        const  {data: userInfo, error: errorFetchUser} = await supabase
        .from('partners')
        .select('plans(id, name')

    }   */
    /*     useEffect(() => {
        const fetchState = async () => {
            let { data: state } = await supabase.from('states').select('*');
            setState(state);
            console.log(state)
        };
        fetchState();
    }, []);
    useEffect(() => {
        const fetchLocality = async () => {
            let { data: locality } = await supabase
            .from('localities')
            .select('name, id')
            .lt('id', state.id)
            setLocality(locality);
            console.log(locality)
        };
        fetchLocality();
    }, []); */
    useEffect(() => {
        const fetchSpeciality = async () => {
            let { data: speciality } = await supabase
                .from('medical_specialities')
                .select('*');
            setSpeciality(speciality);
            console.log(speciality);
        };
        fetchSpeciality();
    }, []);
    useEffect(() => {
        const fetchDoctors = async () => {
            let { data: doctors } = await supabase
                .from('medics')
                .select(
                    'dni, name, lastname, email, phone_number, profilePic, address, medical_specialities(id, name), plans(id, name)'
                );
            setDoctors(doctors);
            console.log(doctors);
        };
        fetchDoctors();
    }, []);

    const myPlan = JSON.parse(localStorage.getItem('affiliatedata'));
    doctors = doctors.filter((doc) =>
        doc.plans.find((plan) => plan.id === myPlan.plan_id)
    );
    const classes = useStyles();

    /* const handleChangeState = (e) => {
    e.preventDefault();
    setState(e.target.value);
  };

  const handleChangeLocality = (e) => {
    e.preventDefault();
    setState(e.target.value);
  }; */
    const handleChangeSpeciality = (e) => {
        setMedicalSpeciality(e.target.value);
    };
    const copyDoctors = doctors.map((d) => d);
    if (medicalSpeciality !== '') {
        doctors = doctors.filter((doc) =>
            doc.medical_specialities.find(
                (speciality) => speciality.name === medicalSpeciality
            )
        );
    } else {
        doctors = copyDoctors.map((d) => d);
    }

    const pageCount = Math.ceil(doctors.length / docsPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    return (
        <div>
            <FormControl className={classes.margin}>
                <InputLabel htmlFor='demo-customized-select-native'>
                Elegir especialidad

                </InputLabel>
                {/*      <NativeSelect
        onChange= {handleChangeState}>
        <option className="labels">Provincia</option>
        {state.map((x) => (
              <option value={x.name} key={x.id}>
                {x.name}
              </option>
            ))}
        </NativeSelect> */}
                {/*      <NativeSelect
        onChange= {handleChangeLocality}>
        <option className="labels">Localidad</option>
        {locality.map((x) => (
              <option value={x.name} key={x.id}>
                {x.name}
              </option>
            ))}
        </NativeSelect> */}
                <NativeSelect name='select' onChange={handleChangeSpeciality}>
                    <option value='' className='labels'>
                        Elegir especialidad
                    </option>
                    {speciality.map((x) => (
                        <option value={x.name} key={x.id}>
                            {x.name}
                        </option>
                    ))}
                </NativeSelect>
                <div className = {styles.drDisplay}>
                    {' '}
                    {doctors
                        .slice(pagesVisited, pagesVisited + docsPerPage)
                        .map((d) => (
                            <button className={styles.drButton}
                                key={d.id}
                                onClick={() => togglePopup(d.dni)}
                            >
                                {' '}
                                {`${d.name} ${d.lastname}`}
                            </button>
                        ))}
                </div>
            </FormControl>
            {showPopup && (
                <PopUp
                    doctor={doctor}
                    text='Cerrar'
                    closePopup={togglePopup}
                    show={showPopup}
                />
            )}
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={pageCount}
                onPageChange={changePage}
                className={styles.pagination}
                containerClassName={styles.paginationButtons}
                previousLinkClassName={styles.previousLink}
                nextLinkClassName={styles.nextLink}
                disabledClassName={styles.paginationDisabled}
                activeClassName={styles.paginationActive}
            />
        </div>
    );
}

//tengo que decirle que doctor en especifico es para el popup
//los filtro nos andan
//tengo que poder filtrar el plan primero
