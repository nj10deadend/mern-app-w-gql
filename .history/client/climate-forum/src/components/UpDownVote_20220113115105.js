import React from 'react'
import {useState} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

function UpDownVote() {
    return (
        <div>
            <div className="like-dislike-bttns">
                <Button variant="contained" endIcon={<ThumbUpOffAltIcon />}></Button>
                <Button variant="contained" color="error" endIcon={<ThumbDownOffAltIcon />}></Button>
            </div>
            {/* {loading ? (
                    <div>
                        <LinearProgress />
                        <p>Loading...</p>
                    </div>
                ): (
                    eachPost.upvotes.map(eachUpvote => {
                        if (eachUpvote.count === []) {
                            return <div>
                                <Button variant="contained" endIcon={<ThumbUpOffAltIcon />}></Button>
                            </div>
                        } else return (
                            <Box className="votes-container" sx={{ borderColor: 'primary.main', borderRadius: 1 }} >
                                <p key={eachUpvote.username}> {eachUpvote.count}</p>
                                <Button variant="contained" endIcon={<ThumbUpOffAltIcon />}></Button>
                            </Box>
                        )
                    })
                    
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
                    
                )} */}
            
        </div>
    )
}
export default UpDownVote;
