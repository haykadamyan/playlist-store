'use strict';

const SPSP = require('ilp').SPSP;
const FiveBellsPlugin = require('ilp-plugin-bells');

const plugin = new FiveBellsPlugin({account: "https://ilp.tumo.org/ledger/accounts/armen", password: "armenarmen"});

async function pay() {
  await plugin.connect();
  console.log('Connected');

  const payment = await SPSP.quote(plugin, {receiver: "whereotherscant@ilp.tumo.org", sourceAmount: '1'});

  console.log('Payment is ready to send');

  SPSP.sendPayment(plugin, payment);

  console.log('Payment done.');
}

pay();
