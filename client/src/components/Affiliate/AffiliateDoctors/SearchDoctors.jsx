import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import CircularProgress from '@material-ui/core/CircularProgress';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import InfoIcon from '@material-ui/icons/Info';
import FavoriteIcon from '@material-ui/icons/Favorite';
import blue from '@material-ui/core/colors/blue'
import 'firebase/auth';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Input,
    DialogActions,
    TextField,
} from '@material-ui/core';
import { Button } from '@material-ui/core';
import supabase from '../../../supabase.config';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'actions',
        numeric: false,
        disablePadding: false,
        label: 'ACCIONES',
    },
    {
        id: 'profilePic',
        numeric: false,
        disablePadding: false,
        label: 'FOTO',
    },
    { id: 'name', numeric: false, disablePadding: true, label: 'NOMBRE' },
    {
        id: 'lastname',
        numeric: false,
        disablePadding: false,
        label: 'APELLIDO',
    },
    {
        id: 'specialties',
        numeric: false,
        disablePadding: false,
        label: 'ESPECIALIDAD',
    },
];

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead className={classes.title}>
            <TableRow>
                {headCells.map((headCell, index) => (
                    <TableCell
                        key={`${headCell.id}-${index}`}
                        align='left'
                        padding='default'
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            className={classes.title}
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc'
                                        ? 'sorted descending'
                                        : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

//------------------------makeStyle1---------------------------------------------------------------------------------------
const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
        backgroundColor: lighten('#34a7a1', 0.3), 
        
        //color barra superior '
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: '#fafafa',
                backgroundColor: lighten(blue[500], 0.5),//color barra superior cuando selecciono item
                fontWeight:'bold',
                fontSize:'30px'
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: lighten('#34a7a1', 0.3),
                
            },
    title: {
        flex: '1 1 100%',
        fontWeight:'bold',
        fontSize:'1.4rem',
        color: '#fafafa',
        textAlign:'center'
    },
    filters:{
        display:'flex'
    },
    iconFilter:{
        color:'#fafafa',
        fontWeight:'bold',
        '&:hover':{
            backgroundColor: '#34a7a1',
        }
    },
    iconBlock:{
        color:'#fafafa',
        fontWeight:'bold',
        '&:hover':{
            backgroundColor: lighten('#34a7a1', 0.8),
        }
    },
    container:{
        margin: theme.spacing(1),
        width: '90%',
    },
    formControl:{
        margin: theme.spacing(1),
        width: '80%',
    }
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, setToShowRows, toShowRows, rows,medicSpecialities } = props;
    const [open, setOpen] = React.useState(false);
    const [selectedState, setSelectedState] = React.useState();
    const [states, setStates] = React.useState();
    const [selectedLocality, setSelectedLocality] = React.useState();
    const [localities, setLocalities] = React.useState();
    const [selectedSpeciality, setSelectedSpeciality] = React.useState();
    const [specialities, setSpecialities] = React.useState();
    const [medicsToShow, setMedicsToShow] = React.useState([]);

    const resetStates=async()=>{
        setSelectedLocality();
        setSelectedSpeciality();
        setSelectedState();
    }

    useEffect(async()=>{
        try {
            let { data: states } = await supabase
                .from('states')
                .select('id,name')
            setStates(states);
        } catch (err) {
            console.error(err);
        }
    },[]);
    const getLocalities=async(idState)=>{
        try {
            let { data: localities } = await supabase
                .from('localities')
                .select('id,id_locality,name,postal_code,state_id')
                .eq('state_id',idState)
            setLocalities(localities);
        } catch (err) {
            console.error(err);
        }
    }

    const getMedics=async(idLocality,idSpeciality)=>{
        console.log('idLocality',idLocality)
        if(!idSpeciality&&idLocality){
            console.log('!idSpeciality&&idLocality');
            try {
                let { data: medics, error: errorFetchMedics } = await supabase
                .from('address')
                .select('medics(name, lastname, medic_license, email, phone_number, profilePic, medical_specialities (id, name), address(street, street_number, floor, department, localities(id,id_locality, name, postal_code,states(id,name))))')
                .eq('locality_id',idLocality)
                console.log('Medicos:',medics);
                let array=[];
                for(let ad of medics){
                    if(ad!==null){
                        array.push(ad.medics);
                    }
                }
                console.log('Array final:',array);
                setMedicsToShow(array);
            } catch (err) {
                console.error(err);
            }
        } else if(idLocality&&idSpeciality){
            console.log('idLocality&&idSpeciality');
            try {
                let { data: medics, error: errorFetchMedics } = await supabase
                .from('address')
                .select('medics(name, lastname, medic_license, email, phone_number, profilePic, medical_specialities (id, name), address(street, street_number, floor, department, localities(id_locality, name, postal_code,states(id,name)))))')
                .eq('locality_id',idLocality)
                // .eq('medical_specialities.id',idSpeciality)
                console.log(medics);
                let array=[];
                let retorno=[];
                for(let ad of medics){
                    array.push(ad.medics);
                }
                // console.log('array:',array);
                for(let med of array){   
                    for(let spec of med.medical_specialities){
                        // console.log('spec:',spec);
                        if(spec.id==idSpeciality){
                            console.log('spec.id:',spec.id);
                            retorno.push(med);
                        }
                    }
                }
                console.log('retorno:',retorno);
                setMedicsToShow(retorno);
            } catch (err) {
                console.error(err);
            }
        } else if(!idLocality&&idSpeciality){
            console.log('!idLocality&&idSpeciality');
            try {
                let { data: medics, error: errorFetchMedics } = await supabase
                .from('medics_medical_specialities')
                .select('medics(name, lastname, medic_license, email, phone_number, profilePic, medical_specialities (id, name), address(street, street_number, floor, department, localities(id_locality, name, postal_code,states(id,name))))')
                .eq('speciality_id',idSpeciality)
                let array=[];
                for(let ad of medics){
                    array.push(ad.medics);
                }
                console.log(array);
                setMedicsToShow(array);
            } catch (err) {
                console.error(err);
            }
        } else if(!idLocality&&!idSpeciality){
            console.log('!idLocality&&!idSpeciality');
            try {
                let { data: medics, error: errorFetchMedics } = await supabase
                .from('medics')
                .select('name, lastname, medic_license, email, phone_number, profilePic, medical_specialities (id, name), address(street, street_number, floor, department, localities(id_locality, name, postal_code,states(id,name))))')
                console.log(medics);
                setMedicsToShow(medics);
            } catch (err) {
                console.error(err);
            }
        }
    }
    
    const getSpecialities = async () => {
        const { data: specialitiesData, error: errorFetchSpecialities } =
            await supabase.from('medical_specialities').select('name, id');
        if (errorFetchSpecialities) return console.log(errorFetchSpecialities);
        setSpecialities(specialitiesData);
    };

    useEffect(()=>{
        getSpecialities(selectedState)
    },[]);
    useEffect(()=>{
        getLocalities(selectedState)
    },[selectedState]);
    useEffect(()=>{
        getMedics(selectedLocality,selectedSpeciality)
    },[selectedLocality]);
    useEffect(()=>{
        getMedics(selectedLocality,selectedSpeciality)
    },[selectedSpeciality]);
    
    const handleStateOption = (e) => {
        setSelectedState(e.target.value);
        console.log('state seleccionado',selectedState)
    }
    const handleLocalityOption = (e) => {
        setSelectedLocality(e.target.value);
    }
    const handleSpecialityOption = (e) => {
        setSelectedSpeciality(e.target.value);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };  
    const handleCancel = () => {
        resetStates()
        setOpen(false);
        setToShowRows(rows);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setOpen(false);
        setToShowRows(medicsToShow);
    };

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <Typography
                className={classes.title}
                variant='h6'
                id='tableTitle'
                component='div'
            >
                MEDICOS
            </Typography>
            <Tooltip title='Clear' 
                onClick={handleCancel} className={classes.iconFilter}>
                <IconButton aria-label='reset'>
                    <ClearAllIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title='Filter list' 
                onClick={handleClickOpen} className={classes.iconFilter}>
                <IconButton aria-label='filter'>
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={open}
                onClose={handleClose}
                className={classes.dialog}
            >
                <DialogTitle>Filtrar por</DialogTitle>
                <form className={classes.container}>
                    <DialogContent>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor='demo-dialog-native'>
                                Especialidad
                            </InputLabel>
                            <Select
                                native
                                value={selectedSpeciality}
                                onChange={handleSpecialityOption}
                                input={<Input id='demo-dialog-native' />}
                            >
                                <option></option>
                                {specialities &&
                                    specialities.map(      
                                        (speciality, index) => (
                                            <option
                                                className='inputSel'
                                                key={index}
                                                value={
                                                    speciality.id
                                                }
                                            >
                                                {
                                                    speciality.name
                                                }
                                            </option>
                                        )
                                    )}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor='demo-dialog-native'>
                                Provincia
                            </InputLabel>
                            <Select
                                native
                                value={selectedState}
                                onChange={handleStateOption}
                                input={<Input id='demo-dialog-native' />}
                            >
                                <option></option>
                                {states &&
                                    states.map(      
                                        (state, index) => (
                                            <option
                                                className='inputSel'
                                                key={index}
                                                value={
                                                    state.id
                                                }
                                            >
                                                {
                                                    state.name
                                                }
                                            </option>
                                        )
                                    )}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            {selectedState &&
                            <div>
                                <InputLabel htmlFor='demo-dialog-native'>
                                    Localidad
                                </InputLabel>
                                <Select
                                    native
                                    value={selectedLocality}
                                    onChange={handleLocalityOption}
                                    input={<Input id='demo-dialog-native' />}
                                >
                                    <option></option>
                                    {localities &&
                                            localities.map(      
                                                (locality, index) => (
                                                    <option
                                                        className='inputSel'
                                                        key={index}
                                                        value={
                                                            locality.id
                                                        }
                                                    >
                                                        {
                                                            locality.name
                                                        }
                                                    </option>
                                                )
                                            )}
                                </Select>
                            </div>}
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel} color='primary'>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit}>
                            Ok
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};


//-------------------- EnhancedTableToolbar Style
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        position: 'relative',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
        
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1
    },
    title:{
        color:'#212121',
        fontWeight: 'bold',
        backgroundColor: lighten('#34a7a1', 0.6)
    },
    rowColor:{
        backgroundColor: lighten('#e0e0e0', 0.3),
        ':checked':{
            color:blue[500]
        }
    },
    iconFilter:{
        color:'rgba(0, 0, 0, 0.47)',
        fontWeight:'bold',
        '&:hover':{
            backgroundColor: lighten('#34a7a1', 0.8),
        }
    }
}));

export default function SearchDoctors() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [listMedics, setListMedics] = React.useState([]);
    const [medicSpecialities, setMedicSpecialities] = React.useState([]);
    const [infoActive, setInfoActive] = React.useState(false);
    const [medicData, setMedicData] = React.useState(null);
    const [toShowRows, setToShowRows] = React.useState([]);
    const MySwal = withReactContent(Swal);
    let userDni = JSON.parse(localStorage.getItem('userdata')).dni;


    const fetchMedics = async () => {
        const { data: medics, error: errorFetchMedics } = await supabase
            .from('medics')
            .select(
                'dni, name, lastname, medic_license, email, phone_number, profilePic, medical_specialities (id, name), address(street, street_number, floor, department, localities(id_locality, name, postal_code,states(id,name)))'
            );
            console.log(medics);
        if (errorFetchMedics) return console.log(errorFetchMedics);
        setToShowRows(medics);
        setListMedics(medics);
    };

    const fetchSpecialities = async () => {
        const { data: specialities, error: errorFetchSpecialities } =
            await supabase.from('medical_specialities').select('name, id');
        if (errorFetchSpecialities) return console.log(errorFetchSpecialities);
        setMedicSpecialities(specialities);
    };

    React.useEffect(() => {
        fetchSpecialities()
        fetchMedics();
        fetchSpecialities();
    }, []);

    const fetchFavs = async (medicDni) => {
        const { data: favs, error: errorFetchFavs } = await supabase
            .from('favorites')
            .select('id')
            .eq('medic_dni',medicDni)
            .eq('partner_dni',userDni)
            console.log('Medicos fav',favs)
        if(favs.length===0){
            console.log('Agrego fav')
            const { data, error } = await supabase
                .from('favorites')
                .insert([
                    { partner_dni: userDni, medic_dni: medicDni },
                ])
            Swal.fire({
                icon: 'success',
                title: 'Médico agregado a favoritos',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            console.log('No agrega a fav')
            Swal.fire({
                icon: 'error',
                title: 'El médico ya se encuentra entre tus favoritos',
              })
        }
        if (errorFetchFavs) return console.log(errorFetchFavs);
    };

    const handleFav = (row) => {
        fetchFavs(row.dni);
    }

    const handleInfo = (medicData) => {
        setMedicData(medicData);
        console.log('Handle info:',medicData)
        let floor = medicData.address[0].floor!==null?`Piso: ${medicData.address[0].floor}`:'';
        let department = medicData.address[0].department!==null?`Depto.: ${medicData.address[0].department}`:'';
        Swal.fire({
            position: 'bottom',
            title: `Dr. ${medicData.name} ${medicData.lastname}`,
            html:
                `<p>Email: ${medicData.email}</p>`+
                `<p>Teléfono: ${medicData.phone_number}</p>`+
                `<p>Dirección: ${medicData.address[0].street+' '+medicData.address[0].street_number}</p>`+
                `<p>${floor+' '+ department}</p>`+
                `<p>${medicData.address[0].localities.name}</p>`+
                `<p>${medicData.address[0].localities.states.name}</p>`,
            imageUrl: medicData.profilePic,
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: 'Custom image',
        })
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = toShowRows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    toShowRows.length>14?console.log('16 medicos'):console.log(toShowRows)

    const emptyRows =
        rowsPerPage -
        Math.min(rowsPerPage, toShowRows.length - page * rowsPerPage);

    if (toShowRows.length === 0) return <CircularProgress color='secondary' />;
    const rows = listMedics;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    setToShowRows={setToShowRows}
                    toShowRows={toShowRows}
                    rows={rows}
                    medicSpecialities={medicSpecialities}
                />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby='tableTitle'
                        size='small'
                        aria-label='enhanced table'
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={toShowRows.length}
                        />
                        <TableBody>
                            {stableSort(
                                toShowRows,
                                getComparator(order, orderBy)
                            )
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            // onClick={(event) => handleClick(event, row.name)}
                                            role='checkbox'
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell align='left' className={index%2 ===1 ? classes.rowColor :null}>
                                                <Tooltip title='Mas info.' className={classes.iconFilter}>
                                                    <IconButton aria-label='Mas info.' >
                                                        <InfoIcon
                                                            onClick={() =>
                                                                handleInfo(row)
                                                            }
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title='Mas info.' className={classes.iconFilter}>
                                                    <IconButton aria-label='Mas info.' >
                                                        <FavoriteIcon
                                                            onClick={() =>
                                                                handleFav(row)
                                                            }
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell align='center' className={index%2 ===1 ? classes.rowColor :null}>
                                                <Avatar
                                                    alt='Profile Picture'
                                                    src={row.profilePic}
                                                />
                                            </TableCell>
                                            <TableCell
                                                className={index%2 ===1 ? classes.rowColor :null}
                                                component='th'
                                                id={labelId}
                                                scope='row'
                                                padding='default'
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align='left' className={index%2 ===1 ? classes.rowColor :null}>
                                                {row.lastname}
                                            </TableCell>
                                            <TableCell className={index%2 ===1 ? classes.rowColor :null}>
                                                <ul>
                                                    {row.medical_specialities
                                                        .length === 0 ? (
                                                        <li>Clinica</li>
                                                    ) : (
                                                        row.medical_specialities.map(
                                                            (s) => (
                                                                <li>
                                                                    {s.name
                                                                        .charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase() +
                                                                        s.name.slice(
                                                                            1
                                                                        )}
                                                                </li>
                                                            )
                                                        )
                                                    )}
                                                </ul>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 33 * emptyRows }}>
                                    <TableCell colSpan={10} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    className={classes.root}
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    component='div'
                    count={toShowRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
