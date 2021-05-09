import React, { useState, useEffect } from 'react';
import InfoCard from './InfoCard';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import * as Styles from './InfoPlans.module.css'
import supabase from '../../supabase.config'


// const plans = [
//   {
//     title: 'Super Plan',
//     sub: 'Un super Pan de Salud',
//     cover: 'Cobertura esencial sin copago. Consultorio médico virtual.',
//     id: 1
//   },
//   {
//     title: 'Hiper Plan',
//     sub: 'Un Hiper Pan de Salud',
//     cover: "Cartilla abierta con reintegros. Habitación individual. 100% cobertura en ortodoncia. Accedés a nuestros programas preventivos. Cobertura en países limítrofes.",
//     id: 2
//   },
//   {
//     title: 'Mega Plan',
//     sub: 'Un Mega Pan de Salud',
//     cover: "Cartilla con prestadores de mayor prestigio a nivel nacional, reintegros superadores y mayor cobertura en odontología, óptica, kinesiología y fisioterapia.",
//     id: 3
//   },
//   {
//     title: 'Ultra Plan',
//     sub: 'Un Ultra Pan de Salud',
//     cover: 'El plan de salud más completo, con importantes descuentos en medicamentos, beneficios adicionales exclusivos y reintegros superadores.',
//     id: 4
//   },
//   {
//     title: 'DD Plan',
//     sub: 'Pan de Salud Doble D',
//     cover: 'El plan de salud más completo, con importantes descuentos en medicamentos. Accedés a nuestros programas preventivos. Cobertura en países limítrofes.',
//     id: 5
//   }
// ]


export default function InfoPlanes() {

  const [fetchPlans, setFetchPlans] = useState([])

  const fetch = async () => {
    let { data: plans, error } = await supabase.from("plans").select(
      `description,
      price,
      benefits (
        benefit_description
        )`
    );
    console.error(error);
    setFetchPlans(plans);
  }


  useEffect(() => {
    fetch()
  }, []);


  const [currCard, setCurrCard] = useState(0)

  const leftPlan = fetchPlans[currCard > 1 ? currCard - 1 : fetchPlans.length - 1]
  const plan = fetchPlans[currCard]
  const rightPlan = fetchPlans[currCard < fetchPlans.length - 1 ? currCard + 1 : 0]

  const forward = () => {
    currCard < fetchPlans.length - 1 ? setCurrCard(currCard + 1) : setCurrCard(0);
  }


  const back = () => {
    currCard > 0 ? setCurrCard(currCard - 1) : setCurrCard(fetchPlans.length - 1);
  }


  const handleKeyDown = (e) => {
    if (e.keyCode === 39) {
      forward();
    }
    if (e.keyCode === 37) {
      back();
    }
  };

  // const move = setTimeout
  // const stop = clearTimeout

  useEffect(() => {

    // move(forward, 1500)

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const showData = () => {
    if (fetchPlans.length) {
      return (
        <div className={Styles.carousel} >
          <div  className={Styles.card}>
            <div className={Styles.left} onClick={back}>
              <ArrowBackIosIcon />
            </div>
            <InfoCard
            key={leftPlan.id_plan}
            className={Styles.center} plan={leftPlan}
            />
            <InfoCard
            key={plan.id_plan}
            className={Styles.center}
            plan={plan}
            />
            <InfoCard
            key={rightPlan.id_plan}
            className={Styles.center}
            plan={rightPlan} />
            <div className={Styles.right} onClick={forward}>
              <ArrowForwardIosIcon />
            </div>
          </div>
        </div>
      )
    } else {
      return <p>Loading...</p>
    }
  }

  return (
    <div>
      {showData()}
    </div>
  )
}
