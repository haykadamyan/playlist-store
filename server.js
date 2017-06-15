const http = require('http');
const Koa = require('koa');
const render = require('koa-ejs');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('name/:name/:last', function(ctx){
    ctx.body = "WE ARE SOLID";
    console.log(ctx.req.params);
});

app.use(router.routes()).use(router.allowedMethods());
console.log("Server running on localhost: 3000");
app.listen(3000);