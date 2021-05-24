const { Router } = require("express");
const { getId, getIpn } = require("../controllers/order");

const router = Router();

router.post("/api/orders", getId);

// router.get("/api/mercadopago/ipn", getIpn); // SOLO FUNCIONA EN PRODUCCIÓN VER FUNCIÓN

module.exports = router;
