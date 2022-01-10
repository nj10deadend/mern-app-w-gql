const jwt = require('jsonwebtoken');
require('dotenv').config()
const {AuthenticationError} = require('apollo-server');

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];

        if (token) {
            try {
                const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
                return user;
            } catch (err) {
                throw new AuthenticationError("Invalid/Expired Token");
            }
        }
        throw new Error("Authentication header must be \'Bearer [token]\'");
    }
    throw new Error("Authentication header must be provided in the request");


}