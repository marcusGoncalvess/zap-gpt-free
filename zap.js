const fs = require('fs');
const venom = require('venom-bot');
const axios = require('axios');

const axiosCreate = axios.create({
  baseURL: 'http://localhost:1234/v1',
});

venom
  .create(
    'sessionName',
    (base64Qr, asciiQR, attempts, urlCode) => {
      console.log(asciiQR); // Optional to log the QR in the terminal
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
  // const targetNumber = '555197575710@c.us';
  const targetNumber = '555193402351@c.us';

  // client
  //   .sendText(targetNumber, 'Olá! Essa é uma mensagem automática do Venom 🕷️')
  //   .then((result) => {
  //     console.log('Mensagem enviada:', result);
  //   })
  //   .catch((erro) => {
  //     console.error('Erro ao enviar mensagem:', erro);
  //   });

  const awserMessage = async (message) => {
    const data = {
      model: 'local-model',
      messages: [
        {
          role: 'system',
          content: 'É para você fingir ser eu, falando com um amigo.',
        },
        { role: 'user', content: message },
      ],
    };

    const res = await axiosCreate.post('/chat/completions', data);

    return res.data.choices[0].message.content;
  };

  client.onMessage(async (message) => {
    console.log(message);
    if (message.from === targetNumber) {
      console.log('Nova mensagem recebida de:', message.from);
      console.log('Mensagem:', message.body);

      const resposta = await awserMessage(message.body);

      console.log({ resposta });

      client
        .sendText(targetNumber, resposta)
        .then((result) => {
          console.log('Mensagem enviada:', result);
        })
        .catch((erro) => {
          console.error('Erro ao enviar mensagem:', erro);
        });
    }
  });
}
