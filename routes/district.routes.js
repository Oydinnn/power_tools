const {
  createDistrict,
  getDistrict,
  findByName,
  getOneDistrict,
  deleteDistrict,
  updateDistrict,
} = require("../controllers/district.controler");

const router = require("express").Router();

router.post("/", createDistrict);
router.get("/", getDistrict);
router.get("/find", findByName);
router.get("/:id", getOneDistrict);
router.delete("/:id", deleteDistrict);
router.put("/:id", updateDistrict);  
  
module.exports = router;
