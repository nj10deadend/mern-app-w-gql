/// type 'rfc' for 'react functional component' to auto-generate a new React Component
import {useState} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CreateComment from './CreateComment';

export default function ClimatePost({eachPost, loading}) {

    const [clicked, setClicked] = useState(false)
    const addIcon = <AddIcon />
    const minusIcon = <RemoveCircleOutlineIcon />

    // const buttonTxt = clicked ? "Hide Comments" : "Add Comment" ;
    // const buttonIcon = clicked ? minusIcon : addIcon;
    console.log(eachPost.upvotes);
    console.log(eachPost.downvotes);

    return (
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        >

            <Grid item xs={8} sx={{ borderColor: 'primary.main', borderRadius: 1 }}>
                <Box className="post-box" sx={{ borderColor: 'primary.main', borderRadius: 1 }}>
                    <p>@{eachPost.username} --{eachPost.createdAt}</p>
                    <Box>
                        <Typography variant='p' component='div' gutterBottom>post id: {eachPost.id}</Typography>
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
                                <p key={eachComment.username}> @{eachComment.username} : {eachComment.body} -- {eachComment.createdAt}</p>
                                <Typography  variant='hr' component='hr' gutterBottom></Typography>
                            </Box>
                        )
                    })
                )}
            </Grid>

            <Grid item xs={4} sx={{ borderColor: 'primary.main', borderRadius: 1 }}>

                {loading ? (
                    <div>
                        <LinearProgress />
                        <p>Loading...</p>
                    </div>
                ): (
                    eachPost.upvotes.map(eachUpvote => {
                        if (eachUpvote === []) {
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
                    
                )}
                {/* Working code */}
                {/* <div className="like-dislike-bttns">
                    <Button variant="contained" endIcon={<ThumbUpOffAltIcon />}></Button>
                    <Button variant="contained" color="error" endIcon={<ThumbDownOffAltIcon />}></Button>
                </div> */}
            </Grid>


        </Grid>

    )
}
