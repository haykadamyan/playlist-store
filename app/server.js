'use strict';

const Koa = require('koa');
const koaStatic = require('koa-static');
const views = require('koa-views');
const path = require('path');

const server = new Koa();

const router = require("./services/router.js");

server
  .use(views(path.join(__dirname, '/view'), { extension: 'ejs' }))
  .use(koaStatic('./public'))
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = server;
