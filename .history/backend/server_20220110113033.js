require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const {ApolloServer} = require('apollo-server');

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
console.log(resolvers);



//// Models ////////////////
const User = require('./models/User');
const Issue = require('./models/Issue');
const Comment = require('./models/Comment');
/// Route imports //////////

const app = express();
const port = 5000;

/// create mongodb data ////////////////
// createUser();
// createIssue();
// linkUserToIssue();

async function createUser () {

    // const plainTextPassword = 'DeadendPassword229' //// My password

    // const plainTextPassword = 'killbeasts123' //// Gehrman password
    const plainTextPassword = 'killBill99' //// The Bride password

    // const plainTextPassword = '000' Archibald Fanceyson Password
    // Archibald Email: richerThanBezos@richaf.com
    // Archibald username: RichBoyNo$nob

    const hashedPassword = await bcrypt.hash(plainTextPassword, 5);

    console.log(hashedPassword);

    const newUser = await User.create({
        name: 'The Bride',
        email: 'killbill666@gmail.com',
        password: hashedPassword

    })
    console.log(newUser);
}

async function createIssue () {
    const naseer = await User.findOne({email: "nasjacks10@gmail.com"})

    const newIssue = await Issue.create({
        author: naseer._id,
        image: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2018_49/2669406/181204-japan-tsunami-earthquake-cs-920a.jpg",
        details: "Tsunamis are ramping up again around Japan"

    })
    console.log(newIssue);
}

//// how to add values to Schema.Types.ObjectId field in data Models
//// You are going to have to add logic in your backend routes that say to add User Id to Author field
/// whenever that specific user is creating an issue

/// Likewise, you are going to have to add logic that then adds those issues to the user's comments field. 
/// Like how its done below. 
async function linkUserToIssue () {
    const naseer = await User.findOne({email: "nasjacks10@gmail.com"})

    // const endIsNighIssue = await Issue.findOne({details: 'I believe the end is nigh'})
    const tsunamisIssue = await Issue.findOne({details: 'Tsunamis are ramping up again around Japan'})

    await User.updateOne({email: "nasjacks10@gmail.com"}, {$push: {issues: tsunamisIssue._id}})

    console.log(naseer);

}

////////////////////////////////////////////////////////////////

app.use(cors());

////// DO NOT CHANGE THESE ////////////////
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/////////////////////////////////////////////


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});


app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

const server = new ApolloServer({typeDefs, resolvers, context: ({ req }) => ({req})});

const connectApolloMongooseDB = async () => {
        //database Name
        const databaseName='climate-forum';

        mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("Mongoose connected to MongoDB")
            return server.listen({port})

        }).then((res) => {
            console.log(`Express Server running at ${res.url}`)

        });
}

connectApolloMongooseDB();

module.exports = app;