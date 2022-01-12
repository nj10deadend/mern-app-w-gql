import { BrowserRouter } from 'react-router-dom';
import { Route, Routes} from 'react-router-dom';
import { gql, useQuery } from "@apollo/client"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';



import Login from './components/Login';
import Registration from './components/Registration';
import ClimatePost from './components/ClimatePost';

function Home () {

    const { loading, error, data: {getIssues: climatePosts} } = useQuery(FETCH_CLIMATE_POSTS);


    // const renderClimatePosts = () => {
    //     if (data) {
    //         console.log(data);
            // data.map(eachPost => {
            //     return (
            //         <ClimatePost key={eachPost.id} eachPost={eachPost} />
            //     )
            // })
    //     }
    //     if (loading) {
    //         return <p>Loading...</p>
    //     }
    //     if (error) {
    //         return <p>Error</p>
    //     }
    // }
    if (climatePosts) {
        console.log(climatePosts);
    }
    // const allPosts = climatePosts.map(eachP => eachP);
    // console.log(allPosts);
    
    // const renderClimatePost = climatePosts.map(eachPost => {
    //     if (loading) {
    //         return <p>Loading...</p>;
    //     }
    //     return (
    //         <ClimatePost key={eachPost.id} eachPost={eachPost} />
    //     )
    // })
    // console.log(renderPosts);
    return (
        <div className="App">
            <h1>Welcome to Climate-forum</h1>

            {/* {renderClimatePost} */}

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
        createdAt
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
        
    }
}
`;
export default Home;