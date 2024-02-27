# Zap-GPT

Este projeto explora a integração do ChatGPT com o WhatsApp, transformando o chatbot em um assistente virtual capaz de realizar tarefas como falar com amigos, responder a perguntas de clientes, e muito mais, com um toque de humanização nas conversas.

## 📚 Como Funciona

A integração começa com o [venom](https://github.com/orkestral/venom), que estabelece a conexão com o WhatsApp. <br/>
As mensagens recebidas são então processadas pela API do ChatGPT, que gera respostas coerentes e personalizadas.<br/>
Na integração com GPT eu usei um [assistant da openai](https://platform.openai.com/docs/assistants/overview), onde é basicamente o modelo do gpt mas já pre-configurado com um prompt detalhadado de como agir.
