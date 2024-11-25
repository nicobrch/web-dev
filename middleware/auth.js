import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
    return jwt.sign(payload, 'secret', {expiresIn: '1h'})
}

export const verifyToken = (token) => {
    return jwt.verify(token, 'secret')
}

export const authMiddleware = (req, res, next) => {
    const excludedPaths = ["/login.html", "/register.html"];
    const isApiCall = req.path.startsWith("/api/");
    const hasToken = req.cookies && req.cookies.token;

    if (excludedPaths.includes(req.path) || isApiCall) {
        return next(); // Skip middleware for API and auth pages
    }

    if (!hasToken) {
        return res.redirect("/login.html"); // Redirect to login if no token is present
    }

    next(); // Proceed if token exists
};