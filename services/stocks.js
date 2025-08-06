const yahooFinance = require('yahoo-finance2').default;

async function getStockPrice(symbol) {
  try {
    const quote = await yahooFinance.quote(symbol);
    return {
      symbol: quote.symbol,
      price: quote.regularMarketPrice,
      currency: quote.currency
    };
  } catch (e) {
    return null;
  }
}

module.exports = { getStockPrice };
