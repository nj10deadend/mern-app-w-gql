const User = require('../../models/User');

module.exports = {
    Query: {
        hello: () => {
            return 'Hello World 😇'
        },
        getUsers: async () => {
            const users = await User.find();
            return users;
        }

    }
}