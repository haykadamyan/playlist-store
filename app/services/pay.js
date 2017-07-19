'use strict';

const SPSP = require('ilp').SPSP;
const FiveBellsPlugin = require('ilp-plugin-bells');

const ilpAddress = require('../../config/config').ILPAddress;

async function pay(sender, password, receiver, amount, message) {
  const plugin = new FiveBellsPlugin({account:"https://" + ilpAddress + "/ledger/accounts/" + sender , password: password});

  await plugin.connect();
  console.log('Connected');

  let payment = await SPSP.quote(plugin, {receiver: receiver + "@" + ilpAddress, sourceAmount: amount});

  payment.headers = {
    'Source-Identifier': sender + "@" + ilpAddress,
    'Message': message
  };

  console.log('Payment is ready to send');

  SPSP.sendPayment(plugin, payment);

  console.log('Payment done.');
}

module.exports = pay;
