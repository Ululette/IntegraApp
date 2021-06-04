import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  Select,
  MenuItem
} from '@material-ui/core';
import {Check, Clear} from '@material-ui/icons';
import supabase from '../../../supabase.config';

// Estilos usados en componentes de MUI.
const useStyles = makeStyles({
  formcont: {
    width: '100%',
    boxShadow: "none",
    color: "#000000",
    verticalAlign: "middle",
    alignItems: "center",
    textAlign: "center"
  },
  headcell: {
    fontSize: 18,
    verticalAlign: "middle",
    alignItems: "center",
    textAlign: "center"
  },
  cell: {
    verticalAlign: "middle",
    alignItems: "center",
    textAlign: "center"
  },
  centeredcell:{
    verticalAlign: "middle",
    alignItems: "center",
    textAlign: "center"
  }
});

export default function CompareMyPlan({ plandata, familymembers }) {
  const classes = useStyles();

  // Datos del plan actual
  let { id: actual_plan_id, name: actual_plan_name, price: actual_plan_price, benefits: actual_plan_benefits } = plandata;



  // Estado del planes a mostrar en selector (distintos al actual)
  let [otherPlans, setOtherPlans] = useState(null);

  // Función que se trae todos los planes de la base
  // de datos con id distinta del actual actual_plan_id
  async function getPlans(idplanactual) {
    const { data: showplans } = await supabase
      .from('plans')
      .select('id, name,price')
      .neq('id', idplanactual)

    // Ordena el arreglo de planes por nombre de menor a mayor
    showplans.sort(function (a, b) {
      //parseInt(a.name.trim().slice(7))) - parseInt(a.name.trim().slice(7)))
      return parseInt(a.name.trim().slice(7)) - parseInt(b.name.trim().slice(7));
    })
    setOtherPlans(showplans)
    // console.log(showplans);
  }

  useEffect(() => {
    if (actual_plan_id) {
      getPlans(actual_plan_id);
    }
  }, [actual_plan_id]);//[]

  // Estado de todos los beneficios del plan a comparar
  let [compBenefs, setCompBenefs] = useState(null);

  // Función que se trae todos los beneficios de la base
  // de datos que están en el plan con id especificada.
  async function getBenef(idplan) {
    let { data: benefs } = await supabase
      .from('plans_benefits')
      .select(`
          plan: plan_id (id,name,price),
          benefits: benefit_id (id,title)
        `)
      .eq('plan_id', idplan)

    let arrbnfs = benefs.map(b => ({
      id: b.benefits.id,
      title: b.benefits.title,
    }))

    // Ordena el arreglo por id
    arrbnfs.sort(function (a, b) {
      return a.id - b.id;
    })

    setCompBenefs(arrbnfs);
    // console.log('acá:', arrbnfs)
    return;
  }

  // Estado del plan seleccionado para comparar
  let [compPlan, setCompPlan] = useState({ id: null, name: null, price: null });

  // Estado de todos los beneficios a comparar
  let [allbenefs, setAllbenefs] = useState(actual_plan_benefits);


  let handleChange = (event) => {
    event.preventDefault();
    setCompPlan(event.target.value);
    // console.log('seleccionaste: ', event.target.value) 
  };

  // Cuando fijó el plan recarga
  useEffect(() => {
    if (compPlan.id) {
      // console.log('seleccionaste: ', compPlan.id, compPlan);
      getBenef(compPlan.id);
    }
  }, [compPlan]);

  // Función que devuelve un arreglo con todos los beneficios
  // sin duplicar.
  function mergeBenefsOnUnique(arr1, arr2) {
    let all = arr1.concat(arr2);
    let arr = all.filter((e, index) => {
      return all.indexOf(e) === index;
    })
    setAllbenefs(arr);
    return;
  }

  // Una vez que cargó los beneficios del plan a comparar recarga
  useEffect(() => {
    if (compBenefs) {
      // console.log('acá2:', compBenefs)
      mergeBenefsOnUnique(actual_plan_benefits, compBenefs)
      // console.log('acá3:', allbenefs)
    }
  }, [actual_plan_benefits, compBenefs]);

  useEffect(() => {
    // if (allbenefs) {
    //   console.log('acá3:', allbenefs)
    //   console.log('acá4:', compBenefs)
    // }
  }, [allbenefs]);

  //verifBenef(benef.id,actual_plan_benefits)<p><Check/></p>

  let verifBenef = (id, arr) => {
    return arr.some(e => e.id === id) ?  <Check/> : <Clear/>
  }

  return (
    <div>
      <TableContainer style={{ background: '#f1f1f1' }} >
        <Table aria-label='caption table'>
          <TableHead style={{ background: '#d7f7f5' }}>
            <TableRow className={classes.cell} >
              <TableCell className={classes.headcell} style={{ width: 500 }}>
                Beneficios
              </TableCell>
              <TableCell className={classes.headcell} style={{ width: 200 }}>
                {actual_plan_name} (actual)
              </TableCell>
              <TableCell className={classes.cell} style={{ width: 200 }}>
                <FormControl className={classes.formControl}>
                  {/* Celda con plan a comparar  */}
                  <Select
                    // multiple
                    displayEmpty
                    disableUnderline
                    className={classes.headcell}
                    value={compPlan}
                    onChange={handleChange}
                    // input={<Input />}
                    renderValue={(selected) => {
                      if (selected.id === null) {
                        // Esto es lo que muestra antes de seleccionar
                        return <>Plan a comparar</>;
                      }
                      return selected.name;
                    }}
                  >
                    {otherPlans && otherPlans.map((plan, index) => (
                      <MenuItem key={index} value={plan} >
                        {plan.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allbenefs && allbenefs.map((benef, index) => (
              <TableRow>
                {/* columna 2 */}
                <TableCell
                  key={index}
                >
                  {benef.title}
                </TableCell>

                {/* columna 2 */}
                <TableCell
                  component='th'
                  scope='row'
                  className={classes.centeredcell}
                >
                  {verifBenef(benef.id, actual_plan_benefits)}
                </TableCell>
                {/* columna 3 */}
                {compBenefs ? <TableCell
                  component='th'
                  scope='row'
                  className={classes.centeredcell}
                >
                  {compPlan.id && verifBenef(benef.id,compBenefs)}
                </TableCell> : 
                <TableCell
                component='th'
                scope='row'
                className={classes.centeredcell}
              >
                 
              </TableCell> }
              </TableRow>
            ))}

            {/* Fila con importes  */}
            <TableRow>
              <TableCell
                style={{ background: '#d7f7f5' }}
                component='th'
                scope='row'
              >
                Importe individual: 
              </TableCell>
              <TableCell
                style={{ background: '#d7f7f5' }}
                component='th'
                scope='row'
                className={classes.centeredcell}
              >
                $ {actual_plan_price}
              </TableCell>
              {compBenefs ? <TableCell 
                style={{ background: '#d7f7f5' }}
                component='th'
                scope='row'
                className={classes.centeredcell}
              >
                $ {compPlan.price}
              </TableCell>: 
                <TableCell
                style={{ background: '#d7f7f5' }}
                component='th'
                scope='row'
                className={classes.centeredcell}
              >
                 
              </TableCell> }
            </TableRow>
            {familymembers && <TableRow>
              <TableCell
                style={{ background: '#d7f7f5' }}
                component='th'
                scope='row'
              >
                Total por grupo familiar:
              </TableCell>
              <TableCell
                style={{ background: '#d7f7f5' }}
                component='th'
                scope='row'
                className={classes.centeredcell}
              >
                $ {actual_plan_price * familymembers}
              </TableCell>
              {compBenefs ? <TableCell 
                style={{ background: '#d7f7f5' }}
                component='th'
                scope='row'
                className={classes.centeredcell}
              >
                $ {compPlan.price * familymembers}
              </TableCell>: 
                <TableCell
                style={{ background: '#d7f7f5' }}
                component='th'
                scope='row'
                className={classes.centeredcell}
              >
                 
              </TableCell> }
            </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
