import React,{useEffect,useState} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import VideoPlayer from '../components/VideoPlayer';

const VideoPage = () => {
    const params = useParams();
    const [selectedVideo,setSelectedVideo] = useState("");
    const [gridVideos,setGridVideos] = useState([]);

    const getAllData = async ()=>{
        try{
          const UrlforAllData = 'https://4e39e1f5-4b41-4105-a4af-b7a991a48cb9.mock.pstmn.io/v1/videos';
          const response = await axios.get(UrlforAllData);
          const data = response.data.videos.filter(x=> x._id !== params.videoId);
          setGridVideos(data);
        }catch(error){
          console.log(error);
        }
      }

      const getSelectedVideoData = async ()=>{
        try{
          const url = `https://4e39e1f5-4b41-4105-a4af-b7a991a48cb9.mock.pstmn.io/v1/videos/${params.videoId}`;
          const response = await axios.get(url);
          console.log(response.data);
          setSelectedVideo(response.data);

          const increaseViewCountUrl = `https://4e39e1f5-4b41-4105-a4af-b7a991a48cb9.mock.pstmn.io/v1/videos/${params.videoId}/views`;
          const viewCountRes = await axios.patch(increaseViewCountUrl);
          console.log(viewCountRes.data);
        }catch(error){
          console.log(error);
        }
      }

      useEffect(()=>{
        getAllData();
        getSelectedVideoData();
      },[params]);

  return (
    <div className='d-flex flex-column'>
       <Header/>
       {selectedVideo &&  (
        <VideoPlayer video={selectedVideo}/>
       )}
       <Dashboard videos={gridVideos}/>
    </div>
  )
}

export default VideoPage