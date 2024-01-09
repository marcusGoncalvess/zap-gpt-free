const axios = require('axios');

const client = axios.create({
  baseURL: 'http://localhost:1234/v1',
});

const data = {
  model: 'local-model',
  messages: [
    {
      role: 'system',
      content: 'É para você fingir ser eu, falando com um amigo. Responda com um limite de 50 tokens',
    },
    { role: 'user', content: 'oii' },
    // {
    //   role: 'assistant',
    //   content: 'The Los Angeles Dodgers won the World Series in 2020.',
    // },
    // { role: 'user', content: 'Where was it played?' },
  ],
};

client.post('/chat/completions', data).then((res) => {
  console.log({ res: res.data.choices[0].message });
});

