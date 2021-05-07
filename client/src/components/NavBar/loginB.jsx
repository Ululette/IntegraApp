import React from "react"
import styles from "../NavBar/navBar.module.css"
import {NavLink} from "react-router-dom"

const Logb = ()=>{
  return (
    <NavLink to ="/login" className={styles.navL}>
      <button className={styles.logB}>Soy socio</button>
    </NavLink>
  )
}
export default Logb