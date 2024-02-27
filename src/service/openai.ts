import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

let assistant: OpenAI.Beta.Assistants.Assistant;
let thread: OpenAI.Beta.Threads.Thread;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function initializeNewAIChatSession(): Promise<void> {
  assistant = await openai.beta.assistants.retrieve(
    process.env.OPENAI_ASSISTANT!
  );
  thread = await openai.beta.threads.create();
}

export async function mainOpenAI({
  currentMessage,
  history,
  name,
}: {
  currentMessage: string;
  history: string[];
  name: string;
}): Promise<string> {
  const instructionsHistory = `Você está falando com ${name}. ${
    history.length > 0
      ? `Se a conversas já estiver em andamento continue ela, Aqui estão as últimas mensagens na conversa para você ter um contexto melhor: ${history.join(
          ';'
        )}`
      : ''
  }`;
  const instructions = `${assistant.instructions} \n ${instructionsHistory}`;

  await openai.beta.threads.messages.create(thread.id, {
    role: 'user',
    content: currentMessage,
  });

  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
    instructions,
  });

  const messages = await checkRunStatus({ threadId: thread.id, runId: run.id });
  const responseAI = messages.data[0]
    .content[0] as OpenAI.Beta.Threads.Messages.MessageContentText;
  return responseAI.text.value;
}

async function checkRunStatus({
  threadId,
  runId,
}: {
  threadId: string;
  runId: string;
}): Promise<OpenAI.Beta.Threads.Messages.ThreadMessagesPage> {
  return await new Promise((resolve, _reject) => {
    const verify = async (): Promise<void> => {
      const runStatus = await openai.beta.threads.runs.retrieve(
        threadId,
        runId
      );

      if (runStatus.status === 'completed') {
        const messages = await openai.beta.threads.messages.list(threadId);
        resolve(messages);
      } else {
        console.log('Aguardando resposta da OpenAI...');
        setTimeout(verify, 3000);
      }
    };

    verify();
  });
}
