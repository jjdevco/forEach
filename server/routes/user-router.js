const router = require("express").Router();

const UserCtrl = require("../controllers/user-ctrl");

router.post("/auth/login", UserCtrl.login);
router.post("/auth/init", UserCtrl.init);

module.exports = router;
