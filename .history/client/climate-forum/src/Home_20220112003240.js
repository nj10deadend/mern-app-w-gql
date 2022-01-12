import { BrowserRouter } from 'react-router-dom';
import { Route, Routes} from 'react-router-dom';
import { gql, useQuery } from "@apollo/client"

import Login from './components/Login';
import Registration from './components/Registration';
import ClimatePost from './components/ClimatePost';

function Home () {

    const { loading, error, data } = useQuery(FETCH_CLIMATE_POSTS);
    if (data) {
        console.log(data);
    }
    // if (loading) {
    //     return <p>Loading...</p>
    // }
    // if (error) {
    //     return <p>Error</p>
    // } else {

        return (
            <div className="App">
                <h1>Welcome to Climate-forum</h1>
    
            </div>
        )
}

const FETCH_CLIMATE_POSTS = gql`
{
    getIssues{
        id
        username
        image
        details
        upvotes {
            username
        }
        downvotes {
            username
        }
        comments {
            username
            body
            createdAt
        }
        createdAt
    }
}
`;
export default Home;