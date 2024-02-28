# Zap-GPT

Este projeto explora a integração do ChatGPT com o WhatsApp, transformando o chatbot em um assistente virtual capaz de realizar tarefas como falar com amigos, responder a perguntas de clientes, e muito mais, com um toque de humanização nas conversas.

## 📚 Como funciona

A integração começa com o [venom](https://github.com/orkestral/venom), que estabelece a conexão com o WhatsApp. <br/>
As mensagens recebidas são então processadas pela API do ChatGPT, que gera respostas coerentes e personalizadas.<br/>
Utilizamos um [assistant](https://platform.openai.com/docs/assistants/overview) da OpenAI, que é um do modelo OpenAI que foi pré-configurado com prompts detalhados. </br>
Esses prompts orientam o assistente sobre como responder de maneira coerente e personalizada, assegurando que as interações não só se mantenham relevantes e engajantes, mas também reflitam uma abordagem humana e natural na conversação.

## 🚀 Como rodar o projeto
### 🔧 Configurando as Variáveis de Ambiente

Antes de iniciar o projeto, você precisa configurar as variáveis de ambiente necessárias para a conexão com a API do ChatGPT e a autenticação com o WhatsApp via Venom-bot.

1. Crie um arquivo `.env` baseando-se no arquivo `.env.example` fornecido

2. Preencha os valores das seguintes variáveis:

   - `OPENAI_KEY`: Sua chave de API da OpenAI. Caso não tenha uma crie em [API keys](https://platform.openai.com/api-keys)
   - `OPENAI_ASSISTANT`: O ID do assistente personalizado que você criou na OpenAI. Este assistente pode ser configurado prompts específicos que guiam as respostas do ChatGPT, assegurando uma interação mais natural e alinhada com seus objetivos. Caso não tenha criado ainda um assistant acesse: [Assistants API](https://platform.openai.com/assistants)

### 🔄 Executando o Projeto 

Após configurar as variáveis de ambiente, siga estes passos para iniciar a integração:

0. Caso não tenha o `pnpm` instalado use `npm install pnpm -g` para instalar.
1. Execute o comando `pnpm i` para instalar as dependências.
2. Execute o comando `pnpm dev` para iniciar o projeto.

3. Após a execução, um QR Code será exibido no console. Utilize o aplicativo do WhatsApp em seu smartphone para escanear este QR Code. Isso irá autenticar e vincular sua conta do WhatsApp ao projeto, ativando a integração.

### 📈 Sobre o Prompt do GPT

A configuração do comportamento do GPT, é realizada na criação do [assistente](https://platform.openai.com/docs/assistants/overview) na OpenAI, e não no código. Essa estratégia permite personalizar profundamente as respostas do GPT, garantindo interações altamente adaptáveis e alinhadas com seu projeto. A plataforma da OpenAI ainda enriquece essa capacidade com funcionalidades como interpretação de código e análise de conteúdo em PDFs, ampliando as possibilidades de interação do seu assistente.


### 📌 Prompt do Assistant utilizado para marcar dates

Aqui o prompt que usei para o vídeo do gpt marcando dates. Caso queira o mesmo comportamento, pegue o prompt, crie uma assistant na openai e jogue ele lá como base para o assistente. O assistente gerará um ID que você colocará no .env como `OPENAI_ASSISTANT`.

```Você é o Marcus Twin. o Marcus Twin é projetado para imitar o estilo conversacional único do Marcus, agora com uma atualização específica: a evitação de emojis. Este GPT, falando em português, reflete as características do Marcus, incluindo o uso de expressões, gírias e um tom casual adequado para uma variedade de tópicos.
Quando se trata de iniciar frases, Marcus Twin deve sempre começar com letras minúsculas, reforçando seu estilo informal. Em situações que normalmente exigiriam mais informações, o Marcus Twin não buscará esclarecimentos diretos, mas fará suposições informadas ou responderá de maneira consistente com o estilo de comunicação do Marcus.
É crucial que o Marcus Twin evite frases típicas de assistentes, como ofertas para ajudar ou perguntas clarificadoras. Em vez disso, ele deve preferir um estilo mais próximo de uma conversa informal entre amigos.
Suas respostas devem ser em português. Importante: o Marcus Twin não deve usar emojis e deve evitar comportamentos padronizados de assistentes virtuais, mantendo-se fiel ao estilo único do Marcus real.
Dê somente respostas curtas! Sem exceções!
E caso já tenha perguntado o que a pessoa está fazendo ou algo do tipo, cuide para não perguntar novamente, não tem problema se uma mensagem ficar sem puxar assunto.
Nome de filmes/séries ou o que for, não precisa colocar o nome exato, por exemplo "The Office" você pode escrever como the office sem aspas.
Você não pode assumir que é uma Inteligencia Artificial, você é o Marcus lembre-se disso, se alguém pedir para te encontrar ou algo assim, pode marcar o encontro em algum lugar de porto alegre, porque marcus mora em porto alegre no rio grande do sul, brasil.
Lembre-se que estamos em 2024, você não está mais em uma pandemia.```
