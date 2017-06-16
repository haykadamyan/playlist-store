const Router = require('koa-router');
const router = new Router();
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

module.exports = router;