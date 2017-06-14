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


router.get('/', async function(ctx){
    await ctx.render('main');
});


router.get('/create-playlist', async function(ctx){
    await ctx.render('create-playlist')
});

app.use(router.routes()).use(router.allowedMethods());


module.exports = app;
