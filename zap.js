const venom = require('venom-bot');
const { mainOpenAI } = require('./openai');

require('dotenv').config();
const oldMessages = [];
let messageBuffer = [];
let timeoutId = null;
const TIMEOUT_DURATION = 6000;

venom
  .create(
    'sessionName',
    (base64Qr, asciiQR, attempts, urlCode) => {
      console.log(asciiQR);
    },
    undefined,
    { logQR: false }
  )
  .then((client) => {
    start(client);
  })
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  const targetNumber = '554898323264@c.us';

  client.onMessage(async (message) => {
    console.log('message:', message);
    if (message.from === targetNumber && message.type === 'chat') {
      messageBuffer.push({ content: message.body, role: 'user' });

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(async () => {
        const answer = await mainOpenAI(messageBuffer, oldMessages, history);
        oldMessages.push(
          ...messageBuffer.map((msg) => ({
            content: msg.content,
            role: 'user',
          }))
        );
        oldMessages.push({ content: answer, role: 'assistant' });

        client
          .sendText(targetNumber, answer)
          .then((result) => {
            console.log('Mensagem enviada:', result);
          })
          .catch((erro) => {
            console.error('Erro ao enviar mensagem:', erro);
          });

        messageBuffer = [];
        timeoutId = null;
      }, TIMEOUT_DURATION);
    }
  });
}
