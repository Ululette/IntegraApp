import React, { useState, useEffect } from 'react';
import InfoPlanCard from './InfoPlanCard';
import './ComparativaP.css';
import family from '../../../assets/images/family.png';
import fondo from '../../../assets/images/fondo1.png';
import supabase from '../../../supabase.config';
import AcccessibleTable from './AcccessibleTable';

export default function ComparativaP() {
  let [plans, setPlans] = useState(null);

  // Función que se trae ordenadamente los planes de la base de datos
  async function getPlans() {
    const { data: plans } = await supabase
      .from('plans')
      .select('id, name, price, benefits (id,title, description)');

    // Ordena el arreglo de planes por nombre de menor a mayor
    // ...Podría ordenarse por nombre o por precio
    plans.sort(function (a, b) {
      //parseInt(a.name.trim().slice(7))) - parseInt(a.name.trim().slice(7)))
      return parseInt(a.name.trim().slice(7)) - parseInt(b.name.trim().slice(7));
    })

    // console.log(plans)
    setPlans(plans);
  }

  useEffect(() => {
    getPlans();
  }, []);

  return (
    <div className='comp_page'>
      <div className='comp_header'>
        <h1 className=' comp_header_title'>Tenemos un plan para vos</h1>
        <img
          className='comp_header_image'
          src={family}
          width='100'
          height='100'
          alt=''
        />
      </div>
      <div className='container_img'>
        <img src={fondo} className='fondotop' alt='eachplan' />
      </div>
      {plans && (<div className='back-definer'>
        <h3 className='comp_sub_header_title'>
          Todos los planes incluyen el básico:
        </h3>
        <div className='comp_cont'>
          <InfoPlanCard
            name={plans[0].name}
            price={plans[0].price}
            benefits={plans[0].benefits.map(
              benefobj => benefobj.description
            )}
          />
        </div>
        <a href='/#contact'>
          <button className="buttonRegister">Asociate</button>
        </a>
        <AcccessibleTable plans={plans} />
      </div>)}
    </div>
  );
}
