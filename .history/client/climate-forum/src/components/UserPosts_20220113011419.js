import React from 'react'
import {FETCH_MY_POSTS} from '../util/graphql';


export default function UserPosts() {

    const { loading, error, data } = useQuery(FETCH_MY_POSTS);
    return (
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
                            <ClimatePost key={eachPost.id} eachPost={eachPost} loading={loading}/>
                        )
                    })
                )}
            </div>

        </div>
    )
}
