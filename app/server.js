'use strict';

const Koa = require('koa');
const koaStatic = require('koa-static');
const views = require('koa-views');
const session = require('koa-session');
const path = require('path');

const server = new Koa();

const router = require("./routes/routes.js");
const passport = require('./services/passport');
const config = require('../config/config');
const YoutubeAPI = require('./services/youtube');

server.keys = [config.koaSecret];

server
    .use(views(path.join(__dirname, '/view'), {extension: 'ejs'}))
    .use(koaStatic('./public'))
    .use(session(server))
    .use(passport.initialize())
    .use(passport.session())
    .use(async function (ctx, next) {

        if (ctx.isAuthenticated()) {
            ctx.state.youtubeAPI = await new YoutubeAPI(config.google.clientID, config.google.clientSecret, config.google.callbackURL, ctx.state.user.accessToken, ctx.state.user.refreshToken);
        }
        // else {
        //   ctx.redirect('/');
        // }
        await next();
    })
    .use(router.routes())
    .use(router.allowedMethods());

module.exports = server;
