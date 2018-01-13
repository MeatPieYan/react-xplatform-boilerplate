
const za = require('../controller');
const Router = require('koa-router');

const router = new Router();

router.post('/zaPay', za.pay);

router.use(router.routes());

module.exports = router;
