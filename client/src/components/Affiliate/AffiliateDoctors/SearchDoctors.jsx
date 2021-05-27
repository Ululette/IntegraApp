import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { GridApi ,Button } from '@material-ui/core';
import supabase from '../../../supabase.config.js';
import styles from './SearchDoctors.module.css';

import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'DNI', width: 190 },
    { field: 'firstname', headerName: 'Nombre', width: 190 },
    { field: 'lastname', headerName: 'Apellido', width: 190 },
    { field: 'contact', headerName: 'Teléfono', width: 190 },
    { field: 'email', headerName: 'Email', width: 190 },
    { field: 'address', headerName: 'Dirección', width: 190 },
    // {
    //     field: 'studyname',
    //     headerName: 'Estudio',
    //     sortable: true,
    //     width: 160,
    // },
];

function SearchDoctors() {
    const [medics, setMedics] = useState([]);
    const [favourites, setFavourites] = React.useState([]);

    const fetchMedics = async () => {
        try {
            const { data: medics } = await supabase
                .from('medics')
                .select('dni, name, lastname, phone_number, email, address');
                setMedics(medics);
                // console.log(medics)
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchMedics();
    }, []);

    const handleSelectFavourites = (newSelection) => {
        setFavourites(newSelection.selectionModel);
        console.log(newSelection);
    }

    if (medics.length === 0) return <CircularProgress />;

    const rows = medics.map((el) => {
        return {
            id: el.dni,
            firstname: el.name,
            lastname: el.lastname,
            contact: el.phone_number,
            email: el.email,
            address: el.address,
        };
    });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Mis autorizaciones</h1>
                <div className={styles.btnFav}>
                    <Button variant="outlined" color="primary">
                        Agregar a favoritos
                    </Button>
                </div>
            </div>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                className={styles.datagrid}
                onSelectionModelChange={handleSelectFavourites}
                selectionModel={favourites}
            />
        </div>
    );
}

export default SearchDoctors;

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import { lighten, makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import TableSortLabel from '@material-ui/core/TableSortLabel';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';
// import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
// import List from '@material-ui/core/List';
// import ListItemText from '@material-ui/core/ListItemText';

// import { statesAff } from '../../../functions/states';
// // import { getAffiliates, getPlans } from '../../../actions/getter.action.js';
// import calculateAge from '../../../functions/calculateAge.js';
// import styles from './SearchDoctors.module.css';
// import supabase from '../../../supabase.config';

// function descendingComparator(a, b, orderBy) {
//     if (b[orderBy] < a[orderBy]) {
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//         return 1;
//     }
//     return 0;
// }

// function getComparator(order, orderBy) {
//     return order === 'desc'
//         ? (a, b) => descendingComparator(a, b, orderBy)
//         : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//     console.log('Sort:',array);
//     const stabilizedThis = array.map((el, index) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0]);
//         if (order !== 0) return order;
//         return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
//     { id: 'dni', numeric: true, disablePadding: false, label: 'DNI' },
//     { id: 'name', numeric: false, disablePadding: false, label: 'Nombre' },
//     { id: 'lastname', numeric: false, disablePadding: false, label: 'Apellido'},
//     { id: 'contact', numeric: false, disablePadding: false, label: 'Contacto' },
//     { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
// ];

// function EnhancedTableHead(props) {
//     const { classes, order, orderBy, onRequestSort } = props;
//     const createSortHandler = (property) => (event) => {
//         onRequestSort(event, property);
//     };

//     return (
//         <TableHead>
//             <TableRow>
//                 <TableCell padding='checkbox'></TableCell>
//                 {headCells.map((headCell) => (
//                     <TableCell
//                         key={headCell.id}
//                         align={'center'}
//                         padding={headCell.disablePadding ? 'none' : 'default'}
//                         sortDirection={orderBy === headCell.id ? order : false}
//                     >
//                         <TableSortLabel
//                             active={orderBy === headCell.id}
//                             direction={orderBy === headCell.id ? order : 'asc'}
//                             onClick={createSortHandler(headCell.id)}
//                         >
//                             {headCell.label}
//                             {orderBy === headCell.id ? (
//                                 <span className={classes.visuallyHidden}>
//                                     {order === 'desc'
//                                         ? 'sorted descending'
//                                         : 'sorted ascending'}
//                                 </span>
//                             ) : null}
//                         </TableSortLabel>
//                     </TableCell>
//                 ))}
//             </TableRow>
//         </TableHead>
//     );
// }

// EnhancedTableHead.propTypes = {
//     classes: PropTypes.object.isRequired,
//     onRequestSort: PropTypes.func.isRequired,
//     order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//     orderBy: PropTypes.string.isRequired,
//     rowCount: PropTypes.number.isRequired,
// };

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
// }));

// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//         display: 'flex',
//         justifyContent: 'flex-end',
//         alignItems: 'flex-start',
//         marginTop: '2rem',
//         height: '80vh',
//     },
//     paper: {
//         width: '100%',
//         marginBottom: theme.spacing(2),
//     },
//     table: {
//         width: '100%',
//     },
//     visuallyHidden: {
//         border: 0,
//         clip: 'rect(0 0 0 0)',
//         height: 1,
//         overflow: 'hidden',
//         padding: 0,
//         position: 'absolute',
//         top: 20,
//         width: 1,
//     },
// }));

// function SearchDoctors({ firebase }) {
//     const classes = useStyles();
//     const [order, setOrder] = React.useState('asc');
//     const [orderBy, setOrderBy] = React.useState('calories');
//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(5);
//     const [medics, setMedics] = React.useState([]);
    
//     const classesFilter = useToolbarStyles();
//     const [inputFilters, setInputFilters] = React.useState({
//         select: '',
//         text: '',
//     });
//     const MySwal = withReactContent(Swal);
//     const [input, setInput] = React.useState({
//         dni: '',
//         lastname: '',
//         name: '',
//         contact: '',
//         email: '',
//     });


//     useEffect(async () => {
//         try {
//             const { data: medics } = await supabase
//                 .from('medics')
//                 .select('name, lastname, dni, phone_number, email, address');
//                 setMedics(medics);
//                 console.log(medics)
//         } catch (err) {
//             console.log(err);
//         }
//     },[]);

//     let rows = medics.map((el) => {
//         return {
//             dni: String(el.dni),
//             lastname: el.lastname,
//             name: el.name,
//             contact: el.phone_number,
//             email: el.email,
//         };
//     });

//     const handleRequestSort = (event, property) => {
//         const isAsc = orderBy === property && order === 'asc';
//         setOrder(isAsc ? 'desc' : 'asc');
//         setOrderBy(property);
//     };

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const emptyRows =
//         rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

//     const handleChange = (e) => {
//         const name = e.target.name;
//         const value = e.target.value;
//         setInput({ ...input, [name]: value });
//     };

//     if (rows.length === 0) return <CircularProgress />;

//     //Toolbar Row
//     const rowsOriginal = rows.map((el) => el);

//     const handleChangeFilters = (e) => {
//         let value = e.target.value;
//         let name = e.target.name;
//         setInputFilters({ ...inputFilters, [name]: value });
//     };

//     if (inputFilters.text !== '' && inputFilters.select !== '') {
//         rows = rows.filter((el) =>
//             el[inputFilters.select].includes(inputFilters.text)
//         );
//     } else {
//         rows = rowsOriginal.map((el) => el);
//     }

//     return (
//         <div className={classes.root}>
//             <Paper className={classes.paper}>
//                 <Toolbar>
//                     <Typography
//                         className={classesFilter.title}
//                         variant='h6'
//                         id='tableTitle'
//                         component='div'
//                     >
//                         Cartilla médica
//                     </Typography>
//                     <section className={styles.filters}>
//                         <div className={styles.filtersSelector}>
//                             <InputLabel id='filter-select'>
//                                 Filtrar por
//                             </InputLabel>
//                             <Select
//                                 className={styles.filtersSelect}
//                                 labelId='filter-select'
//                                 name='select'
//                                 onChange={handleChangeFilters}
//                                 value={inputFilters.select}
//                             >
//                                 <MenuItem value='dni'>DNI</MenuItem>
//                                 <MenuItem value='name'>Nombre/s</MenuItem>
//                                 <MenuItem value='lastname'>Apellido/s</MenuItem>
//                                 <MenuItem value='contact'>Telefono</MenuItem>
//                                 <MenuItem value='email'>Email</MenuItem>
//                             </Select>
//                         </div>
//                         <TextField
//                             className={styles.filtersinput}
//                             label='Filtro'
//                             type='text'
//                             name='text'
//                             value={inputFilters.text}
//                             onChange={handleChangeFilters}
//                         />
//                     </section>
//                 </Toolbar>
//                 <TableContainer>
//                     <Table
//                         className={classes.table}
//                         aria-labelledby='tableTitle'
//                         aria-label='enhanced table'
//                     >
//                         <EnhancedTableHead
//                             classes={classes}
//                             order={order}
//                             orderBy={orderBy}
//                             onRequestSort={handleRequestSort}
//                             rowCount={rows.length}
//                         />
//                         <TableBody>
//                             {stableSort(rows, getComparator(order, orderBy))
//                                 .slice(
//                                     page * rowsPerPage,
//                                     page * rowsPerPage + rowsPerPage
//                                 )
//                                 .map((row, index) => {
//                                     const labelId = `enhanced-table-checkbox-${index}`;

//                                     return (
//                                         <TableRow
//                                             hover
//                                             tabIndex={-1}
//                                             key={row.dni}
//                                         >
//                                             {/* <TableCell
//                                                 value={row.dni}
//                                                 component='th'
//                                                 id={labelId}
//                                                 scope='row'
//                                                 padding='none'
//                                                 align='center'
//                                             >
//                                                 {row.dni}
//                                             </TableCell> */}
//                                             <TableCell
//                                                 value={row.dni}
//                                                 align='center'
//                                             >
//                                                 {row.dni}
//                                             </TableCell>
//                                             <TableCell
//                                                 value={row.name}
//                                                 align='center'
//                                             >
//                                                 {row.name}
//                                             </TableCell>
//                                             <TableCell
//                                                 value={row.lastname}
//                                                 align='center'
//                                             >
//                                                 {row.lastname}
//                                             </TableCell>
//                                             <TableCell
//                                                 value={row.contact}
//                                                 align='center'
//                                             >
//                                                 {row.contact}
//                                             </TableCell>
//                                             <TableCell
//                                                 value={row.email}
//                                                 align='left'
//                                             >
//                                                 {row.email}
//                                             </TableCell>
//                                         </TableRow>
//                                     );
//                                 })}
//                             {emptyRows > 0 && (
//                                 <TableRow>
//                                     <TableCell colSpan={6} />
//                                 </TableRow>
//                             )}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//                 <TablePagination
//                     rowsPerPageOptions={[5, 10, 25]}
//                     component='div'
//                     count={rows.length}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     onChangePage={handleChangePage}
//                     onChangeRowsPerPage={handleChangeRowsPerPage}
//                 />
//             </Paper>
//         </div>
//     );
// }

// export default SearchDoctors;

