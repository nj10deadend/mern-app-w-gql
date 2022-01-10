const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../../config/.env'})

module.exports = {
    Query: {
        hello: () => {
            return 'Hello World 😇'
        },
        getUsers: async () => {
            const users = await User.find();
            return users;
        }

    },
    Mutation: {
        register(_, {registerInput: {name, email, password}}, context, info) {
            // TODO: Validate user data
            // TODO: Make sure email doesn't already exist
            // TODO: Hash password before storing new user and create an authentication token

            password = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                name,
                email,
                password
            });
            
            const token = jwt.sign({
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});

            return {
                ...newUser._doc,
                id: newUser.id,
                token
            }
        }

    }
}