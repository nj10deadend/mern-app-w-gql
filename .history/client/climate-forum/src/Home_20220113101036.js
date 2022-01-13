import { AuthContext } from './context/Auth';
import {useContext} from 'react';

import {useQuery} from "@apollo/client";

import LinearProgress from '@mui/material/LinearProgress';
import ClimatePost from './components/ClimatePost';
import CreateIssue from './components/CreateIssue';

import {FETCH_CLIMATE_POSTS} from './util/graphql'


function Home () {

    const context = useContext(AuthContext);
    const { loading, error, data } = useQuery(FETCH_CLIMATE_POSTS);

    return (
        
        <div className="App">
            <div>
                {/* <LinearProgress /> */}
                <br></br>
                <br></br>
                {context.user && (
                    <CreateIssue />
                )}
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

        </div>
    )
}

export default Home;