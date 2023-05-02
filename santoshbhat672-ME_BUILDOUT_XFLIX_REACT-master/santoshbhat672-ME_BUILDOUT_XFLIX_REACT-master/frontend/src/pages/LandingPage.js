import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Header from '../components/Header'
import Dashboard from '../components/Dashboard';
import GenrePanel from '../components/GenrePanel';
import ModalForm from '../components/ModalForm';


const LandingPage = () => {
  const [searchString, setSearchString] = useState("");  
  const [selectedGenres, setSelectedGenres] = useState(["All Genre"]);
  const [selectedOption, setSelectedOption] = useState('Release Date');
  const [selectedAgeGroup,setSelectedAgeGroup] = useState("Any age group");
  const [gridData,setGridData] = useState([]); 
  const [isModalVisible, setIsModalVisible] = useState(false); 

  const getAllData = async ()=>{
    try{
      const UrlforAllData = 'https://4e39e1f5-4b41-4105-a4af-b7a991a48cb9.mock.pstmn.io/v1/videos';
      const response = await axios.get(UrlforAllData);
      setGridData(response.data.videos);
      console.log(response.data.videos);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getAllData();
  },[]);

  const getDataBySortOrder = async(sortOrderr)=>{
    try{      
      let sortOrder = "releaseDate";
      if(sortOrderr === "View Count")
         sortOrder = "viewCount";
         console.log("update"+sortOrder);
      const Url = `https://4e39e1f5-4b41-4105-a4af-b7a991a48cb9.mock.pstmn.io/v1/videos?sortBy=${sortOrderr}`;
      const response = await axios.get(Url);
      setGridData(response.data.videos);
      console.log(response.data.videos);
    }catch(error){
      console.log(error);
    }
  }

  const getDataByGenre = async(selectedGenree)=>{
    try{      
      let str = '?genres=All';
      if(selectedGenree[0] !== "All Genre"){
        let genre = selectedGenree.join(",");
        str = `?genres=${genre}`;               
      }
      if(selectedAgeGroup !== "Any age group"){
        let group = selectedAgeGroup.replace('+','%2B');
        str += `&contentRating=${group}`          
      } 
      console.log(str);
      const Url = `https://4e39e1f5-4b41-4105-a4af-b7a991a48cb9.mock.pstmn.io/v1/videos${str}`;
      const response = await axios.get(Url);
      setGridData(response.data.videos);
      console.log(response.data.videos);
    }catch(error){
      console.log(error);
    }
  }

   const getDataByGroup = async(ageGroup)=>{
    debugger
    if(ageGroup !== "Any age group"){
      try{      
        let group = ageGroup.replace('+','%2B');
        let str = `?contentRating=${group}`;
        console.log(str);
        const Url = `https://4e39e1f5-4b41-4105-a4af-b7a991a48cb9.mock.pstmn.io/v1/videos${str}`;
        const response = await axios.get(Url);
        setGridData(response.data.videos);
        console.log(response.data.videos);
      }catch(error){
        console.log(error);
      }
    }else
      {
        try{      
          let str = '?genres=All';
          if(selectedGenres[0] !== "All Genre"){
            let genre = selectedGenres.join(",");
            str = `?genres=${genre}`;               
          }
          console.log(str);
          const Url = `https://4e39e1f5-4b41-4105-a4af-b7a991a48cb9.mock.pstmn.io/v1/videos${str}`;
          const response = await axios.get(Url);
          setGridData(response.data.videos);
          console.log(response.data.videos);
        }catch(error){
          console.log(error);
        }
      }
  }

  const handleSearch = async() => {
    if(searchString && searchString.length>0){
      let str = `?title=${searchString}`;
      if(selectedGenres[0] !== "All Genre"){
        let genre = selectedGenres.join(",");
        str += `&genres=${genre}`;
      }
      if(selectedAgeGroup !=="Any age group"){
        let group = selectedAgeGroup.replace('+','%2B');
        str += `&contentRating=${group}`;
      }
      try{
        const url = `https://4e39e1f5-4b41-4105-a4af-b7a991a48cb9.mock.pstmn.io/v1/videos${str}`;
        const response = await axios.get(url);
        setGridData(response.data.videos);
        console.log(response.data.videos);
      }catch(error){
        console.log(error);
      }
    }
    else
      getAllData();
  };

  const handleModalOpen = () => {
    setIsModalVisible(true);
    };
    
    const handleModalClose = () => {
    setIsModalVisible(false);
    };

    const handleFormSubmit = async(data)=>{
      try{
        const url = 'https://4e39e1f5-4b41-4105-a4af-b7a991a48cb9.mock.pstmn.io/v1/videos';
        const response = await axios.post(url,data);
        console.log(response.data);
      }catch(error){
        console.log(error);
      }
      handleModalClose();
    }

  return (
    <div className='d-flex flex-column'>
        <Header searchString={searchString} setSearchString={setSearchString} handleSearch={handleSearch} 
         isLandingPage={true} handleModalOpen={handleModalOpen}/>
        <GenrePanel 
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        selectedAgeGroup={selectedAgeGroup}
        setSelectedAgeGroup={setSelectedAgeGroup}
        getDataBySortOrder={getDataBySortOrder}
        getDataByGenre={getDataByGenre}
        getDataByGroup={getDataByGroup}
        />
        <Dashboard videos={gridData}/>   
        <ModalForm visible={isModalVisible} onCancel={handleModalClose} onCreate={handleFormSubmit}/>     
    </div>
  )
}

export default LandingPage