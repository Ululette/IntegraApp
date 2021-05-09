import React from "react"
import styles from "../NavBar/navBar.module.css"
import {IconButton} from "@material-ui/core/"
import logoNav from "../../assests/logoNav.png"
import Logb from "./loginB"
import {NavLink} from "react-router-dom"

const NavBar = ()=>{
  return (
  <nav position="static" className={styles.bar}>
     <NavLink to= "/">
      <IconButton edge="start"  color="inherit" aria-label="menu">
        <img className={styles.img} src= {logoNav} alt="Logo" />
      </IconButton>
      </NavLink>

      <Logb/>
  </nav>
  )
}
export default NavBar