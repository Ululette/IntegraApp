import React, { useState, useEffect } from 'react';
import './InfoPlanCard.css';


export default function InfoPlanCard({name,price,benefits}) {
  // console.log(benefits);
  // console.log(benefits[0]);
  // console.log(benefits[1]);

  // const plans = useSelector((state) => state.allPlans);
  // const dispatch = useDispatch();
  // dispatch(getPlans());

  // let [planInfo, setNewplan] = useState(null);
 
      

  return (
    <div className="pi_card">
      <h3 className="pi_card_title">{name}</h3 >
      <ul className="liststyled">
        {benefits && benefits.map( (benef,index) => 
          <li className="pi_card_benef_li" key={index} >{benef}</li>
        )}        
      </ul>
      <h3 className="pi_card_price">Importe: $ {price}</h3>
    </div>
  )
}

