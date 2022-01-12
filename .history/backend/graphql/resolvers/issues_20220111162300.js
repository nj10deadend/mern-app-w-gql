const {AuthenticationError} = require('apollo-server');

const Issue = require('../../models/Issue');
const User = require('../../models/User');
const { post } = require('../../server');
const checkAuth = require('../../util/check-auth');
/// TODO: Refer to medium article again for improved database relations
// TODO: Refactor update action in deleteIssue Mutation. As of right now when you delete an issue it will
//       also delete all of the issues associated with that user on the database. It needs to only delete that one field

module.exports = {
    Query: {
        getIssues: async () => {
            return await Issue.find().sort({createdAt: -1}).populate('author');
        }, 
        getIssue: async (_, {issueId}) => {

            try {
                const foundIssue = await Issue.findById(issueId); 
                console.log(foundIssue.author._id);
                if (!foundIssue) {
                    throw new Error('Climate issue post not found')
                } else {
                    return foundIssue;
                }

            } catch (err) {
                throw new Error(err);
            }


        }
    }, 
    Mutation: {
        createIssue: async (_, {image, details}, context) => {

            const user = checkAuth(context);
            console.log(user);
            console.log(user.username);
            const newIssue = await Issue.create({author: user.id, username: user.username, image, details}); 
            await User.updateOne({email: user.email, username: user.username}, {$push: {issues: newIssue._id}}); 
            /// NEW LOGIC => Upon creating a new issue you also need to create and push the new issue entry id to the 'issues' array value
            /// in the User model/ users collection

            console.log(newIssue);

            return newIssue;
        }, 
        deleteIssue: async (_, {issueId}, context) => {

            const user = checkAuth(context);
            console.log(user);
            // console.log(user.id);
            try {
                const userPost = await Issue.findById(issueId);
                
                const userDbEntry = await User.findOne({email: user.email, username: user.username});

                const issuesInUser = userDbEntry.issues;
                console.log(userPost._id.valueOf())

                const issueIdsInUserDbEntry = issuesInUser.filter(eachIssue => {
                    console.log(eachIssue.valueOf());
                    return eachIssue.valueOf() === userPost._id.valueOf()
                });
                console.log(issueIdsInUserDbEntry)

                if (user.username === userPost.username) {
                    await userPost.delete();
                    console.log("Post successfully deleted 😄")
                    if (issueIdsInUserDbEntry) {
                        await User.updateOne({issues: issueIdsInUserDbEntry}, {$set: {issues: []}}); // =>method to remove issues from array
                        console.log("User.issues entry successfully deleted 😄");
                    }
                    return "Post successfully deleted 😄"
                } else {
                    throw new AuthenticationError("Access to action denied: Action not allowed 👊")
                }
            } catch(err) {
                throw new Error(err);
            }
        }, 
        upvoteIssue: async (_, {issueId}, context) => {
            const user = checkAuth(context);

            const issue = await Issue.findById(issueId);

            if (issue) {

                if (issue.upvotes.find(upvote => upvote.username === user.username)) {
                    /// Issue already upvoted. Remove upvote
                    issue.upvotes = issue.upvotes.filter(upvote => upvote.username !== user.username);
                } else {
                    // Issue not upvoted. Add upvote
                    issue.upvotes.push({username: user.username})
                }
            }
        }
    }
}

/// Decent attempt at deleting a User's issues whenever you delete their corresponding issue seperately

// function deleteUserIssueEntry (arr, id) {
//     // console.log(id.valueOf());
//     for (let i = 0; i < arr.length - 1; i++) {
//         if (arr[i].valueOf() === id.valueOf()) {
//             console.log(arr[i])
//             console.log(arr[i].valueOf() === id.valueOf());
//             // User.updateMany({ }, {$pull: {issues: arr[i]}})
//             // User.updateOne({})
//             // arr.splice(i, 1);
//         }
//     }
//     // return arr;
//     console.log(arr);
// }

