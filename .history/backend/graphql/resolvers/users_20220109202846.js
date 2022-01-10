require('dotenv').config({path: '../../config/.env'})
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const {UserInputError} = require('apollo-server');
const {validateRegistrationInput} = require('../../util/validators');


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
        async register(_, {registerInput: {name, email, password}}) {
            // Validate user data ---- DONE ----
            // Make sure email doesn't already exist ---- DONE ----
            //  Hash password before storing new user and create an authentication token ---- DONE ---

            const {valid, errors} = validateRegistrationInput(email, password);

            if (!valid) {
                throw new UserInputError('Errors', {errors});
            }

            const foundUser = await User.findOne({email})

            if (foundUser) {
                console.log("Account already exists in database")
                throw new UserInputError("Account already exists", {
                    errors: {
                        email: "This email is already in use"
                    }
                })
            }

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