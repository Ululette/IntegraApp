import React from 'react';
import { useDispatch } from 'react-redux';
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
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import BlockIcon from '@material-ui/icons/Block';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import FilterListIcon from '@material-ui/icons/FilterList';
import blue from '@material-ui/core/colors/blue';
import Swal from 'sweetalert2';
import supabase from '../../../supabase.config.js';
import { getAllUsers } from '../../../actions/users.action.js';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    FormControl,
    Select,
    DialogActions,
    TextField,
} from '@material-ui/core';

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
    if (array.length > 1) {
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
    }

    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'dni', numeric: false, disablePadding: true, label: 'DNI' },
    { id: 'email', numeric: false, disablePadding: false, label: 'EMAIL' },
    { id: 'role', numeric: false, disablePadding: false, label: 'TIPO' },
    { id: 'account', numeric: false, disablePadding: false, label: 'CUENTA' },
];

function EnhancedTableHead(props) {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead className={classes.title}>
            <TableRow>
                <TableCell padding='checkbox'>
                    <Checkbox
                        defaultChecked
                        color='primary'
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell, index) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={'default'}
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
//------------------------EnhancedTableToolbar Style ---------------------------------------------------------------------------------------
const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        backgroundColor: lighten('#34a7a1', 0.3),
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
            backgroundColor: blue[500],
        },
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
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, handleBlock, list, sendFilter } = props;
    const [open, setOpen] = React.useState(false);
    const [input, setInput] = React.useState('');
    const [optionSelected, setOptionSelected] = React.useState(''); //que opcion elige de filtrado
    const [selectedAccount, setSelectedAccount] = React.useState('');
    const [selectedRole, setSelectedRole] = React.useState('');
    const [listFilter, setListFilter] = React.useState([]);

    const handleClickOpen = () => {
        sendFilter('reset');
        setOpen(true);
        setListFilter(list);
    };
    const hanldeReset = () => {
        sendFilter('reset');
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeType = (e) => {
        switch (e.target.value) {
            case 'dni':
                setOptionSelected('dni');
                setInput('');
                break;
            case 'email':
                setOptionSelected('email');
                setInput('');
                break;
            case 'role':
                setOptionSelected('role');
                setSelectedRole('');
                break;
            case 'account':
                setOptionSelected('account');
                setSelectedAccount('');
                break;
            default:
                setOptionSelected('');
        }
    };

    const handleChangeRole = (e) => {
        setSelectedRole(e.target.value);
    };

    const handleChangeAccount = (e) => {
        setSelectedAccount(e.target.value);
    };

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (optionSelected === 'dni' || optionSelected === 'email')
            filter(optionSelected, input);
        else if (optionSelected === 'role')
            filter(optionSelected, selectedRole);
        else filter(optionSelected, selectedAccount);
    };

    const filter = (option, value) => {
        if (!value) {
            alert('Debe completar el campo de texto.');
        } else {
            let res = [];
            let wanted;
            switch (option) {
                case 'dni':
                    //eslint-disable-next-line
                    wanted = listFilter.find((user) => user.dni == value);
                    if (wanted) {
                        res.push(wanted);
                        sendFilter(res);
                        setInput('');
                        setOpen(false);
                        setOptionSelected('');
                    } else alert(`no existe`);
                    break;
                case 'email':
                    //eslint-disable-next-line
                    wanted = listFilter.find((user) => user.email == value);
                    if (wanted) {
                        res.push(wanted);
                        sendFilter(res);
                        setInput('');
                        setOpen(false);
                        setOptionSelected('');
                    } else alert(`no existe`);
                    break;
                case 'role':
                    console.log(listFilter);
                    //eslint-disable-next-line
                    res = listFilter.filter((user) => user.role == value);

                    if (res.length > 0) sendFilter(res);
                    else {
                        sendFilter('reset');
                        alert(`no se encontraron resultados`);
                    }
                    setSelectedRole('');
                    setOptionSelected('');
                    setOpen(false);
                    break;
                default:
                    //eslint-disable-next-line
                    res = listFilter.filter((user) => user.account == value);
                    res.length > 0
                        ? sendFilter(res)
                        : alert(`no se encontraron resultados`);
                    setSelectedRole('');
                    setOptionSelected('');
                    setOpen(false);
                    break;
            }
        }
    };

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography
                    className={classes.title}
                    color='inherit'
                    variant='subtitle1'
                    component='div'
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    className={classes.title}
                    variant='h6'
                    id='tableTitle'
                    component='div'
                >
                    USUARIOS
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip
                    title='Activar/Desactivar Usuarios'
                    onClick={handleBlock}
                >
                    <IconButton aria-label='Edit' className={classes.iconBlock}>
                        <BlockIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <div>
                    <div className={classes.filters}>
                        <Tooltip title='Filtro' onClick={handleClickOpen}>
                            <IconButton
                                aria-label='filter list'
                                className={classes.iconFilter}
                            >
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Borrar Filtro' onClick={hanldeReset}>
                            <IconButton
                                aria-label='reset'
                                className={classes.iconFilter}
                            >
                                <ClearAllIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <Dialog
                        disableBackdropClick
                        disableEscapeKeyDown
                        open={open}
                        onClose={handleClose}
                    >
                        <DialogTitle className={classes.popup}>
                            FILTRADO POR:
                        </DialogTitle>
                        <form onSubmit={handleSubmit}>
                            <DialogContent>
                                <FormControl>
                                    <Select
                                        inputProps={{
                                            style: { width: '177px' },
                                            id: 'outlined-age-native-simple',
                                            name: 'Filter',
                                        }}
                                        variant='outlined'
                                        native
                                        value={optionSelected}
                                        onChange={(e) => handleChangeType(e)}
                                    >
                                        <option aria-label='None' value='' />
                                        <option value='dni'>DNI</option>
                                        <option value='email'>Email</option>
                                        <option value='role'>Role</option>
                                        <option value='account'>Account</option>
                                    </Select>
                                </FormControl>

                                {optionSelected === 'dni' ||
                                optionSelected === 'email' ? (
                                    <TextField
                                        id='outlined-basic'
                                        label={optionSelected.toUpperCase()}
                                        variant='outlined'
                                        value={input}
                                        onChange={(e) => handleInput(e)}
                                    />
                                ) : optionSelected === 'role' ? (
                                    <FormControl>
                                        <Select
                                            inputProps={{
                                                style: { width: '177px' },
                                            }}
                                            native
                                            value={selectedRole}
                                            onChange={(e) =>
                                                handleChangeRole(e)
                                            }
                                            variant='outlined'
                                            size='small'
                                        >
                                            <option
                                                aria-label='None'
                                                value=''
                                            />
                                            <option value='admin'>Admin</option>
                                            <option value='affiliate'>
                                                Afilliate
                                            </option>
                                            <option value='medic'>Medic</option>
                                        </Select>
                                    </FormControl>
                                ) : optionSelected === 'account' ? (
                                    <FormControl>
                                        <Select
                                            inputProps={{
                                                style: { width: '177px' },
                                            }}
                                            native
                                            value={selectedAccount}
                                            onChange={(e) =>
                                                handleChangeAccount(e)
                                            }
                                            variant='outlined'
                                            size='small'
                                        >
                                            <option
                                                aria-label='None'
                                                value=''
                                            />
                                            <option value='active'>
                                                Active
                                            </option>
                                            <option value='inactive'>
                                                Inactive
                                            </option>
                                        </Select>
                                    </FormControl>
                                ) : optionSelected === '' ? null : null}
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={handleClose}
                                    className={classes.popupBtn}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type='submit'
                                    className={classes.popupBtn}
                                >
                                    Filtrar
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>
                </div>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

//-------------------- Style Table Users
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
}));

export default function TableUsers({ rows, handleFilter, allUsers }) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('account');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const dispatch = useDispatch();

    const sendFilter = (filterRows) => {
        handleFilter(filterRows);
    };
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.dni);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, dni) => {
        const selectedIndex = selected.indexOf(Number(dni));
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, dni);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleBlock = async () => {
        await Swal.fire({
            title: 'Select field validation',
            input: 'select',
            inputOptions: {
                Active: 'Active',
                Inactive: 'Inactive',
            },
            inputPlaceholder: 'Select an action',
            showCancelButton: true,
            inputValidator: async (res) => {
                console.log('res', res);
                if (res) {
                    for (let i = 0; i < selected.length; i++) {
                        //actualizo base
                        await supabase
                            .from('users')
                            .update({ account: res.toLocaleLowerCase() })
                            .eq('dni', selected[i]);
                        //actualizo desde firebase
                    }
                    //actualizar la pagina y desactivar los check
                    dispatch(getAllUsers());
                    Swal.fire({
                        title: `Success!`,
                        text: `La accion ${res.toUpperCase()} se completo de forma exitosa.`,
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                } else {
                    console.log('res no existe');
                }
            },
        });
    };

    // const { value: filter } = await Swal.fire({
    //   title: 'Select field validation',
    //   input: 'select',
    //   backdrop:true,
    //   inputOptions: {
    //       Active: 'Active',
    //       Inactive: 'Inactive',
    //       Dni:'Dni',
    //       Email:'Email',
    //       Role:'Role'
    //   },
    //   inputPlaceholder: 'Select an action',
    //   showCancelButton: true,
    //   inputValidator: (filter) => {
    //     return new Promise((resolve) => {
    //       resolve(filter);
    //     })
    //     .then((value) =>{
    //       if (value=== 'Dni' || value === 'Email' || value === 'Role') {
    //         console.log('agregar text', value)

    //       } else {
    //         //filtrar
    //         console.log('hacer filtro')
    //       }
    //     })
    // }
    // })
    // if (filter=== 'Dni' || filter === 'Email' || filter === 'Role') {
    //   resolve()
    // } else {
    //   console.log('filtrar por tipo')
    // }

    // console.log('filter',filter)
    // debugger;
    //   if(filter=== 'Dni' || filter === 'Email' || filter === 'Role'){
    //     const { value: type } = await Swal.fire({
    //       input: `${type}`,
    //       inputLabel: `Selected ${type}`,
    //       inputPlaceholder: `Enter the ${type}`
    //     })

    //       Swal.fire(`anda el if`)
    //   }else{
    //     Swal.fire(`anda el else`)
    //   }

    const isSelected = (dni) => selected.indexOf(dni) !== -1;

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    handleBlock={handleBlock}
                    list={allUsers}
                    sendFilter={sendFilter}
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
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.dni);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) =>
                                                handleClick(event, row.dni)
                                            }
                                            role='checkbox'
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.dni}
                                            selected={isItemSelected}
                                        >
                                            <TableCell
                                                padding='checkbox'
                                                className={
                                                    index % 2 === 1
                                                        ? classes.rowColor
                                                        : null
                                                }
                                            >
                                                <Checkbox
                                                    defaultChecked
                                                    color='primary'
                                                    className={classes.rowColor}
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby':
                                                            labelId,
                                                    }}
                                                />
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
                                                {row.role}
                                            </TableCell>
                                            <TableCell
                                                align='left'
                                                className={
                                                    index % 2 === 1
                                                        ? classes.rowColor
                                                        : null
                                                }
                                            >
                                                {row.account}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 33 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    className={classes.root}
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
