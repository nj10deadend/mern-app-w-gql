/// type 'rfc' for 'react functional component' to auto-generate a new React Component
import {useState} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CreateComment from './CreateComment';
import UpDownVote from './UpDownVote';

export default function ClimatePost({eachPost, loading}) {

    console.log(eachPost.upvotes.map(eachU => console.log(eachU.count)));
    console.log(eachPost.downvotes.count);

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

                {/* Working code */}
                {/* <div className="like-dislike-bttns">
                    <Button variant="contained" endIcon={<ThumbUpOffAltIcon />}></Button>
                    <Button variant="contained" color="error" endIcon={<ThumbDownOffAltIcon />}></Button>
                </div> */}
                <UpDownVote />
            </Grid>


        </Grid>

    )
}
