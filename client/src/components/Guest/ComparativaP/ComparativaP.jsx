import React, { useState, useEffect } from "react";
import InfoPlanCard from "./InfoPlanCard";
import "./ComparativaP.css";
import family from "../../../assets/images/family.png";
import fondo from "../../../assets/images/fondo1.png";
import supabase from "../../../supabase.config";
import AcccessibleTable from "./AcccessibleTable";
//path='/ComparativaP'

export default function ComparativaP() {
  let [plans, setPlans] = useState([]);

  async function getPlans() {
    const { data: plans } = await supabase
      .from("plans")
      .select("id, name, price, active, benefits (id,title, description)");
    setPlans(
      plans.sort(function (a, b) {
        return a.id - b.id;
      })
    );
  }

  useEffect(() => {
    getPlans();
  }, []);

  useEffect(() => {
    // if (plans.length) {
    //   console.log(plans)
    // }
  }, [plans]);

  return (
    <div className="comp_page">
      <div className="comp_header">
        <h1 className=" comp_header_title">Tenemos un plan para vos</h1>
        <img
          className="comp_header_image"
          src={family}
          width="100"
          height="100"
          alt=""
        />
      </div>
      <div className="container_img">
        <img src={fondo} className="fondotop" alt="eachplan" />
      </div>
      <div className="back-definer">
        <h3 className="comp_sub_header_title">
          Todos los planes incluyen el básico:
        </h3>
        <div className="comp_cont">
          {plans.length && (
            <InfoPlanCard
              name={plans[0].name}
              price={plans[0].price}
              benefits={plans[0].benefits.map(
                (benefobj) => benefobj.description
              )}
            />
          )}
        </div>
        <AcccessibleTable
          plans={plans.filter((plan) => plan.active === true)}
        />
      </div>
    </div>
  );
}
