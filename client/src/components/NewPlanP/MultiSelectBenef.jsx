import React, { useState, useEffect } from 'react';
import parseJson from 'parse-json';
import { useSelector, useDispatch } from 'react-redux';
import { createClient } from '@supabase/supabase-js'
import './MultiSelectBenef.css';
import { saveNpBenefSel } from '../../actions/plans.actions';

// Información de la base de datos
const supabaseUrl = 'https://qeubfsxlcvapzvjihzep.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDMyNDU4NCwiZXhwIjoxOTM1OTAwNTg0fQ.l9ZzKLUoPFsMWMCismH6RkXsEzBiSrDMylGB9V_HHjI"
const supabase = createClient(supabaseUrl, supabaseKey)

export default function MultiSelectBenef() {
  let dispatch = useDispatch();

  // Estado donde voy a guardar los beneficios traidos desde la base
  // de datos para poner en el selector.
  // [{ "id_benefit": 1, "benefit_description": "Internación Gratuita" },{}]
  let [benefSupa, setBenefSupa] = useState([]);

  // Función que se trae los beneficios de la base de datos
  // y los cuarda en el estado local 'benefSupa'.
  async function getBenefAsync() {
    // let { data: benefits, error } = await supabase <- Ver manejo de errores
    let { data: benefits } = await supabase
      .from('benefits')
      .select('*')
    console.log(benefits)
    //[{"id_benefit": 1, "benefit_description": "Internación Gratuita"},{},{}]
    setBenefSupa(benefits)
  }

  // Carga los beneficios a usar en el selector
  useEffect(() => {
    getBenefAsync()
  }, [])

  // -------------------------------------------------------------

  // Estado de beneficios seleccionados (descripción)
  let [sbenef, setSbenef] = useState([]); //[{id:'1',desc:'Internación Gratuita'},{}]

  // Estado donde voy a guardar el arreglo con los ids de los  
  // beneficios preexistentes seleccionados para el nuevo plan.
  let [benefsSelectedId, setBenefsSelectedId] = useState([])  // [id1,id2]

  // Quita un beneficio de la selección 
  function removeItem(id) {
    let newIds = benefsSelectedId.filter(e => e != id);
    setBenefsSelectedId(newIds);
    let newSelected = sbenef.filter(e => e.id != id);
    setSbenef(newSelected);
    return;
  }

  // Cuando selecciona en el desplegable lo guarda/saca del estado local
  function handleSelect(e) {
    e.preventDefault();
    let itemP = e.target.value; //{id:1,desc:Internación Gratuita}

    // console.log(`value: ${itemP}`);
    let obj = parseJson(itemP);
    // console.log(obj, typeof (obj));
    let selection = obj[0];
    // console.log(`seleccionaste: ${selection.id}, ${selection.desc}`);

    let selectedid = parseInt(selection.id)

    let hasItem = benefsSelectedId.includes(parseInt(selection.id));
    // console.log(hasItem);
    if (!hasItem) {
      setBenefsSelectedId([...benefsSelectedId, selectedid]);
      setSbenef([...sbenef, selection]);
    } else {
      // console.log('entré acá');
      // console.log(selectedid,selection);
      removeItem(selection.id);
    }
    return;
  }

  //Cada vez que cambie un beneficio actualiza
  useEffect(() => {
    // console.log('entré acá 2');
    // console.log(sbenef);
  }, [sbenef]);
  useEffect(() => {
    // console.log('entré acá 2');
    // console.log(benefsSelectedId);
  }, [benefsSelectedId]);

  // Cuando hace click en el botón lo saca
  function handleClick(e) {
    // console.log('entré acá 3');
    let itm = e.target.value;//{id:1,desc:Internación Gratuita}
    removeItem(itm);
    console.log(`sacado ${itm}`);
    return;
  }

  //Cada vez que cambie un beneficio guarda el estado en el store
  useEffect(() => {
    dispatch(saveNpBenefSel(benefsSelectedId));
    // console.log(sbenef)
  }, [benefsSelectedId, dispatch]);

  // Guarda en sended el estado de envio del formulario
  const sended = useSelector(state => state.sended);

  // Cuando presione guardar el formulario, sended pasa a "true"
  // se dispara esto que limpia el estado local de beneficios seleccionados.
  useEffect(() => {
    if (sended) {
      setBenefsSelectedId([]);
      setSbenef([]);
    }
  }, [sended, dispatch]);

  return (
    <div className="selbenefdiv">
      <>
        <select
          name="beneficios"
          placeholder="Beneficios..."
          className="multselbenef"
          value={''}
          onChange={handleSelect}
        >

          <option defaultValue>Beneficios</option>
          {benefSupa && benefSupa.map((benef, index) => (
            <option
              key={index}
              value={`[{"id":"${benef.id_benefit}","desc":"${benef.benefit_description}"}]`}
            >{benef.benefit_description}</option>
          ))}
        </select>
        <div className="benefcont">
          {sbenef.map((item, index) => (
            <button className="selbenefbtn" value={item.id}
              onClick={handleClick} key={index}>
              {item.desc}
            </button>
          ))}
        </div>
      </>
    </div>
  )
}
