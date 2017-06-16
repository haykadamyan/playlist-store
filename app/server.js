'use strict';

const http = require('http');
const Koa = require('koa');
const render = require('koa-ejs');

const views = require('koa-views');
const path = require('path');

const app = new Koa();

const router = require("./services/router.js");

app.use(views(path.join(__dirname, '/view'), { extension: 'ejs' }));

const payment = {
    seller: "Bobo",
    playlist: "Rock-playlist",
    purchase: "0.99$"
};
app.use(router.routes()).use(router.allowedMethods());
module.exports = app;
