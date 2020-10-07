const express = require("express");

const TripCtrl = require("../controllers/trip-ctrl");

const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/trip", authMiddleware, TripCtrl.create);
router.get("/trips", authMiddleware, TripCtrl.getAll);

module.exports = router;
