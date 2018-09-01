const NfcpyId = require('node-nfcpy-id').default;
const nfc = new NfcpyId({mode: 'non-touchend'}).start();

nfc.on('touchstart', (card) => {
  console.log('touchstart:', card.id, 'type:', card.type);
  console.log('5秒後に読み込みを再開します');
  setTimeout(() => {
    nfc.start();
  }, 1000);
});

nfc.on('error', (err) => {
  // standard error output (color is red)
  console.error('\u001b[31m', err, '\u001b[0m');
});