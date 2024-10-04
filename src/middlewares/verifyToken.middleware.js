import "dotenv/config";

export class verifyToken{

 static async verify(req, res, next){
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'Sem token, autorização negada' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.id;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Token inválido' });
    }
  };
}