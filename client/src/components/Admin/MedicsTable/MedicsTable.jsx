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
import blue from '@material-ui/core/colors/blue';
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
        id: 'medic_license',
        numeric: false,
        disablePadding: false,
        label: 'MATRICULA',
    },
    { id: 'dni', numeric: true, disablePadding: false, label: 'DNI' },
    { id: 'email', numeric: false, disablePadding: false, label: 'E-MAIL' },
    {
        id: 'phone_number',
        numeric: false,
        disablePadding: false,
        label: 'TELEFONO',
    },
    {
        id: 'birthdate',
        numeric: true,
        disablePadding: false,
        label: 'EDAD',
    },

    {
        id: 'specialties',
        numeric: false,
        disablePadding: false,
        label: 'ESPECIALIDAD',
    },
    { id: 'state', numeric: false, disablePadding: false, label: 'ESTADO' },
];

const MySwal = withReactContent(Swal);

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
        backgroundColor: lighten('#34a7a1', 0.3),
        padding: '0px 0px 0px 0px',
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                  color: '#fafafa',
                  backgroundColor: lighten(blue[500], 0.5), //color barra superior cuando selecciono item
                  fontWeight: 'bold',
                  fontSize: '30px',
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: lighten('#34a7a1', 0.3),
              },
    title: {
        flex: '1 1 100%',
        fontWeight: 'bold',
        fontSize: '1.4rem',
        color: '#fafafa',
        textAlign: 'center',
    },
    filters: {
        display: 'flex',
    },
    iconFilter: {
        color: '#fafafa',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#34a7a1',
        },
    },
    iconBlock: {
        color: '#fafafa',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: lighten('#34a7a1', 0.8),
        },
    },
    p: {
        fontWeight: 'bold',
        fontSize: '1.4rem',
        color: '#fafafa',
        textAlign: 'right',
    },
    popup: {
        color: '#fafafa',
        backgroundColor: '#2c7f7b',
        fontWeight: 'bold',
        fontSize: '30px',
    },
    popupBtn: {
        color: '#fafafa',
        padding: theme.spacing(0.5),
        border: '3px solid #2c7f7b',
        backgroundColor: '#2c7f7b',
        fontWeight: 'bold',
        fontSize: '15px',
        '&:hover': {
            backgroundColor: lighten('#fafafa', 0.2),
            color: '#2c7f7b',
            padding: theme.spacing(0.5),
        },
    },
    formControl: {
        width: '177px',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, setToShowRows, toShowRows, rows, medicSpecialities } =
        props;
    const [open, setOpen] = React.useState(false);
    const [selectedOption, setSelectedOption] = React.useState('');
    const [selectedState, setSelectedState] = React.useState('');

    const handleChange = (event) => {
        event.target.name === 'state'
            ? setSelectedState(event.target.value) &&
              setSelectedOption(event.target.value)
            : setSelectedOption(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
        setToShowRows(rows);
    };

    const handleClose = () => {
        setSelectedOption('');
        setSelectedState('');
        setOpen(false);
        setToShowRows(rows);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        filter(e.target[0].value, e.target[2].value);
    };

    const filter = (value, option) => {
        let result = rows;

        if (option === 'lastname') {
            value
                ? (result = toShowRows.filter((r) => {
                      return r[option]
                          .toLowerCase()
                          .includes(value.toLowerCase());
                  }))
                : (result = rows);
        } else if (option === 'dni') {
            value
                ? (result = toShowRows.filter((r) => {
                      return String(r[option])
                          .toLowerCase()
                          .includes(value.toLowerCase());
                  }))
                : (result = rows);
        } else if (option === 'medical_specialities') {
            value
                ? (result = toShowRows.filter((r) =>
                      r[option].some((e) =>
                          e.name.toLowerCase().includes(value.toLowerCase())
                      )
                  ))
                : (result = rows);
        } else if (option === 'state') {
            value
                ? (result = toShowRows.filter((r) => {
                      return r[option].toLowerCase() === value.toLowerCase();
                  }))
                : (result = rows);
        }

        if (!result.length) {
            setToShowRows(rows);
            MySwal.fire('Sin resultados...', 'No hay coincidencias!', 2000);
        } else {
            setToShowRows(result);
        }

        setOpen(false);
    };

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <AdminMedicAdd medicSpecialities={medicSpecialities} />
            <Typography
                className={classes.title}
                variant='h6'
                id='tableTitle'
                component='div'
            >
                MEDICOS
            </Typography>
            <p className={classes.p}>Filtros</p>
            <Tooltip
                title='Filter list'
                onClick={handleClickOpen}
                className={classes.iconFilter}
            >
                <IconButton aria-label='filter'>
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
            <Tooltip
                title='Clear'
                onClick={handleClose}
                className={classes.iconFilter}
            >
                <IconButton aria-label='reset'>
                    <ClearAllIcon />
                </IconButton>
            </Tooltip>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={open}
                onClose={handleClose}
                className={classes.dialog}
            >
                <DialogTitle className={classes.popup}>
                    FILTRADO POR:
                </DialogTitle>
                <form className={classes.container} onSubmit={handleSubmit}>
                    <DialogContent>
                        <FormControl /* className={classes.formControl} */>
                            {selectedOption === 'state' ? (
                                <FormControl /* className={classes.formControl} */
                                >
                                    <Select
                                        inputProps={{
                                            style: { width: '177px' },
                                            id: 'outlined-age-native-simple',
                                            name: 'state',
                                        }}
                                        variant='outlined'
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
                                        <option value='inhabilitado'>
                                            Inhabilitado
                                        </option>
                                    </Select>
                                </FormControl>
                            ) : (
                                <TextField
                                    id='outlined-basic'
                                    label='ingresar...'
                                    variant='outlined'
                                    disabled={!selectedOption}
                                />
                            )}
                        </FormControl>
                        <FormControl>
                            <Select
                                native
                                value={selectedOption}
                                onChange={handleChange}
                                variant='outlined'
                                input={<Input id='demo-dialog-native' />}
                                inputProps={{
                                    style: { width: '177px' },
                                    id: 'outlined-age-native-simple',
                                    name: 'filter-type',
                                }}
                            >
                                <option aria-label='None' value='' />
                                <option value='dni'>DNI</option>
                                <option value='lastname'>Apellido</option>
                                <option value='medical_specialities'>
                                    Especialidad
                                </option>
                                <option value='state'>Estado</option>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleClose}
                            className={classes.popupBtn}
                        >
                            Cancelar
                        </Button>
                        <Button className={classes.popupBtn} type='submit'>
                            Filtrar
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
        padding: '0px 0px 0px 0px',
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
        width: 1,
    },
    title: {
        color: '#212121',
        fontWeight: 'bold',
        backgroundColor: lighten('#34a7a1', 0.6),
    },
    rowColor: {
        backgroundColor: lighten('#e0e0e0', 0.3),
        ':checked': {
            color: blue[500],
        },
    },
    iconFilter: {
        color: 'rgba(0, 0, 0, 0.47)',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: lighten('#34a7a1', 0.8),
        },
    },
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
        if (errorFetchMedics) return console.log(errorFetchMedics.message);
        medics && setToShowRows(medics);
        setListMedics(medics);
    };
    const rows = listMedics;
    const fetchSpecialities = async () => {
        const { data: specialities, error: errorFetchSpecialities } =
            await supabase.from('medical_specialities').select('name, id');
        if (errorFetchSpecialities)
            return console.log(errorFetchSpecialities.message);
        setMedicSpecialities(specialities);
    };

    React.useEffect(() => {
        fetchMedics();
        fetchSpecialities();
    }, []);

    const handleEdit = (medicData) => {
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
                                            <TableCell
                                                align='left'
                                                className={
                                                    index % 2 === 1
                                                        ? classes.rowColor
                                                        : null
                                                }
                                            >
                                                <Tooltip
                                                    title='Edit'
                                                    className={
                                                        classes.iconFilter
                                                    }
                                                >
                                                    <IconButton
                                                        size='small'
                                                        aria-label='Edit'
                                                    >
                                                        <EditIcon
                                                            onClick={() =>
                                                                handleEdit(row)
                                                            }
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip
                                                    title='Delete'
                                                    className={
                                                        classes.iconFilter
                                                    }
                                                >
                                                    <IconButton
                                                        size='small'
                                                        aria-label='Delete'
                                                    >
                                                        <DeleteIcon
                                                            onClick={() =>
                                                                handleDelete(
                                                                    row
                                                                )
                                                            }
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                className={
                                                    index % 2 === 1
                                                        ? classes.rowColor
                                                        : null
                                                }
                                            >
                                                <Avatar
                                                    alt='Profile Picture'
                                                    src={row.profilePic}
                                                />
                                            </TableCell>
                                            <TableCell
                                                className={
                                                    index % 2 === 1
                                                        ? classes.rowColor
                                                        : null
                                                }
                                                component='th'
                                                id={labelId}
                                                scope='row'
                                                padding='default'
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell
                                                align='left'
                                                className={
                                                    index % 2 === 1
                                                        ? classes.rowColor
                                                        : null
                                                }
                                            >
                                                {row.lastname}
                                            </TableCell>
                                            <TableCell
                                                align='left'
                                                className={
                                                    index % 2 === 1
                                                        ? classes.rowColor
                                                        : null
                                                }
                                            >
                                                {row.medic_license}
                                            </TableCell>
                                            <TableCell
                                                align='left'
                                                className={
                                                    index % 2 === 1
                                                        ? classes.rowColor
                                                        : null
                                                }
                                            >
                                                {row.dni}
                                            </TableCell>
                                            <TableCell
                                                align='left'
                                                className={
                                                    index % 2 === 1
                                                        ? classes.rowColor
                                                        : null
                                                }
                                            >
                                                {row.email}
                                            </TableCell>
                                            <TableCell
                                                align='left'
                                                className={
                                                    index % 2 === 1
                                                        ? classes.rowColor
                                                        : null
                                                }
                                            >
                                                {row.phone_number}
                                            </TableCell>
                                            <TableCell
                                                align='left'
                                                className={
                                                    index % 2 === 1
                                                        ? classes.rowColor
                                                        : null
                                                }
                                            >
                                                {calculateAge(row.birthdate)}
                                            </TableCell>

                                            <TableCell
                                                className={
                                                    index % 2 === 1
                                                        ? classes.rowColor
                                                        : null
                                                }
                                            >
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
                                            <TableCell
                                                align='left'
                                                className={
                                                    index % 2 === 1
                                                        ? classes.rowColor
                                                        : null
                                                }
                                            >
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
            {/* <AdminMedicAdd medicSpecialities={medicSpecialities} /> */}
        </div>
    );
}
