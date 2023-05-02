import React,{useState,useRef} from 'react';
import '../styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const Header = ({searchString,setSearchString,handleSearch,isLandingPage,handleModalOpen}) => {  

  return (
    <div className='header-bg' style={{marginBottom:'0'}}>
      <div className='d-flex justify-content-between p-2'>
         <div className='d-flex flex-row'>
            <span className='text-x'>X</span>
            <span className='text-flix'>Flix</span>
         </div>
         {isLandingPage && (
          <div className="search-container">
              <input
                  className="search-input"
                  type="text"
                  placeholder="Search"
                  value={searchString}
                  onChange={(event)=>setSearchString(event.target.value)}           
              />
              <button className="search-button" onClick={() =>handleSearch()}>
              <FontAwesomeIcon icon={faSearch} />
              </button>
          </div>
         )}
        {isLandingPage && (
          <div>
            <button className='upload-button' onClick={handleModalOpen}>
              <FontAwesomeIcon icon={faUpload} style={{marginRight:'5px'}}/>
              Upload
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header