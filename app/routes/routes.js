'use strict';

const Router = require('koa-router');

const config = require('../../config/config');
const passport = require('../services/passport');
const Functions = require('./functions');

const router = new Router();


router.get('/auth/youtube',
  passport.authenticate('google',
    {scope: config.google.scope, accessType: config.google.accessType, approvalPrompt: config.google.approvalPrompt}
  )
);

router.get('/auth/youtube/callback',
  passport.authenticate('google',
    {successRedirect: '/', failureRedirect: '/armen'}
  )
);

router.get('/logout', function (ctx) {
  ctx.logout();
  ctx.redirect('/');
});

router.use(async function (ctx, next) {
  if (ctx.isAuthenticated()) {
    return next()
  } else {
    ctx.redirect('/')
  }
});

router.get('/', Functions.main);

router.get('/userInfo', Functions.userInfo);
router.get('/ILPAuthenticate', Functions.ILPAuthenticate);

router.get('/playlist/:id', Functions.showPlaylist);
router.get('/playlist/buy/:id', Functions.buyPlaylist);
router.get('/playlist/sell/:id', Functions.sellPlaylist);
router.get('/dontSell', Functions.dontSell);


module.exports = router;