// Deprecated code due to high processing cost.
// The function retrieves the last 10 text messages from a chat, providing context for better conversation understanding.
// To achieve this, the entire conversation is fetched, but only the last 10 messages are sent to the API.
async function getHistoryMessages() {
  let history;
  const historyInternal = await client.getAllMessagesInChat(
    targetNumber,
    true,
    false
  );
  const textMessages = historyInternal
    .filter((msg) => msg.type === 'chat')
    .slice(-10)
    .map((msg) => {
      const isFromMe = msg.from === '555192194386@c.us';
      return `${
        isFromMe ? 'mensagem marcus' : `mensagem ${msg.sender.shortName}`
      }: ${msg.body}`;
    });
  history = textMessages;
}

module.exports = { getHistoryMessages };
