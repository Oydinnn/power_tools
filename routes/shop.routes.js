const {
  createShop,
  getShop,
  findByName,
  getOneShop,
  deleteShop,
  updateShop,
} = require("../controllers/shop.controller");

const router = require("express").Router();

router.post("/", createShop);
router.get("/", getShop);
router.get("/find", findByName);
router.get("/:id", getOneShop);
router.delete("/:id", deleteShop);
router.put("/:id", updateShop);  
  
module.exports = router;
