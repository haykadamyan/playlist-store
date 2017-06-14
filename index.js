'use strict';

const http = require('http');
const path = require('path');
const Koa = require('koa');
const render = require('koa-ejs');
const Router = require('koa-router');
const views = require('koa-views');
const app = module.exports = new Koa();
const router = new Router();

app.use(views(path.join(__dirname, '/app/view'), { extension: 'ejs' }));
router.get('/playList', function(ctx){
    await ctx.render('/playList');
    //ctx.body = "<h1>I am work with ctx</h1>";
});
app.use(router.routes()).use(router.allowedMethods());
console.log("Server running on localhost: 3000");
app.listen(3000);