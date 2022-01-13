import React from 'react'
import { gql, useMutation } from '@apollo/client';
import {useState} from 'react';
import { AuthContext } from '../context/Auth';
import {useContext} from 'react';
import {FETCH_CLIMATE_POSTS} from '../util/graphql';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';


// WHEN YOU HAVE AN INVALID HEADERS ERROR CHANGE YOUR APOLLO PROVIDER HEADER FUNCTION

function UpDownVote({eachPost, eachPostId, loading}) {
    console.log(eachPostId);
    
    // const [issueId, setIssueId] = useState('');


    const UPVOTE_ISSUE = gql`
        mutation upvoteIssue(
            $issueId: ID!
        ) {
            upvoteIssue(
                issueId: $issueId
            ) {
                id 
                username 
                details
                comments{
                    id
                    body
                    username
                    createdAt
                }
                upvotes{
                    username
                    count
                }
                createdAt
            }
        }
    `;
    const DOWNVOTE_ISSUE = gql`
    mutation downvoteIssue(
        $issueId: ID!
    ) {
        downvoteIssue(
            issueId: $issueId
        ) {
            id 
            username 
            details
            comments{
                id
                body
                username
                createdAt
            }
            upvotes{
                username
                count
            }
            createdAt
        }
    }
`;
    /// count of upvotes and downvotes is equal to upvotes.length

    const [addUpvote, {error}] = useMutation(UPVOTE_ISSUE, {
        update(proxy, result) {
            console.log(result.data.upvoteIssue);
            const data = proxy.readQuery({
                query: FETCH_CLIMATE_POSTS
            })
            let newData = [...data.getIssues]
            console.log(newData);
            newData = [result.data.upvoteIssue, ...newData];
            proxy.writeQuery({
                query: FETCH_CLIMATE_POSTS,
                data: {
                ...data,
                getIssues: {
                    newData,
                },
                },
            });
        },
        variables: {issueId: eachPostId}
    });

    const [addDownvote] = useMutation(DOWNVOTE_ISSUE, {
        update(proxy, result) {
            console.log(result.data.downvoteIssue);
            const data = proxy.readQuery({
                query: FETCH_CLIMATE_POSTS
            })
            let newData = [...data.getIssues]
            console.log(newData);
            newData = [result.data.downvoteIssue, ...newData];
            proxy.writeQuery({
                query: FETCH_CLIMATE_POSTS,
                data: {
                ...data,
                getIssues: {
                    newData,
                },
                },
            });
        },
        variables: {issueId: eachPostId}
    });

    function handleUpvote (event) {
        event.preventDefault();
        addUpvote();
    }
    function handleDownvote (event) {
        event.preventDefault();
        addDownvote();
    }

    const totalUpvotes = eachPost.upvotes.length;
    const totalDownvotes = eachPost.downvotes.length;
    return (
        <div>
            <div className="like-dislike-bttns">
                <Button onClick={(event) => handleUpvote(event)} variant="contained" endIcon={<ThumbUpOffAltIcon />}></Button>
                <Button onClick={(event) => handleDownvote(event)} variant="contained" color="error" endIcon={<ThumbDownOffAltIcon />}></Button>
            </div>
            {loading ? (
                    <div>
                        <LinearProgress />
                        <p>Loading...</p>
                    </div>
                ): (
                    <Box>
                        <div className="like-dislike-bttns">
                            <p>{totalUpvotes}</p>
                            <Button variant="contained" endIcon={<ThumbUpOffAltIcon />}></Button>
                        </div>
                        <div className="like-dislike-bttns">
                            <p>{totalDownvotes}</p>
                            <Button variant="contained" color="error"endIcon={<ThumbDownOffAltIcon />}></Button>
                        </div>
                    </Box>
                    
                    
                )}

                {loading ? (
                    <div>
                        <LinearProgress />
                        <p>Loading...</p>
                    </div>
                ): (
                    eachPost.downvotes.map(eachDownvote => {
                        if (eachDownvote === []) {
                            return <div>
                                <Button variant="contained" color="error" endIcon={<ThumbDownOffAltIcon />}></Button>
                            </div>
                        } else return (
                            <Box className="votes-container" sx={{ borderColor: 'primary.main', borderRadius: 1 }} >
                                <p key={eachDownvote.username}> {eachDownvote.count}</p>
                                <Button variant="contained" color="error" endIcon={<ThumbDownOffAltIcon />}></Button>
                            </Box>
                        )
                    })
                    
                )}
            
        </div>
    )
}
export default UpDownVote;
