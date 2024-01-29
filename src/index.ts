import venom from 'venom-bot';

import dotenv from 'dotenv';
import { initializeNewAIChatSession, mainOpenAI } from './service/openai';
import {
  getHistoryMessages,
  splitMessages,
  sendMessagesWithDelay,
} from './util';

dotenv.config();

let messageBuffer = [] as string[];
let messageTimer = null as NodeJS.Timeout | null;

let history;

venom
  .create(
    'sessionName',
    (base64Qr, asciiQR, attempts, urlCode) => {
      console.log(asciiQR);
    },
    (statusSession, session) => {
      console.log('Status Session: ', statusSession);
    },
    { logQR: false }
  )
  .then((client) => {
    start(client);
  })
  .catch((erro) => {
    console.log(erro);
  });

async function start(client: venom.Whatsapp): Promise<void> {
  await initializeNewAIChatSession();
  const targetNumber = '555184747980@c.us';

  client.onMessage(async (message) => {
    if (message.from === targetNumber && message.type === 'chat') {
      await getHistoryMessages({ client, history, targetNumber });

      messageBuffer.push(message.body);

      clearTimeout(messageTimer);
      messageTimer = setTimeout(async () => {
        const answer = await mainOpenAI(
          messageBuffer.join(' \n '),
          history,
          message.sender.name
        );
        const messages = splitMessages(answer);
        const delay = 3000;
        await sendMessagesWithDelay({ client, delay, messages, targetNumber });
        messageBuffer = [];
      }, 10000);
    }
  });
}
