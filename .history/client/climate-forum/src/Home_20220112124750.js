import { BrowserRouter } from 'react-router-dom';
import { Route, Routes} from 'react-router-dom';
// import { gql, useQuery } from "@apollo/client"
import {useQuery} from "@apollo/client";
import gql from 'graphql-tag';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';



import Login from './components/Login';
import Registration from './components/Registration';
import ClimatePost from './components/ClimatePost';


function Home () {

    let FETCH_CLIMATE_POSTS = gql`
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
        }
    }`;

    const { loading, error, data } = useQuery(FETCH_CLIMATE_POSTS);

    console.log(loading);
    return (
        <div className="App">
            <h1>Welcome to Climate-forum</h1>
            {loading ? (
                <div>
                    <LinearProgress />
                    <p>Loading...</p>
                </div>
            ): (
                data.getIssues.map(eachPost => {
                    console.log(eachPost)
                    return (
                        <ClimatePost key={eachPost.id} eachPost={eachPost} loading={loading}/>
                    )
                })
            )}

        </div>
    )
}

export default Home;