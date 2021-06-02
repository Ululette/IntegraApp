import React from "react";
import PropTypes from "prop-types";
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
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import blue from '@material-ui/core/colors/blue'

import CreateIcon from "@material-ui/icons/Create";
import { Button } from "@material-ui/core";

import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

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
  { id: "action", numeric: false, disablePadding: false, label: "ACCIONES" },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "NOMBRE",
  },
  { id: "price", numeric: true, disablePadding: false, label: "PRECIO" },
  { id: "detail", numeric: false, disablePadding: false, label: "DETALLES" },
  {
    id: "users",
    numeric: false,
    disablePadding: false,
    label: "USUARIOS",
  },
  { id: "state", numeric: true, disablePadding: false, label: "ESTADO" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={classes.title}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="default"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
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
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// const useToolbarStyles = makeStyles((theme) => ({
//   root: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(1),
//   },
//   highlight:
//     theme.palette.type === "light"
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark,
//         },
//   title: {
//     flex: "1 1 100%",
//   },
// }));

//------------------------makeStyle1---------------------------------------------------------------------------------------
const useToolbarStyles = makeStyles((theme) => ({
  root: {

      backgroundColor: lighten('#34a7a1', 0.3),
      padding: '0px 0px 0px 0px',
      //color barra superior '
  },
  highlight:
      theme.palette.type === 'light'
          ? {
              color: '#fafafa',
              backgroundColor: lighten(blue[500], 0.5),//color barra superior cuando selecciono item
              fontWeight: 'bold',
              fontSize: '30px'
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
      textAlign: 'center'
  },
  filters: {
      display: 'flex'
  },
  iconFilter: {
      color: '#fafafa',
      fontWeight: 'bold',
      '&:hover': {
          backgroundColor: '#34a7a1',
      }
  },
  iconBlock: {
      color: '#fafafa',
      fontWeight: 'bold',
      '&:hover': {
          backgroundColor: lighten('#34a7a1', 0.8),
      }
  },
  p: {
      fontWeight: 'bold',
      fontSize: '1.4rem',
      color: '#fafafa',
      textAlign: 'rigth'
  },
  popup: {
      color: '#fafafa',
      backgroundColor: '#2c7f7b',
      fontWeight: 'bold',
      fontSize: '30px'
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
      }
  },
  formControl : {
      width: '177px'
  }

}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  return (
    <Toolbar className={classes.root}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
        align="center"
      >
        PLANES
      </Typography>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//   },
//   paper: {
//     width: "100%",
//     marginBottom: theme.spacing(2),
//   },
//   table: {
//     minWidth: 750,
//   },
//   visuallyHidden: {
//     border: 0,
//     clip: "rect(0 0 0 0)",
//     height: 1,
//     margin: -1,
//     overflow: "hidden",
//     padding: 0,
//     position: "absolute",
//     top: 20,
//     width: 1,
//   },
// }));

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
      width: 1
  },
  title: {
      color: '#212121',
      fontWeight: 'bold',
      backgroundColor: lighten('#34a7a1', 0.6)
  },
  rowColor: {
      backgroundColor: lighten('#e0e0e0', 0.3),
      ':checked': {
          color: blue[500]
      }
  },
  iconFilter: {
      color: 'rgba(0, 0, 0, 0.47)',
      fontWeight: 'bold',
      '&:hover': {
          backgroundColor: lighten('#34a7a1', 0.8),
      }
  }
}));

export default function PlansTable({
  plans,
  handleOpenModalModify,
  handleOpenModalDelete,
  handleOpenModalDetails,
  handleOpenModalState,
}) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  //const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const rows = plans;

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /* const handleChangeDense = (event) => {
    setDense(event.target.checked);
  }; */

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size= "small"
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
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow>
                      <TableCell /* padding="default" */ align='left' className={index % 2 === 1 ? classes.rowColor : null}>
                        <Tooltip
                          className={classes.iconFilter}
                          title="Editar plan"
                          onClick={() => handleOpenModalModify(row)}
                        >
                          <CreateIcon />
                        </Tooltip>
                        {row.active ? (
                          <Tooltip
                            className={classes.iconFilter}
                            title="Desactivar"
                            aria-label="deactivate"
                            onClick={() => handleOpenModalState(row)}
                          >
                            <PowerSettingsNewIcon />
                          </Tooltip>
                        ) : (
                          <Tooltip
                          className={classes.iconFilter}
                            title="Activar"
                            aria-label="activate"
                            onClick={() => handleOpenModalState(row)}
                          >
                            <PowerSettingsNewIcon />
                          </Tooltip>
                        )}
                        <Tooltip
                          className={classes.iconFilter}
                          title="Eliminar plan"
                          aria-label="delete"
                          onClick={() => handleOpenModalDelete(row)}
                        >
                          <DeleteIcon />
                        </Tooltip>
                      </TableCell>
                      <TableCell
                        className={index % 2 === 1 ? classes.rowColor : null}
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="default"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="left" className={index % 2 === 1 ? classes.rowColor : null}>
                        ${row.price}
                      </TableCell>
                      <TableCell align="left" className={index % 2 === 1 ? classes.rowColor : null}>
                        <Button
                        className={classes.iconFilter}
                          onClick={() => handleOpenModalDetails(row)}
                          variant="outlined"
                          size="small"
                        >
                          Ver
                        </Button>
                      </TableCell>
                      <TableCell padding="default"
                      className={index % 2 === 1 ? classes.rowColor : null}
                      >
                        {row.users}
                        </TableCell>
                      <TableCell padding="default"
                      className={index % 2 === 1 ? classes.rowColor : null}
                      >
                        {row.active ? "Activo" : "Inactivo"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
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
