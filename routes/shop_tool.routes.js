const {
  createShopTool,
  getShopTool,
  findByPrice,
  getOneShopTool,
  deleteShopTool,
  updateShopTool,
} = require("../controllers/shop_tools.controller.js");

const router = require("express").Router();

router.post("/", createShopTool);
router.get("/", getShopTool);
router.get("/find", findByPrice);
router.get("/:id", getOneShopTool);
router.delete("/:id", deleteShopTool);
router.put("/:id", updateShopTool);  
  
module.exports = router;
