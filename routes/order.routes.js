const {
  createOrder,
  getOrder,
  findByName,
  getOneOrder,
  deleteOrder,
  updateOrder,
} = require("../controllers/order.controller");

const router = require("express").Router();

router.post("/", createOrder);
router.get("/", getOrder);
router.get("/find", findByName);
router.get("/:id", getOneOrder);
router.delete("/:id", deleteOrder);
router.put("/:id", updateOrder);  
  
module.exports = router;
