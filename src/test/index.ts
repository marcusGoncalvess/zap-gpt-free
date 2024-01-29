import { mainOpenAI } from '../openai';

mainOpenAI(
  {
    sender: { name: 'fernanda' },
    body: 'oie, tudo bem? quem é você? qual seu nome?',
  },
  []
).then((e) => {
  mainOpenAI(
    {
      sender: { name: 'fernanda' },
      body: 'muito prazer em te conhecer! Você se lembra meu nome?',
    },
    []
  ).then((e) => e);
});
