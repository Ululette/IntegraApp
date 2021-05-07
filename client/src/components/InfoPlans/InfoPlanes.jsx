import React, { useState } from 'react';
import InfoCard from './InfoCard';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import * as Styles from './InfoPlans.module.css'

const plans = [
  {
    title: 'Super Plan',
    sub: 'Un super Pan de Salud',
    cover: 'Cobertura esencial sin copago. Consultorio médico virtual.',
    id: 1
  },
  {
    title: 'Hiper Plan',
    sub: 'Un Hiper Pan de Salud',
    cover: "Cartilla abierta con reintegros. Habitación individual. 100% cobertura en ortodoncia. Accedés a nuestros programas preventivos. Cobertura en países limítrofes.",
    id: 2
  },
  {
    title: 'Mega Plan',
    sub: 'Un Mega Pan de Salud',
    cover: "Cartilla con prestadores de mayor prestigio a nivel nacional, reintegros superadores y mayor cobertura en odontología, óptica, kinesiología y fisioterapia.",
    id: 3
  },
  {
    title: 'Ultra Plan',
    sub: 'Un Ultra Pan de Salud',
    cover: 'El plan de salud más completo, con importantes descuentos en medicamentos, beneficios adicionales exclusivos y reintegros superadores.',
    id: 4
  },
  {
    title: 'DD Plan',
    sub: 'Pan de Salud Doble D',
    cover: 'El plan de salud más completo, con importantes descuentos en medicamentos. Accedés a nuestros programas preventivos. Cobertura en países limítrofes.',
    id: 5
  }
]


export default function InfoPlanes() {


  const [currCard, setCurrCard] = useState(0)
  const leftPlan = plans[currCard > 1 ? currCard - 1 : plans.length - 1]
  const plan = plans[currCard]
  const rightPlan = plans[currCard < plans.length - 1 ? currCard + 1 : 0]

  const forward = () => (currCard < plans.length - 1 ? setCurrCard(currCard + 1) : setCurrCard(0))
  const back = () => (currCard > 0 ? setCurrCard(currCard - 1) : setCurrCard(plans.length - 1))

  return (
    <div className={Styles.carousel} >
      <div className={Styles.card}>
        <div className={Styles.left} onClick={back}>
          <ArrowBackIosIcon />
        </div>
        <InfoCard className={Styles.center} plan={leftPlan} />
        <InfoCard className={Styles.center} plan={plan} />
        <InfoCard className={Styles.center} plan={rightPlan} />
        <div className={Styles.right} onClick={forward}>
          <ArrowForwardIosIcon />
        </div>
      </div>
    </div>
  )
}
