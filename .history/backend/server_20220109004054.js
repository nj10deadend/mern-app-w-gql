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
// linkUserToIssue();

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