import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


import { gql, useQuery } from "@apollo/client"

/// type 'rfc' for 'react functional component' to auto-generate a new React Component

export default function ClimatePost({eachPost}) {
    return (
        <Grid item xs={8}>
            <Box>
                <div>
                    <img src={eachPost.image} alt={eachPost.username} />
                </div>

            </Box>
        </Grid>
    )
}
