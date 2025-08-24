const router = require("express").Router()
const adminRouter = require("./admin.routes");


router.use('/admin', adminRouter);



module.exports = router;
