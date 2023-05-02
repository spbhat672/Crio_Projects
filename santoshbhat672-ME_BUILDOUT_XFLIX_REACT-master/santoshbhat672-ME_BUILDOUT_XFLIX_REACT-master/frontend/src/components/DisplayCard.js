import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import '../styles/DisplayCard.css';

const DisplayCard = ({video}) => {
  const { previewImage, releaseDate, title,_id } = video;
  const releaseDateTimeStamp = new Date(releaseDate).getTime();
  const currentTimeStamp = new Date().getTime();
  const diffInMs = currentTimeStamp - releaseDateTimeStamp;
  const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));
  const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));
  const navigate = useNavigate(); 

  const getReleaseDateDisplayString = () => {
    if (diffInYears >= 1) {
      return `${diffInYears} years ago`;
    } else {
      return `${diffInMonths} months ago`;
    }
  }

  const handleClick = ()=>{        
    const path = `/video/${_id}`; 
    navigate(path);
  }

  return (
    <div onClick={()=>handleClick()}>
      <Card sx={{ maxWidth: 345, border: "none", boxShadow: "none" }} className="card">
        <CardActionArea>
          <CardMedia component="img" height="140" image={previewImage} alt={title} />
          <CardContent sx={{ background: '#181818' }}>
            <Typography gutterBottom component="div" sx={{ color: 'white', textAlign: 'start' }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ color: 'white', textAlign: 'start' }}>
              {getReleaseDateDisplayString()}
            </Typography>                
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default DisplayCard;
