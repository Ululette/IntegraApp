import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
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
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

import { statesAff } from '../../../functions/states';
import { getAffiliates, getPlans } from '../../../actions/getter.action.js';
import calculateAge from '../../../functions/calculateAge.js';
import styles from './AdminAffiliate.module.css';
import supabase from '../../../supabase.config';
import AdminAside from '../AdminNav/AdminAside.jsx';

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
        id: 'dni',
        numeric: true,
        label: 'DNI',
    },
    {
        id: 'lastname',
        numeric: false,
        label: 'Apellido/s',
    },
    { id: 'name', numeric: false, disablePadding: false, label: 'Nombre/s' },
    { id: 'age', numeric: true, disablePadding: false, label: 'Edad' },
    {
        id: 'plan',
        numeric: false,
        label: 'Plan',
    },
    { id: 'gender', numeric: false, disablePadding: false, label: 'Genero' },
    {
        id: 'phoneNumber',
        numeric: false,
        label: 'Contacto',
    },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'titular', numeric: false, disablePadding: false, label: 'Titular' },
    {
        id: 'familyBond',
        numeric: false,
        label: 'Rol familiar',
    },
    {
        id: 'groupFamily',
        numeric: true,
        label: 'Grupo Familiar',
    },
    {
        id: 'state',
        numeric: false,
        label: 'Estado',
    },
];

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding='checkbox'></TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'center'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
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
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                  color: theme.palette.secondary.main,
                  backgroundColor: lighten(theme.palette.secondary.light, 0.85),
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark,
              },
    title: {
        flex: '1 1 100%',
    },
}));

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        position: 'relative',
        display: 'flex',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        width: '100%',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

function AdminAffiliate({ firebase }) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open, setOpen] = React.useState({
        edit: false,
        delete: false,
        add: false,
    });
    const classesFilter = useToolbarStyles();
    const [inputFilters, setInputFilters] = React.useState({
        select: '',
        text: '',
    });
    let userData = localStorage.getItem('userdata');
    userData = JSON.parse(userData);
    const MySwal = withReactContent(Swal);
    const [input, setInput] = React.useState({
        dni: '',
        lastname: '',
        name: '',
        age: '',
        plan: '',
        planId: '',
        gender: '',
        contact: '',
        email: '',
        titular: '',
        familyBond: '',
        familyGroup: '',
        state: '',
    });

    const [inputAdd, setInputAdd] = React.useState({
        dni: '',
        lastname: '',
        name: '',
        titular: '',
        familyBond: '',
        familyGroup: '',
        contact: '',
        email: '',
        birthdate: '',
        gender: '',
        state: '',
        plan: '',
    });

    const allAffiliates = useSelector(
        (state) => state.affiliates.allAffiliates
    );
    const allPlans = useSelector((state) => state.plans.allPlans);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlans());
    }, []);

    useEffect(() => {
        dispatch(getAffiliates());
    }, [open, setOpen]);

    let rows = allAffiliates.map((el) => {
        return {
            dni: String(el.dni),
            lastname: el.lastname,
            name: el.name,
            age: String(calculateAge(el.birthdate)),
            plan: el.plans.name,
            gender: el.gender,
            contact: el.phone_number,
            email: el.email,
            titular: String(el.titular),
            familyBond: el.family_bond,
            familyGroup: String(el.family_group),
            state: el.state,
        };
    });

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClose = (name) => {
        setOpen({ ...open, [name]: false });
    };

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleEdit = (row) => {
        setInput({
            dni: row.dni,
            lastname: row.lastname,
            name: row.name,
            age: row.age,
            plan: row.plan,
            gender: row.gender,
            contact: row.contact,
            email: row.email,
            titular: row.titular,
            familyBond: row.familyBond,
            familyGroup: row.familyGroup,
            state: row.state,
        });
        setOpen({ ...open, edit: true });
    };

    const handleUpdate = async () => {
        try {
            // Busco en la db el id del plan actualizado.
            let { data: idPlan, error: errorFetchIdPlan } = await supabase
                .from('plans')
                .select('id')
                .eq('name', input.plan);
            if (errorFetchIdPlan) return console.log(errorFetchIdPlan);
            idPlan = idPlan.pop().id;
            console.log('Plan id: ', idPlan);
            // Update de los datos del socio.
            let { error: errorUpdateAff } = await supabase
                .from('partners')
                .update({
                    name: input.name,
                    lastname: input.lastname,
                    phone_number: input.contact,
                    titular: Boolean(input.titular),
                    state: input.state,
                    email: input.email,
                    plan_id: idPlan,
                    gender: input.gender,
                })
                .eq('dni', input.dni);
            if (errorUpdateAff) return console.log(errorUpdateAff);
            MySwal.fire({
                title: 'Actualizar usuario',
                text: 'Usuario actualizado con exito!',
                icon: 'success',
            });
            setOpen(false);
        } catch (error) {
            MySwal.fire({
                title: 'Actualizar usuario',
                text: 'El usuario no fue actualizado! Contacte al administrador.',
                icon: 'error',
            });
            console.log(error);
        }
    };

    const openDialogDelete = (row) => {
        setInput({
            dni: row.dni,
            lastname: row.lastname,
            name: row.name,
            age: row.age,
            plan: row.plan,
            gender: row.gender,
            contact: row.contact,
            email: row.email,
            titular: row.titular,
            familyBond: row.familyBond,
            familyGroup: row.familyGroup,
            state: row.state,
        });
        setOpen({ ...open, delete: true });
    };

    const handleDelete = async () => {
        try {
            const { error: errorDeleteUser } = await supabase
                .from('partners')
                .delete()
                .eq('dni', input.dni);
            if (errorDeleteUser) {
                MySwal.fire({
                    title: 'El usuario no ha sido eliminado! Problema con base de datos.',
                    text: `Mensaje de error: ${errorDeleteUser}`,
                    icon: 'error',
                });
                return console.log(errorDeleteUser);
            }
            MySwal.fire({
                title: 'El usuario ha sido eliminado con exito!',
                text: `Socio con DNI: ${input.dni} y apellido/nombre : ${input.lastname}, ${input.name} ha sido borrado con exito.`,
                icon: 'success',
                timer: 2000,
            }).then(() => window.location.reload());
        } catch (error) {
            MySwal.fire({
                title: 'El usuario no ha sido eliminado!',
                text: `Socio con DNI: ${input.dni} y apellido/nombre : ${input.lastname}, ${input.name} no pudo ser eliminado.`,
                icon: 'error',
            });
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({ ...input, [name]: value });
    };

    const handleChangeAdd = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputAdd({ ...inputAdd, [name]: value });
    };

    const handleOpenDialogAdd = () => {
        setOpen({ ...open, add: true });
        setInputAdd({
            dni: '',
            lastname: '',
            name: '',
            titular: '',
            familyBond: '',
            familyGroup: '',
            contact: '',
            email: '',
            birthdate: '',
            gender: '',
            state: '',
            plan: '',
        });
    };

    const handleAdd = async () => {
        const { error: errorAddAffiliate } = await supabase
            .from('partners')
            .insert([
                {
                    dni: inputAdd.dni,
                    name: inputAdd.name,
                    lastname: inputAdd.lastname,
                    birthdate: inputAdd.birthdate,
                    phone_number: inputAdd.contact,
                    titular: inputAdd.titular,
                    family_bond: inputAdd.familyBond,
                    family_group: inputAdd.familyGroup,
                    state: inputAdd.state,
                    email: inputAdd.email,
                    gender: inputAdd.gender,
                    plan_id: inputAdd.plan,
                },
            ]);
        if (errorAddAffiliate) {
            MySwal.fire({
                title: 'El usuario no pudo ser agregado!',
                text: `${errorAddAffiliate.message}.`,
                icon: 'error',
            });
            return console.log(errorAddAffiliate);
        }
        MySwal.fire({
            title: 'El usuario ha sido agregado!',
            text: `Socio con DNI ${inputAdd.dni} y nombre/s apellido/s ${inputAdd.name} ${inputAdd.lastname} se agrego con exito.`,
            icon: 'success',
        });
        handleClose('add');
    };

    if (rows.length === 0) return <CircularProgress />;

    //Toolbar Row
    const rowsOriginal = rows.map((el) => el);

    const handleChangeFilters = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        setInputFilters({ ...inputFilters, [name]: value });
    };

    if (inputFilters.text !== '' && inputFilters.select !== '') {
        rows = rows.filter((el) =>
            el[inputFilters.select].includes(inputFilters.text)
        );
    } else {
        rows = rowsOriginal.map((el) => el);
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Toolbar>
                    <Typography
                        className={classesFilter.title}
                        variant='h6'
                        id='tableTitle'
                        component='div'
                    >
                        Lista de socios
                    </Typography>
                    <Fab
                        onClick={handleOpenDialogAdd}
                        color='primary'
                        aria-label='add'
                    >
                        <AddIcon />
                    </Fab>
                    <InputLabel id='filter-select'>Filtro</InputLabel>
                    <Select
                        labelId='filter-select'
                        name='select'
                        onChange={handleChangeFilters}
                        value={inputFilters.select}
                    >
                        <MenuItem value='dni'>DNI</MenuItem>
                        <MenuItem value='age'>Edad</MenuItem>
                        <MenuItem value='contact'>Telefono</MenuItem>
                        <MenuItem value='email'>Email</MenuItem>
                        <MenuItem value='familyBond'>Parentesco</MenuItem>
                        <MenuItem value='familyGroup'>Grupo Familiar</MenuItem>
                        <MenuItem value='gender'>Genero</MenuItem>
                        <MenuItem value='name'>Nombre/s</MenuItem>
                        <MenuItem value='lastname'>Apellido/s</MenuItem>
                        <MenuItem value='plan'>Plan</MenuItem>
                        <MenuItem value='state'>Estado</MenuItem>
                        <MenuItem value='titular'>Titularidad</MenuItem>
                    </Select>
                    <TextField
                        label='Filtro'
                        type='text'
                        name='text'
                        value={inputFilters.text}
                        onChange={handleChangeFilters}
                    />
                </Toolbar>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby='tableTitle'
                        aria-label='enhanced table'
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.dni}
                                        >
                                            <TableCell padding='checkbox'>
                                                <div className={styles.toolbar}>
                                                    <Tooltip
                                                        title='Editar'
                                                        onClick={() =>
                                                            handleEdit(row)
                                                        }
                                                    >
                                                        <IconButton aria-label='edit'>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip
                                                        title='Eliminar'
                                                        onClick={() =>
                                                            openDialogDelete(
                                                                row
                                                            )
                                                        }
                                                    >
                                                        <IconButton aria-label='delete'>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                value={row.dni}
                                                component='th'
                                                id={labelId}
                                                scope='row'
                                                padding='none'
                                                align='center'
                                            >
                                                {row.dni}
                                            </TableCell>
                                            <TableCell
                                                value={row.lastname}
                                                align='center'
                                            >
                                                {row.lastname}
                                            </TableCell>
                                            <TableCell
                                                value={row.name}
                                                align='center'
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell
                                                value={row.age}
                                                align='center'
                                            >
                                                {row.age}
                                            </TableCell>
                                            <TableCell
                                                value={row.plan}
                                                align='center'
                                            >
                                                {row.plan}
                                            </TableCell>
                                            <TableCell
                                                value={row.gender}
                                                align='center'
                                            >
                                                {row.gender}
                                            </TableCell>
                                            <TableCell
                                                value={row.contact}
                                                align='center'
                                            >
                                                {row.contact}
                                            </TableCell>
                                            <TableCell
                                                value={row.email}
                                                align='left'
                                            >
                                                {row.email}
                                            </TableCell>
                                            <TableCell
                                                value={row.titular}
                                                align='center'
                                            >
                                                {row.titular}
                                            </TableCell>
                                            <TableCell
                                                value={row.familyBond}
                                                align='center'
                                            >
                                                {row.familyBond}
                                            </TableCell>
                                            <TableCell
                                                value={row.familyGroup}
                                                align='center'
                                            >
                                                {row.familyGroup}
                                            </TableCell>
                                            <TableCell
                                                value={row.state}
                                                align='center'
                                            >
                                                {row.state}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <div>
                <Dialog
                    open={open.edit}
                    onClose={() => handleClose('edit')}
                    aria-labelledby='form-dialog-title'
                >
                    <DialogTitle id='form-dialog-title'>
                        Editar socio
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin='dense'
                            label='DNI'
                            type='number'
                            value={input.dni}
                            disabled
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin='dense'
                            label='Apellido/s'
                            type='text'
                            name='lastname'
                            value={input.lastname}
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin='dense'
                            label='Nombre/s'
                            type='text'
                            name='name'
                            value={input.name}
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin='dense'
                            label='Email'
                            type='email'
                            value={input.email}
                            name='email'
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin='dense'
                            label='Telefono'
                            type='text'
                            value={input.contact}
                            name='contact'
                            fullWidth
                            onChange={handleChange}
                        />
                        <InputLabel>Genero</InputLabel>

                        <Select
                            autoFocus
                            margin='dense'
                            label='Genero'
                            type='text'
                            value={input.gender}
                            name='gender'
                            fullWidth
                            onChange={handleChange}
                        >
                            <MenuItem value='hombre'>Hombre</MenuItem>
                            <MenuItem value='mujer'>Mujer</MenuItem>
                            <MenuItem value='otro'>Otro</MenuItem>
                        </Select>
                        <InputLabel>Es titular?</InputLabel>
                        <Select
                            autoFocus
                            margin='dense'
                            label='Titular'
                            type='text'
                            name='titular'
                            value={input.titular}
                            fullWidth
                            onChange={handleChange}
                        >
                            <MenuItem value='true'>True</MenuItem>
                            <MenuItem value='false'>False</MenuItem>
                        </Select>
                        <InputLabel>Plan</InputLabel>
                        <Select
                            autoFocus
                            margin='dense'
                            label='Plan'
                            name='plan'
                            type='text'
                            value={input.plan}
                            fullWidth
                            onChange={handleChange}
                        >
                            {allPlans.map((plan) => (
                                <MenuItem
                                    key={`plan-${plan.id}`}
                                    value={plan.name}
                                    id={plan.id}
                                >
                                    {plan.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <InputLabel>Estado</InputLabel>
                        <Select
                            autoFocus
                            margin='dense'
                            label='Estado'
                            value={input.state}
                            type='text'
                            name='state'
                            fullWidth
                            onChange={handleChange}
                        >
                            {statesAff.map((state, index) => (
                                <MenuItem key={`state-${index}`} value={state}>
                                    {state}
                                </MenuItem>
                            ))}
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => handleClose('edit')}
                            color='primary'
                        >
                            Cancelar
                        </Button>
                        <Button onClick={handleUpdate} color='primary'>
                            Actualizar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog
                    open={open.delete}
                    onClose={() => handleClose('delete')}
                    aria-labelledby='form-dialog-title'
                >
                    <DialogTitle id='form-dialog-title'>
                        Eliminar socio
                    </DialogTitle>
                    <DialogContent>
                        <List>
                            <ListItemText
                                primary={`DNI: ${input.dni}`}
                                fullWidth
                            />
                            <ListItemText
                                primary={`Apellido: ${input.lastname}`}
                                fullWidth
                            />
                            <ListItemText
                                primary={`Nombre: ${input.name}`}
                                fullWidth
                            />
                            <ListItemText
                                primary={`Email: ${input.email}`}
                                fullWidth
                            />
                            <ListItemText
                                primary={`Telefono: ${input.contact}`}
                                fullWidth
                            />
                            <ListItemText
                                primary={`Genero: ${input.gender}`}
                                fullWidth
                            />
                            <ListItemText
                                primary={`Titular?: ${input.titular}`}
                                fullWidth
                            />
                            <ListItemText
                                primary={`Plan: ${input.plan}`}
                                fullWidth
                            />
                            <ListItemText
                                primary={`Estado: ${input.state}`}
                                fullWidth
                            />
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => handleClose('delete')}
                            color='primary'
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => {
                                MySwal.fire({
                                    title: 'Esta seguro de borrar este socio? (ESTA ACCION NO ES REVERSIBLE)',
                                    icon: 'question',
                                    showCloseButton: true,
                                    showCancelButton: true,
                                }).then((res) => {
                                    if (res.isConfirmed) handleDelete();
                                });
                                handleClose('delete');
                            }}
                            color='primary'
                        >
                            Borrar
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={open.add} onClose={() => handleClose('add')}>
                    <DialogTitle>Agregar Socio</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin='dense'
                            name='dni'
                            label='DNI'
                            type='number'
                            value={inputAdd.dni}
                            onChange={handleChangeAdd}
                            helperText='Dni de 8 digitos'
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin='dense'
                            name='lastname'
                            label='Apellido/s'
                            value={inputAdd.lastname}
                            type='text'
                            onChange={handleChangeAdd}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin='dense'
                            value={inputAdd.name}
                            name='name'
                            label='Nombre/s'
                            type='text'
                            onChange={handleChangeAdd}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            value={inputAdd.titular}
                            margin='dense'
                            name='titular'
                            label='Titular'
                            type='text'
                            onChange={handleChangeAdd}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            value={inputAdd.familyBond}
                            margin='dense'
                            name='familyBond'
                            label='Parentesco'
                            type='text'
                            onChange={handleChangeAdd}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            value={inputAdd.familyGroup}
                            margin='dense'
                            name='familyGroup'
                            label='Grupo Familiar'
                            type='number'
                            onChange={handleChangeAdd}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin='dense'
                            value={inputAdd.contact}
                            name='contact'
                            label='Numero de telefono'
                            type='text'
                            onChange={handleChangeAdd}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            value={inputAdd.email}
                            margin='dense'
                            name='email'
                            label='Email'
                            type='email'
                            onChange={handleChangeAdd}
                            fullWidth
                        />
                        <TextField
                            name='birthdate'
                            label='Fecha de nacimiento'
                            type='date'
                            value={inputAdd.birthdate}
                            defaultValue={Date.now()}
                            onChange={handleChangeAdd}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            name='gender'
                            label='Genero'
                            type='text'
                            value={inputAdd.gender}
                            onChange={handleChangeAdd}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <InputLabel htmlFor='state'>Estado</InputLabel>
                        <Select
                            value={inputAdd.state}
                            name='state'
                            onChange={handleChangeAdd}
                        >
                            {statesAff.map((el, index) => (
                                <MenuItem key={`state-${index}`} value={el}>
                                    {el}
                                </MenuItem>
                            ))}
                        </Select>
                        <InputLabel htmlFor='plan'>Plan</InputLabel>
                        <Select
                            value={inputAdd.plan}
                            name='plan'
                            onChange={handleChangeAdd}
                        >
                            {allPlans.map((el, index) => (
                                <MenuItem key={`plan-${index}`} value={el.id}>
                                    {el.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => handleClose('add')}
                            color='primary'
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleAdd}
                            type='submit'
                            color='primary'
                        >
                            Agregar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default AdminAffiliate;
