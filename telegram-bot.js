const TelegramBot = require('node-telegram-bot-api');
const { getStockPrice } = require('./services/stocks');
const { getRecommendation } = require('./services/ai');
require('dotenv').config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/price (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const symbol = match[1].toUpperCase();

  const stock = await getStockPrice(symbol);
  if (!stock) {
    return bot.sendMessage(chatId, `Не удалось найти акцию "${symbol}"`);
  }

  await bot.sendMessage(chatId, `📈 ${symbol}: ${stock.price} ${stock.currency}\n⏳ Анализирую...`);

  const advice = await getRecommendation(symbol, stock.price);
  await bot.sendMessage(chatId, `💡 Совет: ${advice}`);
});


bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `Привет! Отправь команду /price AAPL или /price TSLA, чтобы получить совет.`);
});
