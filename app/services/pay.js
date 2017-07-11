'use strict';

const SPSP = require('ilp').SPSP;
const FiveBellsPlugin = require('ilp-plugin-bells');


async function pay(username, password, receiver, amount) {
  const plugin = new FiveBellsPlugin({account:"https://ilp.tumo.org/ledger/accounts/" + username , password: password});

  await plugin.connect();
  console.log('Connected');

  const payment = await SPSP.quote(plugin, {receiver: receiver + "@ilp.tumo.org", sourceAmount: amount});

  console.log('Payment is ready to send');

  SPSP.sendPayment(plugin, payment);

  console.log('Payment done.');
}

module.exports = pay;
