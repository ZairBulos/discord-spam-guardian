const client = require('prom-client');

class MetricsService {
  constructor() {
    this.messagesDeleted = new client.Counter({
      name: 'bot_messages_deleted_total',
      help: 'Total number of spam messages deleted by the bot',
    });

    client.collectDefaultMetrics();
  }

  getMetricsRegistry() {
    return client.register;
  }

  incrementMessagesDeleted() {
    this.messagesDeleted.inc();
  }
}

module.exports = new MetricsService();