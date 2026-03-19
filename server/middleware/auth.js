import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    // 1. Extract token from Authorization header (Bearer <token>)
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Accès refusé. Aucun token fourni." });
    }

    // 2. Verify token against JWT_SECRET — throws if expired or tampered
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach decoded user payload to request for downstream controllers
    req.user = decoded;

    // 4. Proceed to next middleware or controller
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide ou expiré." });
  }
};

export default auth;
