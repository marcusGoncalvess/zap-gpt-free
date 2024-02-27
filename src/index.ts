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
let messageTimer: NodeJS.Timeout;

const history = [] as string[];

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

  client.onMessage((message) => {
    (async () => {
      if (message.type === 'chat' && !message.isGroupMsg) {
        await getHistoryMessages({
          client,
          history,
          targetNumber: message.from,
        });

        messageBuffer.push(message.body);

        clearTimeout(messageTimer);
        messageTimer = setTimeout(() => {
          (async () => {
            const answer = await mainOpenAI({
              currentMessage: messageBuffer.join(' \n '),
              history,
              name: message.sender.name,
            });
            const messages = splitMessages(answer);
            const delay = 3000;
            await sendMessagesWithDelay({
              client,
              delay,
              messages,
              targetNumber: message.from,
            });
            messageBuffer = [];
          })();
        }, 10000);
      }
    })();
  });
}
