import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';


import { gql, useQuery } from "@apollo/client"

/// type 'rfc' for 'react functional component' to auto-generate a new React Component

export default function ClimatePost({eachPost}) {
    console.log(eachPost);
    return (
        <Box className="climate-post-container">

            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Box>
                        <p>@{eachPost.username}</p>
                        <div>
                            <img className="post-imgs"src={eachPost.image} alt={eachPost.username} />
                        </div>
                        <p>{eachPost.details}</p>

                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <div className="like-dislike-bttns">
                        <Button variant="contained" endIcon={<ThumbUpOffAltIcon />}></Button>
                        <Button variant="contained" endIcon={<ThumbDownOffAltIcon />}></Button>
                    </div>

                    <p>Date: {eachPost.createdAt}</p>

                </Grid>

            </Grid>
        </Box>
    )
}
