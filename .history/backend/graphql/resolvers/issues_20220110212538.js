const {AuthenticationError} = require('apollo-server');

const Issue = require('../../models/Issue');
const User = require('../../models/User');
const checkAuth = require('../../util/check-auth');

/// TODO: Delete all Users and Issues and start anew. The schema has been updated way too many times
/// TODO: Refer to medium article again for improved database relations

module.exports = {
    Query: {
        getIssues: async () => {
            return await Issue.find().sort({createdAt: -1});
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

            function deleteUserIssueEntry (arr, id) {
                // console.log(id.valueOf());
                for (let i = 0; i < arr.length - 1; i++) {
                    if (arr[i].valueOf() === id.valueOf()) {
                        console.log(arr[i].valueOf() === id.valueOf());
                        User.updateMany({}, {$pull: {_id: arr[i]}})
                        // arr.splice(i, 1);
                    }
                }
                return arr;
            }

            const user = checkAuth(context);
            console.log(user);
            // console.log(user.id);
            try {
                const userPost = await Issue.findById(issueId);

                const userDbEntry = await User.findOne({email: user.email, username: user.username});
                // console.log(userDbEntry);

                const issuesInUser = userDbEntry.issues;
                // console.log(issuesInUser);
                // console.log((userPost._id).str);
                console.log(userPost._id.valueOf())

                // const issueIdsInUserDbEntry = issuesInUser.filter(eachIssue => eachIssue === userPost._id);
                const issueIdsInUserDbEntry = issuesInUser.filter(eachIssue => {
                    console.log(eachIssue.valueOf());
                    return eachIssue.valueOf() === userPost._id.valueOf()
                });
                console.log(issueIdsInUserDbEntry)

                /// Upon successful querying for the authenticated user's matching users collection entry we will filter through the 
                /// issues array and delete the matching issue id
                // console.log(user.username);
                // console.log(userPost.username);
                // console.log(user.username === userPost.username);
                console.log(deleteUserIssueEntry(issuesInUser, userPost.id));

                if (user.username === userPost.username) {
                    await userPost.delete();
                    console.log("Post successfully deleted 😄")
                    if (issueIdsInUserDbEntry) {
                        // await issueIdInUsers.delete();
                        // await issueIdInUsers.splice(0, issueIdInUsers.length); => /// method to remove issues from array
                        console.log("User.issues entry successfully deleted 😄");
                        return deleteUserIssueEntry(issuesInUser, userPost._id);

                    }
                    
                    return "Post successfully deleted 😄"
                } else {
                    throw new AuthenticationError("Access to action denied: Action not allowed 👊")

                }
            } catch(err) {
                throw new Error(err);

            }
        }
    }
}


