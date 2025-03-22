const express = require('express');

const { METRICS_PORT } = require('@/consts/config');
const metricsService = require('@/services/metrics');

class MetricsServer {
  constructor() {
    this.app = express();
    this.setup();
  }

  setup() {
    this.app.get('/metrics', async (req, res) => {
      const metricsRegistry = metricsService.getMetricsRegistry();

      res.set('Content-Type', metricsRegistry.contentType);
      res.send(await metricsRegistry.metrics());
    });
  }

  start() {
    this.app.listen(METRICS_PORT || 3000, () => {
      console.log(`Metrics server listening on port ${METRICS_PORT}`);
    });
  }
}

module.exports = MetricsServer;