import React from 'react'
import {useQuery} from "@apollo/client";
import { AuthContext } from '../context/Auth';
import {useContext} from 'react';

import LinearProgress from '@mui/material/LinearProgress';
import {FETCH_MY_POSTS} from '../util/graphql';
import ClimatePost from './ClimatePost';



export default function UserPosts() {

    const context = useContext( AuthContext); 

    const { loading, error, data } = useQuery(FETCH_MY_POSTS);
    console.log(data);
    return (
        <div className="App">
            {/* <div>
                {loading ? (
                    <div>
                        <LinearProgress />
                        <p>Loading...</p>
                    </div>
                ): (
                    data.getUserIssues.map(eachPost => {
                        console.log(eachPost)
                        return (
                            <ClimatePost key={eachPost.id} eachPost={eachPost} loading={loading}/>
                        )
                    })
                )}
            </div> */}

        </div>
    )
}
