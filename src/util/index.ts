export function splitMessages(text: string): RegExpMatchArray | null {
  return text.match(/[^.?!]+[.?!]+["']?|[^.?!]+$/g);
}

export async function sendMessagesWithDelay({
  messages,
  delay,
  client,
  targetNumber,
}) {
  for (const [index, msg] of messages.entries()) {
    await new Promise((resolve) => setTimeout(resolve, index * delay));
    client
      .sendText(targetNumber, msg.trimStart())
      .then((result) => {
        console.log('Mensagem enviada:', result);
      })
      .catch((erro) => {
        console.error('Erro ao enviar mensagem:', erro);
      });
  }
}

export async function getHistoryMessages({ targetNumber, client, history }) {
  if (history) return;
  const historyInternal = await client.getAllMessagesInChat(
    targetNumber,
    true,
    false
  );
  const textMessages = historyInternal
    .filter((msg) => msg.type === 'chat')
    .slice(-30)
    .map((msg) => {
      const isFromMe = msg.from === '555192194386@c.us';
      return `${
        isFromMe ? 'mensagem marcus' : `mensagem ${msg.sender.shortName}`
      }: ${msg.body}`;
    });
  history = textMessages;
}
