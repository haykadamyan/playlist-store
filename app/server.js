'use strict';

const http = require('http');
const Koa = require('koa');
const render = require('koa-ejs');
const Router = require('koa-router');
const views = require('koa-views');

const app = new Koa();
const router = new Router();

router.get('/', function(ctx){
    ctx.body = "SOLID"
});


router.get('/create-playlist', function(ctx){
    app.use(views(path.join(__dirname, '/views'), { extension: 'ejs' }));
});

app.use(router.routes()).use(router.allowedMethods());

module.exports = app;
