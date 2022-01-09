const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const connectDB = require('./config/db');
const {ApolloServer, gql} = require('apollo-server-express');

//// Models ////////////////
const User = require('./models/User');
const Issue = require('./models/Issue');
const Comment = require('./models/Comment');
/// Route imports //////////



const app = express();
const port = 7000;



connectDB();
/// create mongodb data ////////////////
// createUser();
// createIssue();
linkUserToIssue();

async function createUser () {

    const plainTextPassword = 'DeadendPassword229'

    const hashedPassword = await bcrypt.hash(plainTextPassword, 5);

    console.log(hashedPassword);

    const newUser = await User.create({
        name: 'Naseer',
        email: 'nasjacks10@gmail.com',
        password: hashedPassword,
        admin: true

    })
    console.log(newUser);
}

async function createIssue () {
    const naseer = await User.findOne({email: "nasjacks10@gmail.com"})

    const newIssue = await Issue.create({
        author: naseer._id,
        image: "https://nationaltoday.com/wp-content/uploads/2021/06/National-Meteor-Watch-Day.jpg",
        details: "I believe the end is nigh"

    })
    console.log(newIssue);
}

async function linkUserToIssue () {
    const naseer = await User.findOne({email: "nasjacks10@gmail.com"})

    const endIsNighIssue = await Issue.findOne({details: 'I believe the end is nigh'})

    await User.updateOne({email: "nasjacks10@gmail.com"}, {issues: endIsNighIssue._id})

    console.log(naseer);

}

////////////////////////////////////////////////////////////////

// const typeDefs = gql`
//     type Query {

//     }
// `;
// const resolvers = {
//     Query: {

//     }
// }

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

// async function startApolloServer () {

//     const apolloServer = new ApolloServer();

// }


app.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`)
})

module.exports = app;