const {
  createAdmin,
  getAdmin,
  findByName,
  getOneAdmin,
  deleteAdmin,
  updateadmin,
} = require("../controllers/admin.controller");

const router = require("express").Router();

router.post("/", createAdmin);
router.get("/", getAdmin);
router.get("/find", findByName);
router.get("/:id", getOneAdmin);
router.delete("/:id", deleteAdmin);
router.put("/:id", updateadmin);  
  
module.exports = router;
