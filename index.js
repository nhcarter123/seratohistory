const HistoryProvider = require('./lib/historyProvider');

module.exports = {
  getHistory: HistoryProvider.getHistory,
  getDefaultSeratoPath: HistoryProvider.getDefaultSeratoPath
};