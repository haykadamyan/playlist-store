'use strict';

const http = require('http');
const Koa = require('koa');
const render = require('koa-ejs');
const serve = require('koa-static');
const views = require('koa-views');
const path = require('path');

const app = new Koa();

const router = require("./services/router.js");

app.use(views(path.join(__dirname, '/view'), { extension: 'ejs' }));
app.use(serve('./public'));
app.use(router.routes()).use(router.allowedMethods());
module.exports = app;
