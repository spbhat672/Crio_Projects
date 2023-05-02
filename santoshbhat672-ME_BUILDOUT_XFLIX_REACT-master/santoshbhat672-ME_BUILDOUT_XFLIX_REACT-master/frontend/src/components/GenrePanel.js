import React,{ useState } from 'react'
import '../styles/GenrePanel.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import { makeStyles } from '@material-ui/core/styles';

const GenrePanel = ({selectedGenres,setSelectedGenres,selectedOption,setSelectedOption,selectedAgeGroup,setSelectedAgeGroup,
  getDataBySortOrder,getDataByGenre,getDataByGroup}) => {

    function handleSelectChange(e) {
      setSelectedOption(e.target.value);
      getDataBySortOrder(e.target.value);
    }

    const handleClick = (genre) => {
        if (genre === "All Genre") {
          setSelectedGenres(["All Genre"]);
          getDataByGenre(["All Genre"])
        } else {
          const index = selectedGenres.indexOf(genre);
          if (index === -1) {
            const genreArr = selectedGenres.includes("All Genre")? [genre] : [...selectedGenres,genre];
            setSelectedGenres(genreArr);
            getDataByGenre(genreArr);
          } else {
            if(selectedGenres.length === 1 && !selectedGenres.includes("All Genre"))
            {
              setSelectedGenres(["All Genre"]);
              getDataByGenre(["All Genre"]);
            }              
            else{
              setSelectedGenres((prevSelectedGenres) =>
                   prevSelectedGenres.filter((g) => g !== genre)
                 );
              getDataByGenre(selectedGenres.filter((g) => g !== genre));
            }            
          }
        }
      };      

      const renderGenreButton = (genre) => {
        const isSelected = selectedGenres.includes(genre);
        return (
          <button
            key={genre}
            onClick={() => {handleClick(genre)}}
            className="genre-button"
            style={{
              backgroundColor: isSelected ? "white" : "transparent",
              color: isSelected ? "black" : "white",
              borderRadius: isSelected ? "20px" : "0",
              padding: "5px 15px",
              fontWeight: isSelected ? "bold" : "normal"
            }}
          >
            {genre}
          </button>
        );
      };

      const genres = ["All Genre", "Education", "Sports", "Comedy", "Lifestyle"];

      const useStyles = makeStyles((theme) => ({
        select: {
          borderRadius: '20px',
          backgroundColor: '#fff',
          marginLeft:'40px',
          color: '#000',
          '&:before': {
            borderBottom: 'none',
          },
          '&:after': {
            borderBottom: 'none',
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottom: 'none',
          },
          '&:focus': {
            borderRadius: '20px',
            backgroundColor: '#fff',
            color: '#000',
          },
        },
        input: {
          paddingLeft: theme.spacing(2),
        },
      }));      
      
      const classes = useStyles();

      const ageGroups = ["Any age group", "7+", "12+", "16+", "18+"];

      const renderAgeGroupButton = (ageGroup) => {
        const isSelected = selectedAgeGroup === ageGroup;
        return (
          <button
            key={ageGroup}
            onClick={() => {setSelectedAgeGroup(ageGroup);getDataByGroup(ageGroup)}}
            className="genre-button"
            style={{
              backgroundColor: isSelected ? "white" : "transparent",
              color: isSelected ? "black" : "white",
              borderRadius: isSelected ? "20px" : "0",
              padding: "5px 15px",
              fontWeight: isSelected ? "bold" : "normal"
            }}
          >
            {ageGroup}
          </button>
        );
      };

  return (
    <div className='genre-panel-bg'>
        <div className='firstline'>
            <div className="genre-panel">
            {genres.map((genre) => renderGenreButton(genre))}
             <Select                
                onChange={handleSelectChange}
                className={classes.select}
                value={selectedOption}
                startAdornment={<SwapVertIcon />}                
              >
                <MenuItem value="Release Date">Release Date</MenuItem>
                <MenuItem value="View Count">View Count</MenuItem>                
              </Select>
            </div>                   
        </div>
        <div className='row'>
           <div className="age-group-panel">
            {ageGroups.map((group) => renderAgeGroupButton(group))}
            </div> 
        </div>
    </div>
  )
}

export default GenrePanel