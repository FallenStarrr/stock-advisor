const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getRecommendation(symbol, price) {
  const prompt = `
Цена акции ${symbol} составляет ${price} USD.
Представь, что ты опытный финансовый аналитик, который описывает плюсы и минусы этой компании на основе текущей цены.
Не давай финансовый совет напрямую — просто расскажи, какие факторы могут повлиять на решение инвестора.
`;


  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }]
  });

  return res.choices[0].message.content.trim();
}

module.exports = { getRecommendation };
