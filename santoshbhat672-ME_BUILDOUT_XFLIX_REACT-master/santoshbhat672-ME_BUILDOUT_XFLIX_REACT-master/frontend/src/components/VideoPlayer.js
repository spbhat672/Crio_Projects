import React,{useState} from 'react';
import {
  Card,
  CardContent,  
  Typography,
  CardActionArea
} from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const VideoPlayer = ({video}) => {
  const { releaseDate } = video;
  const releaseDateTimeStamp = new Date(releaseDate).getTime();
  const currentTimeStamp = new Date().getTime();
  const diffInMs = currentTimeStamp - releaseDateTimeStamp;
  const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));
  const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));
  const [isUpVoteGiven,setIsUpVoteGiven] = useState(false);
  const [isDownVoteGiven,setIsDownVoteGiven] = useState(false);

  const getReleaseDateDisplayString = () => {
    if (diffInYears >= 1) {
      return `${diffInYears} years ago`;
    } else {
      return `${diffInMonths} months ago`;
    }
  }

  const upVote = {
    "vote": "upVote",
    "change": "increase"
   };

   const downVote = {
    "vote": "downVote",
    "change": "increase"
  };

  const voteFun = async(voteObj)=>{
      try{
        const url = `https://4e39e1f5-4b41-4105-a4af-b7a991a48cb9.mock.pstmn.io/v1/videos/${video._id}/votes`;
        const response = await axios.patch(url,voteObj);        
      }catch(error){
        console.log(error);
      }
  }

  const handleUpVote =()=>{
    debugger
    if(isUpVoteGiven)
       {
        video.votes.upVotes = video.votes.upVotes -1;
        setIsUpVoteGiven(false);
       }
       else{
        if(isDownVoteGiven){
          video.votes.downVotes = video.votes.downVotes-1;   
          setIsDownVoteGiven(false);       
        }
        video.votes.upVotes = video.votes.upVotes + 1;
        setIsUpVoteGiven(true);
       }
  }

  const handleDownVote =()=>{
    debugger
    if(isDownVoteGiven)
       {
        video.votes.downVotes = video.votes.downVotes -1;
        setIsDownVoteGiven(false);
       }
       else{
        if(isUpVoteGiven){
          video.votes.upVotes = video.votes.upVotes-1;   
          setIsUpVoteGiven(false);       
        }
        video.votes.downVotes = video.votes.downVotes + 1;
        setIsDownVoteGiven(true);
       }
  }

  return (
    <div style={{backgroundColor:'#181818',marginBottom:'5px',marginRight:'150px',marginLeft:'150px',marginTop:'20px'}}>
      <Card sx={{ maxWidth: '100%',maxHeight:700, border: "none", boxShadow: "none" }} className="card">
        <CardActionArea>
          <iframe src={`https://${video.videoLink}`} style={{ backgroundColor: '#181818', height: '500px', width: '100%' }} sandbox="allow-same-origin allow-forms allow-scripts" title={video.title}/>
          <CardContent sx={{ background: '#181818' }}>
            <Typography gutterBottom variant="h6" component="div" sx={{ color: 'white', textAlign: 'start'}}>
              {video.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ color: 'white', textAlign: 'start' }}>
              <div className='d-flex justify-content-between'>
                <div>
                {video.contentRating} · {video.viewCount+1} Views · {getReleaseDateDisplayString()} 
                </div>
                <div>
                  <button style={{backgroundColor:'#212529',borderRadius:'10px',color:'white',marginRight:'5px'}} 
                      onClick={()=> {voteFun(upVote);handleUpVote()}}>
                    <FontAwesomeIcon icon={faThumbsUp} /> {video.votes.upVotes}
                  </button>
                  <button style={{backgroundColor:'#212529',borderRadius:'10px',color:'white'}} 
                  onClick={()=> {voteFun(downVote);handleDownVote()}}>
                    <FontAwesomeIcon icon={faThumbsDown} />{video.votes.downVotes}
                  </button>
                </div>
              </div>
              <hr></hr>
            </Typography>                
          </CardContent>
        </CardActionArea>
      </Card> 
    </div>
  )
}

export default VideoPlayer