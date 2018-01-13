const Router = require('koa-router');
const login = require('../controller/login');

const router = new Router();
const testRouter = new Router({ prefix: '/login' });
testRouter.post('/', login);
router.use(testRouter.routes());
module.exports = router;
