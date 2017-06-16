'use strict';

const http = require('http');
const Koa = require('koa');
const render = require('koa-ejs');
const Router = require('koa-router');
const views = require('koa-views');
const path = require('path');

const app = new Koa();
const router = new Router();


app.use(views(path.join(__dirname, '/view'), { extension: 'ejs' }));

const payment = {
    seller: "Bobo",
    playlist: "Rock-playlist",
    purchase: "0.99$"
};

router.get('/', function(ctx){
    ctx.body = "SOLID"
});


router.get('/payment', async function(ctx){
    await ctx.render('payment', {payment: payment})
});

app.use(router.routes()).use(router.allowedMethods());

module.exports = app;
