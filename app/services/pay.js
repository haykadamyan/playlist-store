'use strict';

const SPSP = require('ilp').SPSP;
const FiveBellsPlugin = require('ilp-plugin-bells');


async function pay(sender, password, receiver, amount, message) {
  const plugin = new FiveBellsPlugin({account:"https://ilp.tumo.org/ledger/accounts/" + sender , password: password});

  await plugin.connect();
  console.log('Connected');

  let payment = await SPSP.quote(plugin, {receiver: receiver + "@ilp.tumo.org", sourceAmount: amount});

  payment.headers = {
    'Source-Identifier': sender + "@ilp.tumo.org",
    'Message': message
  };

  console.log('Payment is ready to send');

  SPSP.sendPayment(plugin, payment);

  console.log('Payment done.');
}

module.exports = pay;
