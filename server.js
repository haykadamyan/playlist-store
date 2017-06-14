const Koa = require('koa');
const render = require('koa-ejs');
const Router = require('koa-router');
const views = require('koa-views');

const app = new Koa();
const router = new Router();

app.use(views(__dirname + '/app/view',{extension: 'ejs'}));


router.get('/', async function(ctx){
    await ctx.render('main');
});

app.use(router.routes()).use(router.allowedMethods());
console.log("Server running on localhost: 3000");
app.listen(3000);
