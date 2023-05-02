import React from 'react'
import {Grid} from "@mui/material";
import DisplayCard from './DisplayCard';

const Dashboard = ({videos}) => {
  return (
    <div style={{backgroundColor:'#181818',marginTop:'0',marginRight:'150px',marginLeft:'150px'}}>
        <Grid
            style={{ marginTop: "15px", marginBottom: "15px" }}
            container
            spacing={{ xs: 2, md: 3 }}
            alignItems="stretch"
            >
                {videos && videos.length>0 &&(
                    videos.map((video) => (
                        <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={video._id}
                        >
                        <DisplayCard video={video}/>
                        </Grid>
                    ))
                )}
            </Grid>
    </div>
  )
}

export default Dashboard