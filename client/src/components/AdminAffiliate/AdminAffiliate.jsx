import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
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

import { getAffiliates } from '../../actions/getter.action.js';
import calculateAge from '../../functions/calculateAge.js';
import styles from './AdminAffiliate.module.css';

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

const EnhancedTableToolbar = () => {
    const classes = useToolbarStyles();

    return (
        <Toolbar>
            <Typography
                className={classes.title}
                variant='h6'
                id='tableTitle'
                component='div'
            >
                Lista de socios
            </Typography>
        </Toolbar>
    );
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

function EnhancedTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const allAffiliates = useSelector((state) => state.allAffiliates);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAffiliates());
    }, []);

    const rows = allAffiliates.map((el) => {
        return {
            dni: el.dni,
            lastname: el.lastname,
            name: el.name,
            age: calculateAge(el.birthdate),
            plan: el.plans.name,
            gender: el.gender,
            contact: el.phone_number,
            email: el.email,
            titular: String(el.titular),
            familyBond: el.family_bond,
            familyGroup: el.family_group,
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

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleEdit = () => {
        alert('editar');
    };

    const handleDelete = () => {
        alert('borrar');
    };

    if (rows.length === 0) return <h2>Cargando...</h2>;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar />
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
                                                        onClick={handleEdit}
                                                    >
                                                        <IconButton aria-label='edit'>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip
                                                        title='Eliminar'
                                                        onClick={handleDelete}
                                                    >
                                                        <IconButton aria-label='delete'>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                component='th'
                                                id={labelId}
                                                scope='row'
                                                padding='none'
                                                align='center'
                                            >
                                                {row.dni}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {row.lastname}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {row.name}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {row.age}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {row.plan}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {row.gender}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {row.contact}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {row.email}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {row.titular}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {row.familyBond}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {row.familyGroup}
                                            </TableCell>
                                            <TableCell align='center'>
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
        </div>
    );
}

export default EnhancedTable;
