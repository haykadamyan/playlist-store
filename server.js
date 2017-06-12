const http = require('http');
const Koa = require('koa');
const render = require('koa-ejs');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', function(ctx){
    ctx.body = "SOLID"
});

app.use(router.routes()).use(router.allowedMethods());
console.log("Server running on localhost: 3000")
app.listen(3000);
