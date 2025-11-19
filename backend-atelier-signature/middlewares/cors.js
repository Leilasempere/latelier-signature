export const corsMiddleware = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Pour les pré-requêtes CORS  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
};

