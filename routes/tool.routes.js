const {
  createTool,
  getTool,
  findByName,
  getOneTool,
  deleteTool,
  updateTool,
} = require("../controllers/tool.controller");

const router = require("express").Router();

router.post("/", createTool);
router.get("/", getTool);
router.get("/find", findByName);
router.get("/:id", getOneTool);
router.delete("/:id", deleteTool);
router.put("/:id", updateTool);  
  
module.exports = router;
