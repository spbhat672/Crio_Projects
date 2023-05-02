import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React,{ useEffect, useState } from "react";
import "./Header.css";
import { useHistory } from "react-router-dom";

const Header = ({ children, hasHiddenAuthButtons }) => {

  const history = useHistory();
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem('username') && localStorage.getItem('token'))
       setIsLoggedIn(true);
    else 
      setIsLoggedIn(false);
  },[])

  const handleLogoutClick = ()=>{
    localStorage.removeItem('username');
    localStorage.removeItem('balance');
    localStorage.removeItem('token');
    history.push("/");
    window.location.reload();
  }

  const handleLoginClick =()=>
  {
    history.push("/login");
  }

  const handleRegisterClick =()=>
  {
    history.push("/register");
  }

  const handleExploreClick =()=>
  {
    history.push("/");
  }
  
  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      <Box>
        {children}
      </Box>
      <div>
        <div className="my-flex-container">
          {!hasHiddenAuthButtons && (
              <>
              <Button
              className="explore-button"
              variant="text"
              onClick={handleLoginClick}
            >
              LOGIN
            </Button>
                <Button className="auth-button" variant="contained" onClick={handleRegisterClick}>
                  REGISTER
                </Button>
              </>
            )}  
        </div>          

        <div>
        {(isLoggedIn===false && hasHiddenAuthButtons!==false) ?(<Button
              className="explore-button"
              startIcon={<ArrowBackIcon />}
              variant="text"
              onClick={handleExploreClick}
            >
              Back to explore
            </Button>):(<div></div>)}
        </div>      

        <div className="my-flex-container">
        {(isLoggedIn === true && hasHiddenAuthButtons!==false)?
            (
              <>
                <Avatar
                  alt={localStorage.getItem('username')}
                  src="avatar.png"
                  sx={{ width: 40, height: 40 }}
                />
                {localStorage.getItem('username')}
                <Button
                  className="explore-button"
                  variant="text"
                  onClick={handleLogoutClick}
                >
                  LOGOUT
                </Button>
              </>
            ): <></>}  
        </div>               
      </div>     

    </Box>
  );
};

export default Header;
