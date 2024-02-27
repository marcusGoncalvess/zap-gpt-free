# Zap-GPT

Este projeto explora a integração do ChatGPT com o WhatsApp, transformando o chatbot em um assistente virtual capaz de realizar tarefas como falar com amigos, responder a perguntas de clientes, e muito mais, com um toque de humanização nas conversas.

## 📚 Como Funciona

A integração começa com o [venom](https://github.com/orkestral/venom), que estabelece a conexão com o WhatsApp. <br/>
As mensagens recebidas são então processadas pela API do ChatGPT, que gera respostas coerentes e personalizadas.<br/>
Utilizamos um [assistant](https://platform.openai.com/docs/assistants/overview) da OpenAI, que é um do modelo OpenAI que foi pré-configurado com prompts detalhados. </br>
Esses prompts orientam o assistente sobre como responder de maneira coerente e personalizada, assegurando que as interações não só se mantenham relevantes e engajantes, mas também reflitam uma abordagem humana e natural na conversação.

## 🚀 Como Rodar/Usar o Projeto
### Configurando as Variáveis de Ambiente

Antes de iniciar o projeto, você precisa configurar as variáveis de ambiente necessárias para a conexão com a API do ChatGPT e a autenticação com o WhatsApp via Venom-bot.

1. Crie um arquivo `.env` baseando-se no arquivo `.env.example` fornecido

2. Preencha os valores das seguintes variáveis:

   - `OPENAI_KEY`: Sua chave de API da OpenAI. Esta chave é essencial para autenticar suas requisições à API do ChatGPT.
   - `OPENAI_ASSISTANT`: O ID do assistente personalizado que você criou na OpenAI. Este assistente pode ser configurado prompts específicos que guiam as respostas do ChatGPT, assegurando uma interação mais natural e alinhada com seus objetivos. Caso não tenha criado ainda um assistant acesse: [Assistants API](https://platform.openai.com/docs/assistants/overview)

### Executando o Projeto

Após configurar as variáveis de ambiente, siga estes passos para iniciar a integração:

0. Caso não tenha o `pnpm` instalado use `npm install pnpm -g` para instalar.
1. Execute o comando `pnpm i` para instalar as dependências.
2. Execute o comando `pnpm dev` para iniciar o projeto.

3. Após a execução, um QR Code será exibido no console. Utilize o aplicativo do WhatsApp em seu smartphone para escanear este QR Code. Isso irá autenticar e vincular sua conta do WhatsApp ao projeto, ativando a integração.

### Sobre o Prompt do GPT

A configuração do comportamento do GPT, crucial para determinar sua atuação em conversas, é realizada na criação do assistente na OpenAI, e não no código. Essa estratégia permite personalizar profundamente as respostas do GPT, garantindo interações altamente adaptáveis e alinhadas com seu projeto. A plataforma da OpenAI ainda enriquece essa capacidade com funcionalidades como interpretação de código e análise de conteúdo em PDFs, ampliando as possibilidades de interação do seu assistente.
