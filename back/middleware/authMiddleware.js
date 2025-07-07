import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {

    const { token } = req.headers;

    if (!token) {

        res.json({ success: false, message: "Not Authorized Login Again" })
    }
    try {
        const token_decode = jwt.verify(token, process.env.jwt_SECRET);
        req.body.userId = token_decode.id

        next();
    } catch (error) {
       return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
}

export default authMiddleware