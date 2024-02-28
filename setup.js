import inquirer from 'inquirer';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const mainQuestion = [
  {
    type: 'list',
    name: 'AI_SELECTED',
    message: 'Escolha a IA que deseja usar:',
    choices: ['GPT', 'GEMINI'],
  },
];

const geminiQuestion = [
  {
    type: 'input',
    name: 'GEMINI_KEY',
    message:
      'Informe a sua GEMINI_KEY (https://aistudio.google.com/app/apikey):',
    validate: (input) =>
      !!input ||
      'A GEMINI_KEY não pode ser vazia. Por favor, informe um valor válido.',
  },
  {
    type: 'input',
    name: 'GEMINI_PROMPT',
    message: 'Informe o prompt para o Gemini:',
    validate: (input) =>
    !!input ||
    'A GEMINI_PROMPT não pode ser vazia. Por favor, informe um valor válido.',
  },
];

const gptQuestions = [
  {
    type: 'input',
    name: 'OPENAI_KEY',
    message: 'Informe a sua OPENAI_KEY (https://platform.openai.com/api-keys):',
    validate: (input) =>
      !!input ||
      'A OPENAI_KEY não pode ser vazia. Por favor, informe um valor válido.',
  },
  {
    type: 'input',
    name: 'OPENAI_ASSISTANT',
    message:
      'Informe o seu OPENAI_ASSISTANT (https://platform.openai.com/assistants):',
    validate: (input) =>
      !!input ||
      'O OPENAI_ASSISTANT não pode ser vazio. Por favor, informe um valor válido.',
  },
];

inquirer.prompt(mainQuestion).then((answers) => {
  let envConfig = `AI_SELECTED=${answers.AI_SELECTED}\n`;

  if (answers.AI_SELECTED === 'GEMINI') {
    inquirer.prompt(geminiQuestion).then((geminiAnswer) => {
      envConfig += `GEMINI_KEY=${geminiAnswer.GEMINI_KEY}\nGEMINI_PROMPT=${geminiAnswer.GEMINI_PROMPT}\n`;
      fs.writeFileSync('.env', envConfig, { encoding: 'utf8' });
      console.log('Configuração para GEMINI salva com sucesso! 🎉');
    });
  } else {
    inquirer.prompt(gptQuestions).then((gptAnswers) => {
      envConfig += `OPENAI_KEY=${gptAnswers.OPENAI_KEY}\nOPENAI_ASSISTANT=${gptAnswers.OPENAI_ASSISTANT}\n`;
      fs.writeFileSync('.env', envConfig, { encoding: 'utf8' });
      console.log('Configuração para GPT salva com sucesso! 🎉');
    });
  }
});
