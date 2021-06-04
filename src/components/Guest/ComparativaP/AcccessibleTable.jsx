import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
} from '@material-ui/core';
import supabase from '../../../supabase.config';

const useStyles = makeStyles({});

export default function AcccessibleTable({ plans }) {
    const classes = useStyles();

    let [compBenef, setCompBenef] = useState(null);

    // Guarda en el arreglo planNames sólo el número de plan
    let planNames = plans.map((plan) => plan.name.slice(7).trim());
    let basicplan = planNames[0];

    // Función que se trae todos los beneficios de la base
    // de datos que no están en el plan básico.
    // async function getBenefToCompare(idbasico) {
    async function getBenefToCompare() {
        // Se trae todos los beneficios
        const { data: benefs } = await supabase
            .from('benefits')
            .select('id, title, plans(id,name)');
        // console.log(benefs);

        // Se queda sólo con la información a utilizar
        let arrbnfs = benefs.map((b) => {
            let arrplans = b.plans.map((plan) => plan.name.slice(7).trim()); // ... y algo más
            return { title: b.title, plans: arrplans, weight: arrplans.length };
        });

        // Quita los beneficios que ya están en el plan básico
        let showbnfs = arrbnfs.filter(
            (benef) => !benef.plans.some((e) => e === basicplan)
        );

        // Los ordena por aparición de mayor a menor
        showbnfs
            .sort(function (a, b) {
                return a.weight - b.weight;
            })
            .reverse();

        setCompBenef(showbnfs);

        return;
    }

    useEffect(() => {
        getBenefToCompare();
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        // if (compBenef) {
        //   console.log(compBenef);
        // }
    }, [compBenef]);

    function controlCheck(benef, plan) {
        return benef.plans.includes(plan);
    }

    return (
        <TableContainer style={{ background: '#f1f1f1' }} component={Paper}>
            {/* Le saca el plan básico que ya está en el card */}
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
                        {compBenef &&
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
                                                    height: 2,
                                                }}
                                                edge='start'
                                                checked={controlCheck(
                                                    benef,
                                                    plan
                                                )}
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
