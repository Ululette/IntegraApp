import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import supabase from '../../../supabase.config';

//https://material-ui.com/components/tables/ caption

const useStyles = makeStyles({});

export default function AcccessibleTable({ plans }) {
    let [compBenef, setCompBenef] = useState([]);

    async function getBenefits() {
        const { data: benefits, error } = await supabase
            .from('benefits')
            .select('id, title , description');

        benefits.sort(function (a, b) {
            return a.id - b.id;
        });
        //benefits = [{id: 7, title: "Consultas médicas al 100% en todas las especialidades sin derivación previa", description: "Común para todos los planes"}, {},{}]
        let benef = benefits.filter(
            (benefit) => benefit.description !== 'Básico'
        );
        setCompBenef(benef);
    }

    const classes = useStyles();
    let planNames = plans.map((plan) => plan.name.slice(7));

    useEffect(() => {
        getBenefits();
    }, []);

    useEffect(() => {
        // if (compBenef.length) {
        //   console.log(compBenef);
        // }
    }, [compBenef]);

    return (
        <TableContainer style={{ background: '#f1f1f1' }} component={Paper}>
            {planNames.slice(1).length && (
                <Table className={classes.table} aria-label='caption table'>
                    <TableHead style={{ background: '#d7f7f5' }}>
                        <TableRow>
                            <TableCell style={{ width: 400 }}>
                                BENEFICIOS EXTRA DE PLANES SUPERIORES
                            </TableCell>
                            {planNames.slice(1).map((plan, index) => (
                                <TableCell key={index} align='center'>
                                    INTEGRA {plan}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Crea la fila a partir del arreglo */}
                        {compBenef.length &&
                            compBenef.map((benef, index1) => (
                                <TableRow key={index1}>
                                    <TableCell
                                        key={index1}
                                        component='th'
                                        scope='row'
                                    >
                                        {benef.title}
                                    </TableCell>

                                    {planNames.slice(1).map((plan, index2) => (
                                        <TableCell key={index2} align='center'>
                                            <Checkbox
                                                key={index2}
                                                style={{
                                                    color: '#41aea9',
                                                    height: 3,
                                                }}
                                                edge='start'
                                                checked={
                                                    parseInt(
                                                        benef.description.slice(
                                                            11,
                                                            14
                                                        )
                                                    ) <= parseInt(plan)
                                                }
                                                tabIndex={-1}
                                                disableRipple
                                            />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        {/* Fila con importes  */}
                        <TableRow>
                            <TableCell
                                style={{ background: '#d7f7f5' }}
                                component='th'
                                scope='row'
                            >
                                Importe:
                            </TableCell>

                            {plans.slice(1).map((plan, index3) => (
                                <TableCell
                                    key={index3}
                                    style={{ background: '#d7f7f5' }}
                                    align='center'
                                >
                                    $ {plan.price}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    );
}
