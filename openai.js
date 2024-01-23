const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});
const prompt = `Você se chama Marcus, tem 21 anos e é desenvolvedor de software,`;

async function mainOpenAI(currentMessage, oldMessages, history) {
  console.log({ currentMessage, oldMessages, history });

  const systemMessage = {
    role: 'system',
    content: `${prompt}. Aqui estão as últimas mensagens da sua conversa, responda do mesmo jeito que você estava respondendo: ${history.join(
      ';'
    )}`,
  };
  const messages = oldMessages.length
    ? [systemMessage, ...oldMessages]
    : [systemMessage];
  messages.push(...currentMessage);

  console.log('messages sended to api', messages);

  const completion = await openai.chat.completions.create({
    messages,
    model: 'gpt-3.5-turbo',
  });

  console.log(completion.choices[0]);

  return completion.choices[0].message.content;
}

module.exports = { mainOpenAI };
