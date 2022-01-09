const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({

    name: String,
    email: {
        type: String,
        required: [true, 'User email can\'t be blank'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'User password can\'t be blank'],
    },
    admin: {
        type: Boolean,
        default: false
    },
    issues: [{ type: Schema.Types.ObjectId, ref: 'Issue' }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;