const router = require("express").Router();
const adminRouter = require("./admin.routes");
const districtRouter = require('./district.routes');
const toolRouter = require('./tool.routes');
const userRouter = require('./user.routes');
const shopRouter = require('./shop.routes');
const shopToolRouter = require('./shop_tool.routes');
const OrderRouter = require('./order.routes');



router.use('/admin', adminRouter);
router.use('/district', districtRouter);
router.use('/tool', toolRouter);
router.use('/user', userRouter);
router.use('/shop', shopRouter);
router.use('/shop_tool', shopToolRouter);
router.use('/order', OrderRouter);



module.exports = router;
