# Playlist Store

- [Node js 8](#Node-js-8)
- [Google Api](#Google-Api)
- [ILP](#ILP)
- [Mysql](#Mysql)

## Node js 8

For this project we use node js 8. All methods are used in package.json and package-lock.json. Using node js 8 more easly. 

## Google API

----------

We are use google apis for getting youtube playlists and videos. We use for this koa method and create config.js file where write koa secret for connecting API. Then we use all information from API and use for our APP.
## ILP

------

We use Interledger protocol ( ILP ) for payment. We create pay.js where create pay function. This function we use for payment. We set 5 arguments ( sender, password, receiver, amount, message ). For do this all we use ilp-plugin-bells and SPSP. 

## Mysql

---------------

We are use sequilize for using mysql with node js. We create in database 4 tables(Orders, Playlists, Sales, Users). WE get information from api and insert in database.

