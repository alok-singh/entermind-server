// const ollama = require('ollama');
const { default: ollama } = require('ollama'); // CJS

const chatWithLlama = async (message) => {
  try {
    const response = await ollama.chat({
      model: 'gemma3:1b',
      messages: [{ role: 'user', content: message }],
    });
    return response.message.content;
  } catch (error) {
    console.error('Error:', error);
    return 'Fail';
  }
};

module.exports = { chatWithLlama };