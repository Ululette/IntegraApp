import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './NewBenef.css';
import { addNpBen } from '../../../../actions/plans.actions';

export default function NewBenef() {
    let dispatch = useDispatch();

    let [newbenef, setNewbenef] = useState('');
    let [newbenefs, setNewbenefs] = useState([]);

    let addedben = useSelector((state) => state.addedbenefs);
    let sended = useSelector((state) => state.sended);

    // Cuando envía el formulario manda el arreglo de
    // nuevos beneficios al store.
    useEffect(() => {
        if (sended) {
            dispatch(addNpBen(newbenefs));
            //eslint-disable-next-line
            async function postNewBenef(newplan) {}
            //eslint-disable-next-line
            newbenef.map((e) => {
                //   //----------------------------
                //   let { data: benefits, error: errorPlan } = await supabase
                //   .from('benefits')
                //   .insert([
                //     {
                //       id_benefit: 11,
                //       benefit_description: newplan.description,
                //       price: newplan.price,
                //     },
                //   ]);
                // //----------------------------
            });
        }
        //eslint-disable-next-line
    }, [sended, newbenefs, dispatch]);

    // Una vez que el store recibe los beneficios limpia el input y arreglo.
    useEffect(() => {
        if (addedben) {
            setNewbenef('');
            setNewbenefs([]);
        }
    }, [addedben]);

    function handleChange(e) {
        setNewbenef(e.target.value);
    }

    // Función que agrega un beneficio a la selección
    function handleClickPlus(e) {
        if (newbenef) {
            setNewbenefs([...newbenefs, newbenef]); //ojo
            setNewbenef('');
            console.log(`agregué ${newbenef}`);
        }
        return;
    }

    // Función que quita un beneficio de la selección
    function removeItem(item) {
        let newItems = newbenefs.filter((e) => e !== item);
        setNewbenefs(newItems);
        return;
    }

    // Cuando hace click en el botón lo saca
    function handleDelClick(e) {
        e.preventDefault();
        let itm = e.target.value;
        console.log(`saqué ${itm}`);
        removeItem(itm);
        return;
    }

    return (
        <div className='np_ben_form'>
            <div className='np_nbcont'>
                <input
                    id='input_name'
                    type='text'
                    className='np_a_input'
                    value={newbenef}
                    name='newbenef'
                    placeholder='Nuevo beneficio'
                    onChange={handleChange}
                ></input>
                <input
                    className='npb_plus'
                    type='button'
                    onClick={handleClickPlus}
                    value={'+'}
                />
            </div>
            <div className='np_ben_cont'>
                {newbenefs &&
                    newbenefs.map((item, index) => (
                        <button
                            className='selbenbtn'
                            value={item}
                            onClick={handleDelClick}
                            key={index}
                        >
                            {item}
                        </button>
                    ))}
            </div>
        </div>
    );
}
