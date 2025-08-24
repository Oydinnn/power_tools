const router = require("express").Router()
const adminRouter = require("./admin.routes");
const districtRouter = require('./district.routes');
const toolRouter = require('./tool.routes')


router.use('/admin', adminRouter);
router.use('/district', districtRouter);
router.use('/tool', toolRouter);


module.exports = router;
