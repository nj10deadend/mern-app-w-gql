/// type 'rfc' for 'react functional component' to auto-generate a new React Component
import {useState} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import AddIcon from '@mui/icons-material/Add';


// import { gql, useQuery } from "@apollo/client"


export default function ClimatePost({eachPost, loading}) {
    // console.log(eachPost);
    const [clicked, setClicked] = useState(false)
    // const addIcon = <AddIcon />

    const buttonTxt = clicked ? "Hide Comments" : "Add Comment" ;

    const renderComments = eachPost.comments.map(eachComment => {
        if (!eachComment) {
            return <div>
                <small>This post has no comments yet</small>
            </div>
        } else return (
            <Box sx={{ borderColor: 'primary.main' }, { borderRadius: 1 }}>
                <p>by: {eachComment.username}</p>
                <p>time: {eachComment.createdAt}</p>
                <body>
                    {eachComment.body}
                </body>
            </Box>
        )
    })
    console.log(eachPost.comments);
    return (
        // <Box className="climate-post-container">

        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Box sx={{ borderColor: 'primary.main' }, { borderRadius: 1 }}>
                    <p>@{eachPost.username}</p>
                    <div>
                        <img className="post-imgs"src={eachPost.image} alt={eachPost.username} />
                    </div>
                    <p>{eachPost.details}</p>
                </Box>
                <Button onClick={() => setClicked(!clicked)}variant="contained" endIcon={<AddIcon />}>{buttonTxt}</Button>
                {/* {clicked && (
                )} */}
                {loading ? (
                    <p>Loading...</p>
                ): (
                    eachPost.comments.map(eachComment => {
                        if (eachComment === undefined) {
                            return <div>
                                <small>This post has no comments yet</small>
                            </div>
                        } else return (
                            <Box sx={{ borderColor: 'primary.main' }, { borderRadius: 1 }}>
                                <p>by: {eachComment.username}</p>
                                <p>time: {eachComment.createdAt}</p>
                                <body>
                                    {eachComment.body}
                                </body>
                            </Box>
                        )
                    })
                )}
            </Grid>
            <Grid item xs={4}>
                <div className="like-dislike-bttns">
                    <Button variant="contained" endIcon={<ThumbUpOffAltIcon />}></Button>
                    <Button variant="contained" color="error" endIcon={<ThumbDownOffAltIcon />}></Button>
                </div>

                <p>Date: {eachPost.createdAt}</p>

            </Grid>

        </Grid>

    )
}
