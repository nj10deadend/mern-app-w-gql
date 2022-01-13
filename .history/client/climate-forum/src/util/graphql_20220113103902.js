import gql from 'graphql-tag';

export const FETCH_CLIMATE_POSTS = gql`
    {
        getIssues {
            id
            username
            image
            details
            createdAt
            comments {
                username
                body
                createdAt
            }
            upvotes{
                count
            }
            downvotes{
                count
            }
        }
    }
`;

export const FETCH_MY_POSTS = gql`
    {
        getUserIssues {
            id
            username
            image
            details
            createdAt
            comments {
                username
                body
                createdAt
            }
        }
    }
`;