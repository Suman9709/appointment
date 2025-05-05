import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET

export const verifyJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token Provided!! Authorization denied" })
    }

    const token = authHeader.split(" ")[1];

    try {
        const decode = jwt.verify(token, JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token. Authorization denied." });
    }

}