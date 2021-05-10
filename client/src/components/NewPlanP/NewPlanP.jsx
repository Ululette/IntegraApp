import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MultiSelectBenef from './MultiSelectBenef';
import NewBenef from './NewBenef';
import { saveNpBenefSel, sendedNpForm } from '../../actions/actions';
import './NewPlanP.css';
// import axios from 'axios';
// import AdminNav from ''
// Información de la base de datos
import supabase from '../../supabase.config';

//path='/admin/NewPlanP'
export default function NewPlanP() {
    const dispatch = useDispatch();

    // CAMBIAR A OBJETO
    let [pname, setPname] = useState('');
    let [price, setPrice] = useState('');

    let handleChange = (e) => {
        let item = e.target.name;
        switch (item) {
            case 'pname':
                setPname(e.target.value);
                break;
            case 'price':
                setPrice(e.target.value);
                break;
            default:
                break;
        }
    };

    let sbenefsids = useSelector((state) => state.npbensel);
    let nbenefs = useSelector((state) => state.addedbenefs);
    let sended = useSelector((state) => state.sended);
    let [newplan, setNewplan] = useState(null);

    // [{ "id_benefit": 1, "benefit_description": "Internación Gratuita" },{}]

    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sendedNpForm(true)); // state.sended = true
        e.target.reset();
    };

    useEffect(() => {
        console.log(sbenefsids);
    }, [sbenefsids]);

    // Cuando presione guardar el formulario, sended pasa a "true"
    // se dispara esto que limpia el estado local de beneficios seleccionados.
    useEffect(() => {
        if (sended) {
            let benefits = sbenefsids;
            if (nbenefs.length !== 0) {
                benefits = sbenefsids.concat(nbenefs);
            }
            // let Plan = { description: pname, price, benefits, createdAt: "2021-05-07T19:12:24+00:00", modifiedAt: "2021-05-07T19:12:24+00:00" };
            let Plan = { description: pname, price, benefits };
            // console.log(Plan);
            setNewplan(Plan);
        }
    }, [sended, pname, price, sbenefsids, nbenefs, dispatch]);

    // Cuando se carga el nuevo plan lo postea y luego limpia
    useEffect(() => {
        if (newplan) {
            async function postPlan(newplan) {
                console.log(newplan); // <---
                //----------------------------
                let { data: plan, error: errorPlan } = await supabase
                    .from('plans')
                    .insert([
                        {
                            id_plan: 105,
                            description: newplan.description,
                            price: newplan.price,
                        },
                    ]);
                //----------------------------
                console.log(`este es el :`, plan);

                // Acá va el post a la base de datos
                // CREAR NUEVO PLAN

                // CREAR NUEVOS BENEFICIOS

                // VINCULAR BENEFICIOS PARA ESE PLAN EN LA TABLA INTERMEDIA

                setPname('');
                setPrice('');
                setNewplan(null);
                dispatch(saveNpBenefSel([])); // state.npbensel
                // dispatch(addNpBen([])); // state.addedbenefs
                dispatch(sendedNpForm(false)); // state.sended
                return;
            }

            postPlan(newplan);
        }
    }, [newplan, dispatch]);

    return (
        <div className='np_page'>
            {/* <AdminNav/> */}
            <h3>Esta es la página del administrador</h3>
            <div className='np_form'>
                <h4> Beneficios del nuevo plan</h4>
                <hr className='sep1' />
                <hr className='sep2' />
                <form
                    method='post'
                    action='http://localhost:300'
                    className='np_inputArea'
                    onSubmit={handleSubmit}
                >
                    <div className='np_firstline'>
                        <input
                            id='input_name'
                            type='text'
                            className='np_nameinput'
                            value={pname}
                            name='pname'
                            placeholder='Nombre del plan'
                            onChange={handleChange}
                        ></input>
                        <input
                            id='input_name'
                            type='text'
                            className='np_priceinput'
                            value={price}
                            name='price'
                            placeholder='Importe mensual'
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div className='np_selectArea'>
                        <MultiSelectBenef />
                        <NewBenef />
                    </div>
                    <div className='np_button-area'>
                        <button className='np_button' type='submit'>
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
