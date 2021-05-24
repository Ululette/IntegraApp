import React, { useEffect, useState } from "react";
import axios from "axios";

import supabase from "../../../supabase.config";

export default function PaymentButton({ product }) {
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    // luego de montarse el componente, le pedimos al backend el preferenceId

    const getPreferenceId = async () => {
      const res = await axios.post(
        `https://mercadopago-integra.herokuapp.com/api/orders`,
        {
          userId: product.partner_dni,
          productId: 3,
          productName: product.concept,
          productPrice: product.amount,
          productQuantity: 1,
        }
      );

      setPreferenceId(res.data.preferenceId);
    };

    getPreferenceId();
  }, []);

  useEffect(() => {
    if (preferenceId) {
      // con el preferenceId en mano, inyectamos el script de mercadoPago
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.setAttribute("data-preference-id", preferenceId);
      const form = document.getElementById(product.id);
      form.appendChild(script);

      const updatePreferenceId = async () => {
        const { data, error } = await supabase
          .from("payments")
          .update({ preference_id: preferenceId })
          .eq("id", product.id);
      };

      updatePreferenceId();
    }
  }, [preferenceId]);

  return <form id={product.id} method="GET" />;
}
