import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import supabase from '../../../supabase.config';
import ReactPaginate from 'react-paginate';
import PopUp from './PopUp';
import styles from './SearchDoctors.module.css';

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
                    Especialidad
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
                        Especialidad
                    </option>
                    {speciality.map((x) => (
                        <option value={x.name} key={x.id}>
                            {x.name}
                        </option>
                    ))}
                </NativeSelect>
                <div>
                    {' '}
                    {doctors
                        .slice(pagesVisited, pagesVisited + docsPerPage)
                        .map((d) => (
                            <button
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
                containerClassName={'paginationButtons'}
                previousLinkClassName={'previousLink'}
                nextLinkClassName={'nextLink'}
                disabledClassName={'paginationDisabled'}
                activeClassName={'paginationActive'}
            />
        </div>
    );
}

//tengo que decirle que doctor en especifico es para el popup
//los filtro nos andan
//tengo que poder filtrar el plan primero
