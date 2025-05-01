import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants.js";


const tokenValidationMiddleware = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from the Authorization header

    if (!token) {
        return res.status(401).json({ status: 0, message: "No token provided" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ status: 0, message: "Invalid token" });
        }
        req.user = decoded; // Attach the decoded user info to the request object
        next(); // Proceed to the next middleware or route handler
    });
};

export default tokenValidationMiddleware;
// This middleware checks if the token is valid and extracts user information from it.