import { type Whatsapp } from '@wppconnect-team/wppconnect';

export function splitMessages(text: string): string[] {
  return text.split('\n').filter((c) => c);
}

export async function sendMessagesWithDelay({
  messages,
  client,
  targetNumber,
}: {
  messages: string[];
  client: Whatsapp;
  targetNumber: string;
}): Promise<void> {
  for (const [, msg] of messages.entries()) {
    const dynamicDelay = msg.length * 100;
    await new Promise((resolve) => setTimeout(resolve, dynamicDelay));
    client
      .sendText(targetNumber, msg.trimStart())
      .then((result) => {
        console.log('Mensagem enviada:', result.body);
      })
      .catch((erro) => {
        console.error('Erro ao enviar mensagem:', erro);
      });
  }
}
