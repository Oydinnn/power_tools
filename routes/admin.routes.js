const {
  createAdmin,
  
} = require("../controllers/admin.controller");

const router = require("express").Router();

router.post("/", createAdmin);


module.exports = router;
