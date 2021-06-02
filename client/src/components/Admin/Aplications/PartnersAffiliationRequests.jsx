import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    lighten,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    IconButton,
    Tooltip,
    FormControl,
    Select,
    Input,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Paper,
    Button,
    TablePagination,
    Dialog,
    DialogContent,
    DialogActions,
    Toolbar
} from '@material-ui/core';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import SaveIcon from '@material-ui/icons/Save';
import calculateAge from '../../../functions/calculateAge';
import supabase from '../../../supabase.config';
import getSome from '../../../actions/elgetter';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import 'firebase/auth';

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
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Nombre',
    },
    {
        id: 'lastname',
        numeric: false,
        disablePadding: false,
        label: 'Apellido',
    },
    {
        id: 'dni',
        numeric: false,
        disablePadding: false,
        label: 'DNI del titular',
    },
    {
        id: 'birthdate',
        numeric: true,
        disablePadding: false,
        label: 'Edad',
    },
    { id: 'state', numeric: false, disablePadding: false, label: 'Estado' },
];

function EnhancedTableHead() {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell, index) => (
                    <TableCell
                        key={`${headCell.id}-${index}`}
                        align='left'
                        padding='default'
                    >
                        {headCell.label}
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
    const { numSelected } = props;

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
                Solicitudes
            </Typography>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const StatusSelector = ({
    current,
    setNewSatus,
    index,
    setIndexOnChange,
    indexOnChange,
}) => {
    const classes = useToolbarStyles();

    const [status, setStatus] = React.useState(current);

    const handleChange = (e) => {
        e.preventDefault();
        setStatus(e.target.value);
    };

    React.useEffect(() => {
        //eslint-disable-next-line
        if (status == current) {
            //eslint-disable-next-line
            setIndexOnChange(indexOnChange.filter((e) => e != index));
        } else {
            setIndexOnChange([...indexOnChange, index]);
            setNewSatus(status);
        }
        //eslint-disable-next-line
    }, [status]);

    return (
        <FormControl className={classes.formControl}>
            <Select
                native
                value={status}
                onChange={handleChange}
                input={<Input id='demo-dialog-native-2' />}
                name='status2'
                label='value2'
            >
                <option aria-label='None' value='' />
                <option value='aceptado'>Aceptada</option>
                <option value='rechazado'>Rechazada</option>
                <option value='revision pendiente'>Revisión Pendiente</option>
            </Select>
        </FormControl>
    );
};

const ViewDoc = ({ doc }) => {

    const medicalRecord = JSON.parse(doc);

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    });
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
            { medicalRecord ?
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Diabetes : {medicalRecord.diabetes}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        be{bull}nev{bull}o{bull}lent
            </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        adjective
            </Typography>
                    <Typography variant="body2" component="p">
                        well meaning and kindly.
              <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                :
                null}
        </Card>
    );
}

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

export default function PartnersAffiliationRequests() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('familiar_name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [listRequests, setListRequests] = React.useState([]);
    const [toShowRows, setToShowRows] = React.useState([]);
    const rows = listRequests;
    const MySwal = withReactContent(Swal);
    const [newStatus, setNewSatus] = React.useState('');
    const [indexOnChange, setIndexOnChange] = React.useState([]);
    const [medicalRecord, setMedicalRecord] = React.useState(null);

    const fetchRequests = () => {
        getSome('medical_records', '*, partners(*)').then(
            (r) => {
                console.log(r)
                setListRequests(r);
                setToShowRows(r);
            },
            (err) => console.error(err.message)
        );
    };

    React.useEffect(() => {
        fetchRequests();
    }, []);

    const handleSave = async (request) => {
        const statusState = {
            aceptada: 'dado de baja',
            pendiente: 'revision pendiente',
            rechazada: 'aceptado',
        };

        MySwal.fire({
            title: `Desea guardar como ${newStatus} la solucitud de baja de ${request.familiar_name} de la obra social?`,
            showCloseButton: true,
            showCancelButton: true,
            icon: 'question',
        }).then(async (res) => {
            if (res.isConfirmed) {
                try {
                    await supabase
                        .from('familiar_downs_request')
                        .update({ status: newStatus })
                        .eq('familiar_dni', request.familiar_dni);
                } catch (error) {
                    console.log(error);
                } finally {
                    await supabase
                        .from('partners')
                        .update({ state: statusState[newStatus] })
                        .eq('dni', parseInt(request.familiar_dni))
                        .then((r) => {
                            if (r.body[0].state === statusState[newStatus]) {
                                MySwal.fire({
                                    title: `El socio ${request.familiar_name} ${request.familiar_lastname}
                                    ahora está ${statusState[newStatus]}.
                                        La solicitud ha sido actualizada!`,
                                    icon: 'success',
                                    timer: 3000,
                                }).then(() => window.location.reload());
                            }
                        });
                }
            }
        });
    };

    const handleRequestSort = (event, property) => {
        event.preventDefault();
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
        event.preventDefault();
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
            <Dialog
                open={!!medicalRecord}
                className={classes.dialog}
            >
                <DialogContent>
                    <ViewDoc doc={medicalRecord} />
                </DialogContent>
                <DialogActions>
                    <Button type='close' onClick={(e) => { e.preventDefault(); setMedicalRecord(null) }}>Cerrar</Button>
                </DialogActions>
            </Dialog>
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
                                                <Tooltip
                                                    title='Guardar'
                                                    onClick={() =>
                                                        handleSave(row, index)
                                                    }
                                                    disabled={
                                                        !indexOnChange.includes(
                                                            index
                                                        )
                                                    }
                                                >
                                                    <IconButton aria-label='save'>
                                                        <SaveIcon
                                                            color={
                                                                !indexOnChange.includes(
                                                                    index
                                                                )
                                                                    ? 'disabled'
                                                                    : 'primary'
                                                            }
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip
                                                    title='Info'
                                                    onClick={() => setMedicalRecord(row.declaration)}
                                                >
                                                    <IconButton aria-label='save'>
                                                        <DescriptionRoundedIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell
                                                component='th'
                                                id={labelId}
                                                scope='row'
                                                padding='default'
                                            >
                                                {row.partners.name}
                                            </TableCell>
                                            <TableCell align='right'>
                                                {row.partners.lastname}
                                            </TableCell>
                                            <TableCell align='right'>
                                                {row.partners.dni}
                                            </TableCell>
                                            <TableCell align='right'>
                                                {calculateAge(
                                                    row.partners.birthdate
                                                )}
                                            </TableCell>
                                            <TableCell align='center'>
                                                <StatusSelector
                                                    current={row.partners.state}
                                                    setNewSatus={setNewSatus}
                                                    index={index}
                                                    indexOnChange={
                                                        indexOnChange
                                                    }
                                                    setIndexOnChange={
                                                        setIndexOnChange
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 33 * emptyRows }}>
                                    <TableCell colSpan={8} />
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
