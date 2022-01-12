import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';


import { gql, useQuery } from "@apollo/client"

/// type 'rfc' for 'react functional component' to auto-generate a new React Component

export default function ClimatePost({eachPost}) {
    return (
    <>
        <Grid item xs={8}>
            <Box>
                <div>
                    <img src={eachPost.image} alt={eachPost.username} />
                </div>
                <p>{eachPost.details}</p>

            </Box>
        </Grid>
        <Grid item xs={4}>
            <p>Date: {eachPost.createdAt}</p>

        </Grid>
    </>
    )
}
