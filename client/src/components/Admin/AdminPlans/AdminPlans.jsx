import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPlans, getBenefits } from "../../../actions/getter.action.js";
import { CircularProgress } from "@material-ui/core";
import "firebase/auth";
import styles from "./AdminPlans.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Table

import PlansTable from "./PlansTable.jsx";

// Supa

import supabase from "../../../supabase.config";

// Pop ups

import ModifyPlan from "./ModifyPlan.jsx";
import PlanDetails from "./PlanDetails.jsx";
import DeletePlan from "./DeletePlan.jsx";
import PlanState from "./PlanState.jsx";

function AdminPlans({ firebase }) {
  const allPlans = useSelector((state) => state.plans.allPlans);
  const allBenefits = useSelector((state) => state.plans.allBenefits);
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlans());
    dispatch(getBenefits());
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    prueba();
  }, [allPlans]);

  const [openModify, setOpenModify] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [deletePlan, setDeletePlan] = useState({
    id_plan: "",
    name: "",
    price: "",
    benefits: [],
  });
  const [planDetail, setPlanDetail] = useState({
    id_plan: "",
    name: "",
    price: "",
    benefits: [],
  });
  const [modalPlan, setModalPlan] = useState({
    id_plan: "",
    name: "",
    price: "",
    benefits: [],
  });
  const [planState, setPlanState] = useState({
    id_plan: "",
    active: false,
  });

  const [password, setPassword] = useState({ password: "", error: false });

  const [plansForTable, setPlansForTable] = useState([]);

  const prueba = async () => {
    const plans = [];

    for (const plan of allPlans) {
      const { data, error, count } = await supabase
        .from("partners")
        .select("plan_id", { count: "exact" })
        .eq("plan_id", plan.id);

      console.log(count);
      plans.push({
        id: "name",
        id_plan: plan.id,
        name: plan.name,
        price: plan.price,
        benefits: plan.benefits,
        description: plan.description,
        active: plan.active,
        users: count,
      });
    }
    setPlansForTable(plans);
  };

  // Modals open

  const handleOpenModalModify = (plan) => {
    setModalPlan({
      id_plan: plan.id_plan,
      name: plan.name,
      price: plan.price,
      benefits: plan.benefits.map((benefit) => benefit.title),
    });
    setOpenModify(true);
  };

  const handleOpenModalDelete = (plan) => {
    setDeletePlan({
      id_plan: plan.id_plan,
      name: plan.name,
      price: plan.price,
      benefits: plan.benefits,
      users: plan.users,
    });
    setOpenDelete(true);
  };

  const handleOpenModalDetails = (plan) => {
    setPlanDetail({
      id_plan: plan.id_plan,
      name: plan.name,
      price: plan.price,
      benefits: plan.benefits,
    });
    setOpenDetails(true);
  };

  const handleOpenModalState = (plan) => {
    setPlanState({
      id_plan: plan.id_plan,
      active: plan.active,
    });
    setOpenState(true);
  };

  // Modals close

  const handleCloseModalModify = () => {
    setOpenModify(false);
  };

  const handleCloseModalDelete = () => {
    setPassword({ password: "", error: false });
    setOpenDelete(false);
  };

  const handleCloseModalDetails = () => {
    setOpenDetails(false);
  };

  const handleCloseModalState = () => {
    setOpenState(false);
  };

  // Modify Modal Field Changes

  const handleChangeModalModify = (e) => {
    setModalPlan({ ...modalPlan, [e.target.name]: e.target.value });
  };

  const handleAutoCompleteModify = (arrayOfStringBenefits) => {
    setModalPlan({ ...modalPlan, benefits: arrayOfStringBenefits });
  };

  // Submits

  const handleSubmitModify = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("plans")
      .update({ name: e.target[0].value, price: e.target[1].value })
      .eq("id", modalPlan.id_plan);
    handleCloseModalModify();
    MySwal.fire({
      title: "Se modificó el plan con exito!.",
      icon: "success",
    }).then(() => window.location.reload());
  };

  const handleSubmitDelete = async (e, id) => {
    console.log(id);
    e.preventDefault();
    try {
      let userData = JSON.parse(localStorage.getItem("userdata"));
      await firebase
        .auth()
        .signInWithEmailAndPassword(userData.email, e.target[0].value);
      setPassword({ password: "", error: false });
      const { data: deleteBenefits, error: errorBenefits } = await supabase
        .from("plans_benefits")
        .delete()
        .eq("plan_id", id);
      const { data: deletePlan, error: errorPlan } = await supabase
        .from("plans")
        .delete()
        .eq("id", id);
      handleCloseModalDelete();
      MySwal.fire({
        title: "Se elimino el plan con exito!.",
        icon: "success",
      }).then(() => window.location.reload());
    } catch (error) {
      setPassword({ password: "", error: true });
      handleCloseModalDelete();
      MySwal.fire({
        title: "Contraseña Incorrecta",
        icon: "error",
      });
    }
  };

  if (allPlans.length === 0 || plansForTable.length === 0)
    return <CircularProgress />;

  return (
    <div
      className={styles.container}
      style={{ filter: openModify || openDelete ? "blur(4px)" : "none" }} // PARA PONER EL FONDO BLURRY
    >
      <section className={styles.plansContainer}>
        <PlansTable
          plans={plansForTable}
          handleOpenModalModify={handleOpenModalModify}
          handleOpenModalDelete={handleOpenModalDelete}
          handleOpenModalDetails={handleOpenModalDetails}
          handleOpenModalState={handleOpenModalState}
        />
      </section>
      <ModifyPlan
        open={openModify}
        handleSubmit={handleSubmitModify}
        handleChangeModal={handleChangeModalModify}
        handleCloseModal={handleCloseModalModify}
        handleAutoComplete={handleAutoCompleteModify}
        modalPlan={modalPlan}
        allBenefits={allBenefits}
      />
      <DeletePlan
        open={openDelete}
        deletePlan={deletePlan}
        handleSubmit={handleSubmitDelete}
        handleCloseModal={handleCloseModalDelete}
        password={password}
      />
      <PlanDetails
        open={openDetails}
        planDetail={planDetail}
        handleCloseModal={handleCloseModalDetails}
        password={password}
      />
      <PlanState
        open={openState}
        planState={planState}
        handleCloseModal={handleCloseModalState}
      />
    </div>
  );
}

export default AdminPlans;
