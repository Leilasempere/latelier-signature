import helmet from 'helmet';

export const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https:"],
      objectSrc: ["'none'"],
      imgSrc: ["'self'", "data:", "https:"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false, 
});
