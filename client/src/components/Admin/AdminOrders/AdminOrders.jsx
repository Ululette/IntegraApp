import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import CircularProgress from "@material-ui/core/CircularProgress";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import EditIcon from "@material-ui/icons/Edit";
import blue from '@material-ui/core/colors/blue';
import "firebase/auth";
import AdminMedicAdd from "../AdminMedics/AdminMedicAdd";
import AdminOrdersEdit from "./AdminOrdersEdit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PopUp from './AdminOrderPop';

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
} from "@material-ui/core";
import { Button } from "@material-ui/core";
import calculateAge from "../../../functions/calculateAge";
import supabase from "../../../supabase.config";

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
  return order === "desc"
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
    { id: 'actions', numeric: false, disablePadding: true, label: 'ACIONES' },
    { id: 'date', numeric: false, disablePadding: true, label: 'FECHA' },
    { id: 'lastname', numeric: false, disablePadding: false, label: 'MEDICO' },
    {
        id: 'lastname',
        numeric: false,
        disablePadding: false,
        label: 'PACEINTE',
    },
    { id: 'dni', numeric: true, disablePadding: false, label: 'DNI SOCIO' },
    { id: 'status', numeric: false, disablePadding: false, label: 'ESTADO' },
    { id: 'view', numeric: false, disablePadding: false, label: 'VER' },
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
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
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
        marginBottom:'2rem'

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
  select:{
    width: '100%',
    marginBottom:'2rem'
  }
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, setToShowRows, toShowRows, rows, setRows } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("");
  const [selectedState, setSelectedState] = React.useState("activo");

  const handleChange = (event) => {
    event.target.name === "state"
      ? setSelectedState(event.target.value) &&
        setSelectedOption(event.target.value)
      : setSelectedOption(event.target.value);
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
    selectedOption === "state"
      ? filter(e.target[0].value, e.target[1].value)
      : filter(e.target[0].value, e.target[2].value);
  };

  const filter = (value) => {
let show = []
    setToShowRows(rows); 
    if (value === "autorizada") {
      value
      ? setToShowRows(
       show = rows.filter( r => r.order_status.name === "autorizada")
        )
      : setToShowRows(rows);
 
    } else if (value === "rechazada") {
      value
      ? setToShowRows(
       show = rows.filter( r => r.order_status.name === "rechazada")
        )
      : setToShowRows(rows);
    } else if (value === "en proceso") {
      value
      ? setToShowRows(
       show = rows.filter( r => r.order_status.name === "en proceso")
        )
      : setToShowRows(rows);
     
    } else if (value === "recibida") {
      value
      ? setToShowRows(
       show = rows.filter( r => r.order_status.name === "recibida")
        )
      : setToShowRows(rows);
    } else setToShowRows(rows);
    setOpen(false);
  };

  return (
    <Toolbar
      className={classes.root}
    >
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        AUATORIZACIONES
      </Typography>
      <Tooltip title="Clear" onClick={handleClose}>
        <IconButton 
            aria-label="reset"
            className={classes.iconFilter}>
          <ClearAllIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Filter list" onClick={handleClickOpen}>
        <IconButton 
            aria-label="filter list"
            className={classes.iconFilter}
            >
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className={classes.popup}>
                FILTRADO POR ESTADO:
        </DialogTitle>  
        <form  onSubmit={handleSubmit} >
        <DialogContent >  
          <FormControl className={classes.select}>
            {/* <InputLabel htmlFor="demo-dialog-native">Filtrar por</InputLabel> */}
            <Select
                variant='outlined'
                size='medium'
                native
                value={selectedOption}
                onChange={handleChange}
                input={<Input id="demo-dialog-native" />}
            >
              <option aria-label="None" value="" />
              <option value="autorizada">Autorizada</option>
              <option value="rechazada">Rechazada</option>
              <option value="en proceso">En proceso</option>
              <option value="recibida">Recibida</option>
            </Select>
          </FormControl>
        </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className={classes.popupBtn}>
              Cancelar
            </Button>
            <Button  type="submit" className={classes.popupBtn}>
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

//-------------------- Style Table Orders
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
    iconFilter: {
        color: 'rgba(0, 0, 0, 0.47)',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: lighten('#34a7a1', 0.8),
        },
    }
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [status, setStatus] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [listMedics, setListMedics] = React.useState([]);
  const [medicSpecialities, setMedicSpecialities] = React.useState([]);
  const [editActive, setEditActive] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [toShowRows, setToShowRows] = React.useState([]);
  const MySwal = withReactContent(Swal);
  const [row, setRow] = React.useState({
    date: '',
    study_name: '',
    partners: {
      name: '', 
      lastname: '',
      dni: '',
    }, 
    medics: {
      name: '', 
      lastname: '',
    },
    medical_consultations: {
      id: ''
    }, 
    order_status: {
      name:'',
    }, 
    results: {
      results : {
        results: ''
      }
    },
      order_status: {
        name:''
      }
  
    
  })  
  const [open, setOpen] = React.useState(false);



  const handleClickOpen = (row) => {
    setRow(row)
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };





  const fetchOrders = async () => {
    const { data: orders, error: errorFetchOrders } = await supabase
      .from("orders")
      .select(
        "id, date, results, study_name, order_status(name), partners(dni, name, lastname), medics(dni, name, lastname), medical_consultations(id) "
      );
      console.log(orders, 'hola')

   orders &&  setRows(orders);
  };

  const fetchOrder_status = async () => {
    const { data: statusDB, error: errorStatus } = await supabase
      .from("order_status")
      .select('*' );
    setStatus(statusDB)
  };

  React.useEffect(() => {
    fetchOrder_status();
        fetchOrders();
    }, []); 
    React.useEffect(() => {
      setToShowRows(rows);
      }, [rows]); 

  const handleEdit = (data) => {
    setData(data);
    setEditActive(true);
/*     console.log("Click en edit"); */
    if (editActive) setEditActive(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

 

  /* const isSelected = (name) => selected.indexOf(name) !== -1; */

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
/*     setToShowRows(rows)
 */
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
            aria-labelledby="tableTitle"
            size="small" 
            aria-label="enhanced table"
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
              {stableSort(toShowRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  /* const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`; */
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      /* aria-checked={isItemSelected} */
                      tabIndex={-1}
                      key={row.name}
                      /* selected={isItemSelected} */
                    >
                      <TableCell 
                        className={
                            index % 2 === 1
                                ? classes.rowColor
                                : null
                        }
                        align="left">
                        <Tooltip
                            title='Edit'
                            className={
                                classes.iconFilter
                            }
                        >
                            <IconButton size='small' aria-label='Edit'>
                                <EditIcon onClick={() => handleEdit(row)} />
                            </IconButton>
                            
                        </Tooltip>
                        
                      </TableCell>
                      <TableCell 
                        className={
                            index % 2 === 1
                                ? classes.rowColor
                                : null
                        }
                        align="left">{row.date}</TableCell>
                      <TableCell 
                        className={
                            index % 2 === 1
                                ? classes.rowColor
                                : null
                        }
                        align="left">
                        {row.medics.name} {row.medics.lastname}
                      </TableCell>
                      <TableCell 
                        className={
                            index % 2 === 1
                                ? classes.rowColor
                                : null
                        }
                        align="left"
                        key={index}
                        >
                        {row.partners.name} {row.partners.lastname}
                      </TableCell>
                      <TableCell 
                        className={
                            index % 2 === 1
                                ? classes.rowColor
                                : null
                        }
                        align="left">{row.partners.dni}</TableCell>
                      <TableCell 
                        className={
                            index % 2 === 1
                                ? classes.rowColor
                                : null
                        }
                        align="left">{row.order_status.name}</TableCell>
                      <TableCell 
                        className={
                            index % 2 === 1
                                ? classes.rowColor
                                : null
                        }
                        align="left">
                        <Button 
                        className={classes.iconFilter}
                        variant="outlined" 
                        onClick={ () => handleClickOpen(row)}>
                          📝
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height:  33  * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {editActive ? (
                <AdminOrdersEdit
                    status={status}
                    setEditActive={setEditActive}
                    editActive={editActive}
                />
            ) : null}         
                <PopUp
                rows={row}
                    handleClose={handleClose}
                    open={open}
                />
    </div>
  );
}

//recibe l autorizada como value pero no uestra las seleccionadas
