import React, { useState } from 'react';
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
import EditIcon from '@material-ui/icons/Edit';
import blue from '@material-ui/core/colors/blue';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import PopUpEdit from '../Speciality/PopUpEdit';
import supabase from '../../../supabase.config.js';
import InputSpecialities from './InputSpecialities';

//crear tabla  OK
//traer especialidades de base >> redux
//agregar data
//modificar
//eliminar
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
    { id: 'actions', numeric: false, disablePadding: true, label: 'ACCIONES' },
    { id: 'name', numeric: false, disablePadding: true, label: 'ESPECIALIDAD' },
    { id: 'id', numeric: false, disablePadding: true, label: 'ID' }
    
  
];

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead className={classes.title}>
            <TableRow >
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align= 'left'
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
        padding:'4px 4px 4px 4 px',
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
        backgroundColor: lighten('#34a7a1', 0.3)
        //color barra superior '
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: '#fafafa',
                backgroundColor: lighten(blue[500], 0.5),//color barra superior cuando selecciono item
                fontWeight:'bold',
                fontSize:'30px',
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: lighten('#34a7a1', 0.3),
                
            },
    title: {
        flex: '1 1 50%',
        fontWeight:'bold',
        fontSize:'1.4rem',
        color: '#fafafa',
        textAlign:'left',
        marginLeft:'10%'
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
    const { numSelected,addClick2 } = props;

    const addClick = (value)=>{
        addClick2(value);
    }

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <InputSpecialities addClick={addClick}/>
                <Typography
                    className={classes.title}
                    variant='h6'
                    id='tableTitle'
                    component='div'
                >
                    ESPECIALIDADES
                </Typography>
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
        //padding:theme.spacing(1),
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
        //padding:'6px 24px 6px 16px;',
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
export default function EnhancedTable({ rows,handlerButtonClick }) {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('specialities');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [nameSpeciality, setNameSpeciality] = useState('');
    const MySwal = withReactContent(Swal);


    const addClick2 = (value)=>{
        handlerButtonClick(value);
    }
    //---HANDLERS-----
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

    const handleDelete = async (id, name) => {
        MySwal.fire({
            title: `Esta seguro que desea eliminar ${name.toUpperCase()}?`,
            showCloseButton: true,
            showCancelButton: true,
            icon: 'question',
        }).then(async (res) => {
            if (res.isConfirmed) {
                ///const deleteMedicsSpeciality = (id)=>{
                //primero se elimina de tabla intermedia
                const { errorRelation } = await supabase
                    .from('medics_medical_specialities')
                    .delete()
                    .match({ speciality_id: id });
                //}
                ///const deleteSpeciality = async(id)=>{
                const { errorSpeciality } = await supabase
                    .from('medical_specialities')
                    .delete()
                    .match({ id: id });

                if (!errorRelation && !errorSpeciality)
                    MySwal.fire({
                        title: `La espcialidad ${name.toUpperCase()} se ha eliminado con exito.`,
                        icon: 'success',
                        timer: 2000,
                    })
            }
            // deleteMedicsSpeciality(id);
            // deleteSpeciality (id);
        });
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleEdit = (e, name) => {
        e.preventDefault();
        const updateSpeciality = async () => {
            await supabase
                .from('medical_specialities')
                .update({ name: e.target[0].value })
                .match({ name: nameSpeciality });
        };
        updateSpeciality(name);
        handleClose();
    };
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar addClick2={addClick2}/>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby='tableTitle'
                        size='small'
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
                                            role='checkbox'
                                            tabIndex={-1}
                                            key={row.name}
                                        >   
                                            <TableCell
                                                className={index%2 ===1 ? classes.rowColor :null}
                                                component='th'
                                                id={labelId}
                                                scope='row'
                                                padding='none'
                                            >
                                                <Tooltip title='Delete' className={classes.iconFilter}>
                                                    <IconButton aria-label='delete' >
                                                        <DeleteIcon
                                                            onClick={() =>
                                                                handleDelete(
                                                                    row.id,
                                                                    row.name
                                                                )
                                                            }
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title='Edit' className={classes.iconFilter}>
                                                    
                                                    <IconButton aria-label='Edit'>
                                                        <EditIcon
                                                            onClick={() => {
                                                                setOpen(true);
                                                                setNameSpeciality(
                                                                    row.name
                                                                );
                                                            }}
                                                            
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell
                                                className={index%2 ===1 ? classes.rowColor :null}
                                                component='th'
                                                id={labelId}
                                                scope='row'
                                                padding='default'
                                                align='left'
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell
                                                className={index%2 ===1 ? classes.rowColor :null}
                                                component='th'
                                                id={labelId}
                                                scope='row'
                                                padding='default'
                                                align='left'
                                            >
                                                {row.id}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
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
            <PopUpEdit
                open={open}
                handleClose={handleClose}
                handleEdit={handleEdit}
            />
        </div>
    );
}
