import React from 'react'
import {useQuery} from "@apollo/client";
import { AuthContext } from '../context/Auth';
import {useContext} from 'react';

import LinearProgress from '@mui/material/LinearProgress';
import { FETCH_MY_POSTS } from '../util/graphql';
import ClimatePost from './ClimatePost';


export default function UserPosts() {

    const context = useContext( AuthContext); 

    const { loading, error, data } = useQuery(FETCH_MY_POSTS);
    console.log(data);

    if (loading) {
        return (
            <div>
                <LinearProgress />
                <p>Loading...</p>
            </div>
        )
    } else if (error) {
        return `Error! ${error.message}`
    } else return (
        <div className="App">
            <div>
                {loading ? (
                    <div>
                        <LinearProgress />
                        <p>Loading...</p>
                    </div>
                ): (
                    data.getUserIssues.map(eachPost => {
                        console.log(eachPost)
                        return (
                            <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            >
                    
                                <Grid item xs={8} sx={{ borderColor: 'primary.main', borderRadius: 1 }}>
                                    <Box className="post-box" sx={{ borderColor: 'primary.main', borderRadius: 1 }}>
                                        <p><strong>@{eachPost.username}</strong> : {eachPost.createdAt}</p>
                                        <Box>
                                            <Typography className="post-id" variant='p' component='div' gutterBottom>post id: {eachPost.id}</Typography>
                                            <img className="post-imgs"src={eachPost.image} alt={eachPost.username} />
                                        </Box>
                                        <p>{eachPost.details}</p>
                    
                                        <CreateComment />
                    
                                        <Typography variant='hr' component='hr' gutterBottom></Typography>
                    
                                    </Box>
                                    {loading ? (
                                        <div>
                                            <LinearProgress />
                                            <p>Loading...</p>
                                        </div>
                                    ): (
                                        eachPost.comments.map(eachComment => {
                                            if (eachComment === []) {
                                                return <div>
                                                </div>
                                            } else return (
                                                <Box sx={{ borderColor: 'primary.main', borderRadius: 1 }} >
                                                    <p key={eachComment.username}> <strong>@{eachComment.username}</strong> : {eachComment.body} -- {eachComment.createdAt}</p>
                                                    <Typography  variant='hr' component='hr' gutterBottom></Typography>
                                                </Box>
                                            )
                                        })
                                    )}
                                </Grid>
                    
                                <Grid item xs={4} sx={{ borderColor: 'primary.main', borderRadius: 1 }}>

                                </Grid>
                    
                    
                            </Grid>
                    
                        )
                    })
                )}
            </div>

        </div>
    )
}
