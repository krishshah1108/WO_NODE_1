import morgan from 'morgan';
import logger from '../config/logger.js';

export const loggerMiddleware = morgan(
  (tokens, req, res) => {
    return JSON.stringify({
      level: 'info',
      message: 'API Request',
      meta: {
        userId: req.userId ? req.userId : 'Anonymous',
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: tokens.status(req, res),
        responseTime: `${tokens['response-time'](req, res)} ms`,
      },
      timestamp: new Date().toISOString(),
    });
  },
  {
    stream: { write: (message) => logger.info(JSON.parse(message)) },
  },
);
