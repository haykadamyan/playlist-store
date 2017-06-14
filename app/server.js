const http = require('http');
const path = require('path');
const Koa = require('koa');
const render = require('koa-ejs');
const Router = require('koa-router');
const views = require('koa-views');
const app = new Koa();
const router = new Router();

app.use(views(path.join(__dirname, '/views'), { extension: 'ejs' }));
router.get(function(ctx){
    ctx.render('/playlist', {});
    //ctx.body = "<h1>I am work with ctx</h1>";
});
app.use(router.routes()).use(router.allowedMethods());
console.log("Server running on localhost: 3000");
app.listen(3000);
