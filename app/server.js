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

router.get('/', async function(ctx){
    await ctx.render('main');
});


router.get('/payment', async function(ctx) {
    await ctx.render('payment', {payment: payment});
});

router.get('/playlist', async function(ctx){
    await ctx.render('playlist')
});

router.get('/playlist-page', async function(ctx){
    await ctx.render('playlist-page', {title: "Playlist page"})
});

router.get('/create-playlist', async function(ctx){
    await ctx.render('create-playlist', {title: "Create playlist"})
});

app.use(router.routes()).use(router.allowedMethods());


module.exports = app;
