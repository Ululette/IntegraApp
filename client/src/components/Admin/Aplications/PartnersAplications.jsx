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
import SaveIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import CircularProgress from '@material-ui/core/CircularProgress';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import 'firebase/auth';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    FormControl,
    Select,
    Input,
    DialogActions,
} from '@material-ui/core';
import { Button } from '@material-ui/core';
import calculateAge from '../../../functions/calculateAge';
import supabase from '../../../supabase.config';
import getSome from '../../../actions/elgetter'


const status = ['aceptada, rechazada', 'pendiente']


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
    { id: 'familiar_name', numeric: false, disablePadding: true, label: 'Nombre' },
    {
        id: 'familiar_lastname',
        numeric: false,
        disablePadding: false,
        label: 'Apellido',
    },
    { id: 'familiar_dni', numeric: true, disablePadding: false, label: 'DNI' },
    { id: 'titular_dni', numeric: false, disablePadding: false, label: 'DNI del titular' },
    {
        id: 'reason',
        numeric: false,
        disablePadding: false,
        label: 'Motivo',
    },
    {
        id: 'familiar_birthdate',
        numeric: true,
        disablePadding: false,
        label: 'Edad',
    },
    { id: 'status', numeric: false, disablePadding: false, label: 'Estado' },
];

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell, index) => (
                    <TableCell
                        key={`${headCell.id}-${index}`}
                        align='left'
                        padding='default'
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
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
    dialog: {
        zIndex: '-6',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, setToShowRows, toShowRows, rows } = props;
    const [open, setOpen] = React.useState(false);
    const [selectedState, setSelectedState] = React.useState('');

    const handleChange = (event) => {
        setSelectedState(event.target.value)
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
        filter(e.target[0].value);
    };

    const filter = (value) => {
        setToShowRows(rows);
        value ?
            setToShowRows(
                toShowRows.filter((r) => {
                    return r.status
                        .toLowerCase()
                        .includes(value.toLowerCase());
                })
            )
            : setToShowRows(rows);
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
                Doctors
            </Typography>
            <Tooltip title='Todo' onClick={handleClose}>
                <IconButton aria-label='reset'>
                    <ClearAllIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title='Filtrar' onClick={handleClickOpen}>
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
                <DialogTitle>Filtrar por...</DialogTitle>
                <form className={classes.container} onSubmit={handleSubmit}>
                    <DialogContent>
                        <FormControl className={classes.formControl}>
                            <FormControl className={classes.formControl}>
                                <Select
                                    native
                                    value={selectedState}
                                    onChange={handleChange}
                                    input={
                                        <Input id='demo-dialog-native' />
                                    }
                                    name='status'
                                    label='value'
                                >
                                    <option aria-label='None' value='' />
                                    <option value='aceptada'>Aceptada</option>
                                    <option value='rechazada'>Rechazada</option>
                                    <option value='pendiente'>Pendiente</option>
                                </Select>
                            </FormControl>
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
        clip: 'rect(0 0 0 0)',
        overflow: 'hidden',
        padding: 0,
    },
}));

export default function MedicsTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(1);
    const [listMedics, setListMedics] = React.useState([]);
    const [toShowRows, setToShowRows] = React.useState([]);
    const rows = listMedics;
    const MySwal = withReactContent(Swal);
    const [status, setStatus ] = React.useState(Array(rows.length))


    const fetchMedics = () => {
        getSome('familiar_downs_request')
            .then(r => { setListMedics(r); setToShowRows(r) }, err => console.error(err.message))
    }


    React.useEffect(() => {
        fetchMedics();
    }, []);


    const handleSave = async (request, index) => {
        MySwal.fire({
            title: `Desea guardar el nuevo estado de la solucitud de baja de ${request.familiar_name} de la obra social?`,
            showCloseButton: true,
            showCancelButton: true,
            icon: 'question',
        }).then(async (res) => {
            if (res.isConfirmed) {
                try {
                    await supabase
                        .from('familiar_downs_request')
                        .update({ status : status[index] })
                        .eq('familiar_dni', request.familiar_dni);
                    MySwal.fire({
                        title: 'La solicitud ha sido actualizada!',
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
        event.preventDefault()
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
        event.preventDefault()
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
                                            role='checkbox'
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell align='center'>
                                                <SaveIcon
                                                    onClick={() =>
                                                        handleSave(row, index)
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell
                                                component='th'
                                                id={labelId}
                                                scope='row'
                                                padding='default'
                                            >
                                                {row.familiar_name}
                                            </TableCell>
                                            <TableCell align='right'>
                                                {row.familiar_lastname}
                                            </TableCell>
                                            <TableCell align='right'>
                                                {row.familiar_dni}
                                            </TableCell>
                                            <TableCell align='right'>
                                                {row.titular_dni}
                                            </TableCell>
                                            <TableCell align='right'>
                                                {row.reason}
                                            </TableCell>
                                            <TableCell align='right'>
                                                {calculateAge(row.familiar_birthdate)}
                                            </TableCell>
                                            <TableCell align='center'>
                                                <Select
                                                    native
                                                    value={status[index] ? status[index] : row.status}
                                                    onChange={(e)=> setStatus([...status, status[index]=e.target.value])}
                                                    input={
                                                        <Input id='demo-dialog-native' />
                                                    }
                                                    name='status'
                                                    label='value'
                                                >
                                                    <option aria-label='None' value='' />
                                                    <option value='aceptada'>Aceptada</option>
                                                    <option value='rechazada'>Rechazada</option>
                                                    <option value='pendiente'>Pendiente</option>
                                                </Select>
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
                    rowsPerPageOptions={[1, 5, 10]}
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
