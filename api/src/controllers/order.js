const { Orders } = require("../db");
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token:
    "TEST-3636200221287119-052020-39700f0bf40706db10a73136ccd4dca3-762577122",
});

function getId(req, res, next) {
  const order = Orders.create({
    // id: req.body.id,
    userId: req.body.userId,
    productId: req.body.productId,
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productQuantity: req.body.productQuantity,
  });

  Promise.all([order]).then(async (order) => {
    const response = await mercadopago.preferences.create({
      external_reference: order.id,
      // notification_url: `http://localhost:3001/api/mercadopago/ipn`, solo funciona en producción

      back_urls: {
        success: "http://localhost:3000/success",
        failure: "http://localhost:3000/error",
        pending: "http://localhost:3000/pending",
      },

      payment_methods: {
        excluded_payment_types: [{ id: "ticket" }], // me permite sacar pago en efectivo
      },

      items: [
        {
          title: order[0].dataValues.productName,
          unit_price: order[0].dataValues.productPrice,
          quantity: order[0].dataValues.productQuantity,
        },
      ],
    });

    res.json({ preferenceId: response.response.id });
  });
}

// SOLO FUNCIONA EN PRODUCCIÓN AL HABILITARSE COMO PARAMETRO DE LA PREFERENCE "notification_url"

// function getIpn(req, res, next) {
//   console.log("se ejecutó la notification");
//   if (req.params.type === "payment") {
//     // hay otros, nos importa solo payment
//     const paymentId = req.params.data.id; // ID de payment en MercadoPago

//     // Documentación de pagos: https://www.mercadopago.cl/developers/es/reference/payments/_payments_search/get/
//     mercadopago.payments.get(paymentId).then((error, payment) => {
//       // Obtenemos los datos del pago desde MP
//       const orderId = payment.external_reference; // esto es el ID de la orden que especificamos en la linea 15

//       // buscamos en nuestra db la orden
//       Orders.find(orderId).then((order) => {
//         if (order.totalPrice === payment.transaction_amount) {
//           // para que no se nos hagan los vivos XD
//           order.status = payment.status; // hay muchos estados, revisa https://www.mercadopago.cl/developers/es/reference/payments/_payments_search/get/

//           // comprobamos que sea "approved" y que no hayamos entregado ya el pedido... recuerda que "order" es algo que
//           // debes implementar tu, que podría tener un cambpo "delivered" para saber si ya hiciste entrega o no del
//           // pedido
//           if (order.status === "approved" && !order.delivered) {
//             deliverOrder(order); // función ficticia que debes implementar... es básicamente "entregar" el producto
//           }
//         }
//       });
//     });
//   }
// }

module.exports = {
  getId,
};
