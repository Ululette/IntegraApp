import React from 'react';
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
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import CircularProgress from '@material-ui/core/CircularProgress';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import EditIcon from '@material-ui/icons/Edit';
import blue from '@material-ui/core/colors/blue'
import 'firebase/auth';
import AdminMedicAdd from '../AdminMedics/AdminMedicAdd';
import AdminMedicEdit from '../AdminMedics/AdminMedicEdit';
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
    Input,
    DialogActions,
    TextField,
} from '@material-ui/core';
import { Button } from '@material-ui/core';
import calculateAge from '../../../functions/calculateAge';
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
        label: 'Acciones',
    },
    {
        id: 'profilePic',
        numeric: false,
        disablePadding: false,
        label: 'Foto',
    },
    { id: 'name', numeric: false, disablePadding: true, label: 'Nombre' },
    {
        id: 'lastname',
        numeric: false,
        disablePadding: false,
        label: 'Apellido',
    },
    {
        id: 'medic_license',
        numeric: false,
        disablePadding: false,
        label: 'Matricula',
    },
    { id: 'dni', numeric: true, disablePadding: false, label: 'DNI' },
    { id: 'email', numeric: false, disablePadding: false, label: 'E-Mail' },
    {
        id: 'phone_number',
        numeric: false,
        disablePadding: false,
        label: 'Numero de telefono',
    },
    {
        id: 'birthdate',
        numeric: true,
        disablePadding: false,
        label: 'Edad',
    },

    {
        id: 'specialties',
        numeric: false,
        disablePadding: false,
        label: 'Especialidad',
    },
    { id: 'state', numeric: false, disablePadding: false, label: 'Estado' },
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

// const useToolbarStyles = makeStyles((theme) => ({
//     root: {
//         paddingLeft: theme.spacing(2),
//         paddingRight: theme.spacing(1),
//     },
//     highlight:
//         theme.palette.type === 'light'
//             ? {
//                   color: theme.palette.secondary.main,
//                   backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//               }
//             : {
//                   color: theme.palette.text.primary,
//                   backgroundColor: theme.palette.secondary.dark,
//               },
//     title: {
//         flex: '1 1 100%',
//     },
//     dialog: {
//         zIndex: '-6',
//     },
// }));

//------------------------makeStyle1---------------------------------------------------------------------------------------
const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        backgroundColor: lighten('#34a7a1', 0.3), 
        width:'100%'
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
            backgroundColor: blue[500],
        }
    }
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, setToShowRows, toShowRows, rows } = props;
    const [open, setOpen] = React.useState(false);
    const [selectedOption, setSelectedOption] = React.useState('');
    const [selectedState, setSelectedState] = React.useState('activo');

    const handleChange = (event) => {
        event.target.name === 'state'
            ?   setSelectedState(event.target.value) &&
                setSelectedOption(event.target.value)
            :   setSelectedOption(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setToShowRows(rows);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        selectedOption === 'state'
            ? filter(e.target[0].value, e.target[1].value)
            : filter(e.target[0].value, e.target[2].value);
    };

    const filter = (value, option) => {
        setToShowRows(rows);
        if (option === 'lastname') {
            value
                ? setToShowRows(
                      toShowRows.filter((r) => {
                        return r[option]
                            .toLowerCase()
                            .includes(value.toLowerCase());
                      })
                  )
                : setToShowRows(rows);
        } else if (option === 'dni') {
            value
                ? setToShowRows(
                      toShowRows.filter((r) => {
                          return String(r[option])
                              .toLowerCase()
                              .includes(value.toLowerCase());
                      })
                  )
                : setToShowRows(rows);
        } else if (option === 'medical_specialities') {
            value
                ? setToShowRows(
                      toShowRows.filter((r) =>
                          r[option].some((e) =>
                              e.name.toLowerCase().includes(value.toLowerCase())
                          )
                      )
                  )
                : setToShowRows(rows);
        } else if (option === 'state') {
            value
                ? setToShowRows(
                      toShowRows.filter((r) => {
                          return (
                              r[option].toLowerCase() === value.toLowerCase()
                          );
                      })
                  )
                : setToShowRows(rows);
        } else setToShowRows(rows);
        setOpen(false);
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
                DOCTORS
            </Typography>
            <Tooltip title='Clear' 
                onClick={handleClose} className={classes.iconFilter}>
                <IconButton aria-label='reset'>
                    <ClearAllIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title='Filter list' 
                onClick={handleClickOpen} className={classes.iconFilter}>
                <IconButton aria-label='filter list'>
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
                <DialogTitle>Fill the form</DialogTitle>
                <form className={classes.container} onSubmit={handleSubmit}>
                    <DialogContent>
                        <FormControl className={classes.formControl}>
                            {selectedOption === 'state' ? (
                                <FormControl className={classes.formControl}>
                                    <Select
                                        native
                                        value={selectedState}
                                        onChange={handleChange}
                                        input={
                                            <Input id='demo-dialog-native' />
                                        }
                                        name='state'
                                        label='value'
                                    >
                                        <option aria-label='None' value='' />
                                        <option value='activo'>Activo</option>
                                        <option value='inhabilitado'>Inhabilitado</option>
                                    </Select>
                                </FormControl>
                            ) : (
                                <TextField
                                    id='outlined-basic'
                                    label='value'
                                    variant='outlined'
                                />
                            )}
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor='demo-dialog-native'>
                                Filter By
                            </InputLabel>
                            <Select
                                native
                                value={selectedOption}
                                onChange={handleChange}
                                input={<Input id='demo-dialog-native' />}
                            >
                                <option aria-label='None' value='' />
                                <option value='dni'>DNI</option>
                                <option value='lastname'>Last Name</option>
                                <option value='medical_specialities'>
                                    Specialty
                                </option>
                                <option value='state'>State</option>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color='primary'>
                            Cancel
                        </Button>
                        <Button color='primary' type='submit'>
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

// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//     },
//     paper: {
//         width: '100%',
//         marginBottom: theme.spacing(2),
//     },
//     table: {
//         minWidth: 750,
//     },
//     visuallyHidden: {
//         clip: 'rect(0 0 0 0)',
//         overflow: 'hidden',
//         padding: 0,
//     },
// }));

//-------------------- EnhancedTableToolbar Style
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
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
    }
}));

export default function MedicsTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [listMedics, setListMedics] = React.useState([]);
    const [medicSpecialities, setMedicSpecialities] = React.useState([]);
    const [editActive, setEditActive] = React.useState(false);
    const [medicData, setMedicData] = React.useState(null);
    const [toShowRows, setToShowRows] = React.useState([]);
    const MySwal = withReactContent(Swal);

    const fetchMedics = async () => {
        const { data: medics, error: errorFetchMedics } = await supabase
            .from('medics')
            .select(
                'dni, name, lastname, medic_license, email, phone_number, birthdate, state, profilePic, medical_specialities (id, name)'
            );
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
        fetchMedics();
        fetchSpecialities();
    }, []);

    const handleEdit = (medicData) => {
        console.log(medicData, 'medicData Tabs');
        setMedicData(medicData);
        setEditActive(true);
        if (editActive) setEditActive(false);
    };

    const handleDelete = async (medicData) => {
        MySwal.fire({
            title: `Desea inhabilitar al medico ${medicData.name} ${medicData.lastname} de la obra social?`,
            showCloseButton: true,
            showCancelButton: true,
            icon: 'question',
        }).then(async (res) => {
            if (res.isConfirmed) {
                try {
                    await supabase
                        .from('medics')
                        .update({ state: 'inhabilitado' })
                        .eq('dni', medicData.dni);
                    MySwal.fire({
                        title: 'Se inhabilito al medico con exito!',
                        icon: 'success',
                        timer: 2000,
                    }).then(() => window.location.reload());
                } catch (error) {
                    console.log(error);
                }
            }
        });
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
                                            <TableCell align='center' className={index%2 ===1 ? classes.rowColor :null}>
                                                <EditIcon
                                                    onClick={() =>
                                                        handleEdit(row)
                                                    }
                                                />
                                                <DeleteIcon
                                                    onClick={() =>
                                                        handleDelete(row)
                                                    }
                                                />
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
                                            <TableCell align='left' className={index%2 ===1 ? classes.rowColor :null}>
                                                {row.medic_license}
                                            </TableCell>
                                            <TableCell align='left' className={index%2 ===1 ? classes.rowColor :null}>
                                                {row.dni}
                                            </TableCell>
                                            <TableCell align='left' className={index%2 ===1 ? classes.rowColor :null}>
                                                {row.email}
                                            </TableCell>
                                            <TableCell align='left' className={index%2 ===1 ? classes.rowColor :null}>
                                                {row.phone_number}
                                            </TableCell>
                                            <TableCell align='left' className={index%2 ===1 ? classes.rowColor :null}>
                                                {calculateAge(row.birthdate)}
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
                                            <TableCell align='left' className={index%2 ===1 ? classes.rowColor :null}>
                                                {row.state}
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
            {editActive ? (
                <AdminMedicEdit
                    medicData={medicData}
                    medicSpecialities={medicSpecialities}
                    setEditActive={setEditActive}
                    editActive={editActive}
                />
            ) : null}
            <AdminMedicAdd medicSpecialities={medicSpecialities} />
        </div>
    );
}
