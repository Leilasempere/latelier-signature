import helmet from "helmet";

// Configuration de Helmet
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
