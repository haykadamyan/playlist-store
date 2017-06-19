'use strict';

const http = require('http');
const Koa = require('koa');
const render = require('koa-ejs');
const serve = require('koa-static');
const views = require('koa-views');
const path = require('path');

const server = new Koa();

const router = require("./services/router.js");

server.use(views(path.join(__dirname, '/view'), { extension: 'ejs' }));
server.use(serve('./public'));
server.use(router.routes()).use(router.allowedMethods());
module.exports = server;
