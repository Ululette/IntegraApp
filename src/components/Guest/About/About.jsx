import React from 'react';
import './About.css'
import Melina from './Images/Melina.png'
import alan from './Images/alan.jpg'
import edith from './Images/edith.png'
import juli from './Images/juli.jpg'
import leon from './Images/leon.jpg'
import lucho from './Images/lucho.png'
import nahu from './Images/nahu.jpg'
import sebas from './Images/sebas.jpg'
import linked from './Images/linked.png'
import github from './Images/github.png'


export default function About(){

return (
<div className="row">

  <div className="col-sm-6">
 
    <div className="ih-item circle colored effect3 left_to_right">
        <div className="img"><img src={Melina} alt="img"/></div>
        <div className="info">
          <h3>Melina Zellweger</h3>
          <a href="https://www.linkedin.com/in/melina-zellweger-/">
         <img alt="Linkedin" src={linked}
         width="150" height="70"/>
           </a>
           <a href="https://github.com/zmelina99">
         <img alt="Github" src={github}
         width="150" height="70"/>
           </a>
        </div></div> 
 
  </div>
  
  <div className="col-sm-6">
 
    <div className="ih-item circle colored effect3 left_to_right">
        <div className="img"><img src={edith} alt="img"/></div>
        <div className="info">
          <h3>Edith Losada</h3>
          <a href="https://www.linkedin.com/in/edithlosada/">
         <img alt="Linkedin" src={linked}
         width="150" height="70"/>
           </a>
           <a href="https://github.com/Ululette/">
         <img alt="Github" src="./Images/github.png"
         width="150" height="70"/>
           </a>
        </div></div>
 
  </div>
  
  <div className="col-sm-6">
 
    <div className="ih-item circle colored effect3 left_to_right">
        <div className="img"><img src={juli} alt="img"/></div>
        <div className="info">
          <h3>Julian Vazquez</h3>
          <a href="https://www.linkedin.com/in/julianvazquezdev/">
         <img alt="Linkedin" src={linked}
         width="150" height="70"/>
           </a>
           <a href="https://github.com/jumjules42">
         <img alt="Github" src="./Images/github.png"
         width="150" height="70"/>
           </a>
        </div></div>
 
  </div>
  
  <div className="col-sm-6">
 
    <div className="ih-item circle colored effect3 left_to_right">
        <div className="img"><img src={nahu} alt="img"/></div>
        <div className="info">
          <h3>Nahuel Gomez</h3>
          <a href="https://www.linkedin.com/in/nelgoez/">
         <img alt="Linkedin" src={linked}
         width="150" height="70"/>
           </a>
           <a href="https://github.com/nelgoez">
         <img alt="Github" src="./Images/github.png"
         width="150" height="70"/>
           </a>
        </div></div>
 
  </div>
  
  <div className="col-sm-6">
 
    <div className="ih-item circle colored effect3 left_to_right">
        <div className="img"><img src={leon} alt="img"/></div>
        <div className="info">
          <h3>Leon Vila</h3>
          <a href="https://www.linkedin.com/in/leonvila/">
         <img alt="Linkedin" src={linked}
         width="150" height="70"/>
           </a>
           <a href="https://github.com/leonvila98">
         <img alt="Github" src="./Images/github.png"
         width="150" height="70"/>
           </a>
        </div></div>
 
  </div>
  
  <div className="col-sm-6">
 
    <div className="ih-item circle colored effect3 left_to_right">
        <div className="img"><img src={alan} alt="img"/></div>
        <div className="info">
          <h3>Alan Diaz</h3>
          <a href="https://www.linkedin.com/in/alan-diaz-7dev/">
         <img alt="Linkedin" src={linked}
         width="150" height="70"/>
           </a>
           <a href="https://github.com/Aksaashoka">
         <img alt="Github" src="./Images/github.png"
         width="150" height="70"/>
           </a>        
           </div></div>
 
  </div>
  
  <div className="col-sm-6">
 
    <div className="ih-item circle colored effect3 left_to_right">
        <div className="img"><img src={sebas} alt="img"/></div>
        <div className="info">
          <h3>Sebastian Sanchez</h3>
          <a href="https://www.linkedin.com/in/sebastiansanchezisame/">
         <img alt="Linkedin" src={linked}
         width="150" height="70"/>
           </a>
           <a href="https://github.com/SebaSanchezI">
         <img alt="Github" src="./Images/github.png"
         width="150" height="70"/>
           </a>           </div></div>
           </div>    
  <div className="col-sm-6">
 
 <div className="ih-item circle colored effect3 left_to_right">
     <div className="img"><img src={lucho} alt="img"/></div>
     <div className="info">
       <h3>Luciano De Pasqua</h3>
       <a href="https://www.linkedin.com/in/lucianodepasqua/">
      <img alt="Linkedin" src={linked}
      width="150" height="70"/>
        </a>
        <a href="https://github.com/ldepasqua">
      <img alt="Github" src="./Images/github.png"
      width="150" height="70"/>
        </a>           </div></div> 
 
 </div> 
 </div> 
)
 }