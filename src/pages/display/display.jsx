import React, { useEffect, useState } from 'react';
import FloatingComponent from '../floating/floating';
import Dialog from '@mui/material/Dialog';
import './display.css';
import { exchangeCodeForToken, refreshhToken } from '../../spotify/auth/auth'; // Import token handling functions
import {fetchUserInfo, fetchNowPlaying} from '../../spotify/api/api';
import {sendDataToFirebase, fetchUsersFromFirebase} from '../../firebase/firebaseFunctions';

function Display(props) {
    //Dialog
    const [selectedData, setSelectedData] = useState(null);
    const [open, setOpen] = useState(false);

    //tokens
    const [accessToken, setAccessToken] = useState(null);
    const [expiresIn, setExpiresIn] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const {authCode} = props;

    //Userdata 
    const[user,setUser] = useState(null);
    const[song, setSong] = useState(null);
    const [userList, setUserList] = useState([]);
   
    //updating song when user changes
    const [countdown, setCountdown] = useState(120);
    const [first, setFirst] = useState(false);


      //clock for refreshing userSong
  useEffect(()=>{
    const interval = setInterval(() => {
      if(countdown>0){
        setCountdown(countdown-1);
      }
      else{
        clearInterval(interval);
      }
    },1000)
    return () => {
        clearInterval(interval);
    };
  },[countdown]);

    

  // Token exchange
  useEffect(() => {
    if (authCode) {
      exchangeCodeForToken(authCode)
        .then((data) => {
          setAccessToken(data.accessToken);
          setExpiresIn(data.expiresIn);
          setRefreshToken(data.refreshToken);
        })
        .catch((error) => {
          console.error('Error exchanging code for access token:', error);
        });
    }
  }, [authCode]);


    // Refreshing accessToken when access expires
    useEffect(() => {
      if (!expiresIn || !refreshToken) return;
      const interval = setInterval(() => {
        refreshhToken(refreshToken)
          .then((data) => {
            setAccessToken(data.accessToken);
            setExpiresIn(data.expiresIn);
            setRefreshToken(data.refreshToken);
          })
          .catch((error) => {
            console.error('Error refreshing token:', error);
          });
      }, (expiresIn - 60) * 1000);
    
      return () => clearInterval(interval);
    }, [expiresIn, refreshToken]);
    
  
//get data from users
  useEffect(()=>{
    if(!accessToken) return;
    const runFetchUserInfo = () => {
      fetchUserInfo(accessToken)
      .then((res) => {
        setUser(res);
      })
    }
    runFetchUserInfo();
    
  },[accessToken]);


  

  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken || !user) return;
  
      try {
        const res = await fetchNowPlaying(accessToken);
        const isPlaying = res && res.item;

        const artistNames = isPlaying ? res.item.artists.map((artist) => artist.name)
        : [];
  
        const newObj = {
          userSong: isPlaying ? res.item.name : "No song playing",
          userImg: user.images[1].url,
          userName: user.display_name,
          songPreview: isPlaying ? res.item.preview_url : "",
          albumImg: isPlaying? res.item.album.images[0].url : "",
          artistName: artistNames.join(', ')
        };
  
        setSong(isPlaying ? res : null);
        sendDataToFirebase(newObj);
      } catch (error) {
        console.error('Error fetching currently playing song:', error);
      }
    };
  
    if (!first || countdown === 0) {
      fetchUsers();
      fetchData();
      setFirst(true);
      setCountdown(120);
    }
  }, [accessToken, countdown, user]);
  

  //Dialog handlers
  const handleComponentClick = (data) => {
    setSelectedData(data);
    setOpen(true);
  }

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedData(null);
  }

  //fetching users from firebase
  const fetchUsers = async () => {
    const userDataArray = await fetchUsersFromFirebase();
    setUserList(userDataArray);
  };

 
 
  return (
  <div className="background">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <div>
      {userList.length > 0 ? (
        <div>
          {userList.map((user, index) => (
        <FloatingComponent
          key={index} // Make sure to use a unique key for each component
          data={{
            userSong: user.userSong,
            userImg: user.userImg,
            userName: user.userName,
            songPreview: user.songPreview,
            albumImg: user.albumImg,
            artistName: user.artistName
          }}
          onClick={handleComponentClick}
        />
      ))}
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      PaperProps={{
        sx:{
          width:'100vw',
          height:'80svh',
          borderRadius:'10%'
        }
      }}
      >
      <div className='floating-body'>
        <button className='exit-button' onClick={handleCloseDialog}>exit</button>
        <div className='floating-body-rows'>
        <div className='floating-body-column round-img'>
            <img alt='profile' src={selectedData? selectedData.userImg : ''} className='profile-img'/>
            <h2>{selectedData? selectedData.userName : ''}</h2>
            <p>Is listening to...</p>
        </div>
        <div className='floating-body-column'>
        <img alt='album' src={selectedData? selectedData.albumImg : ''} className='album-img'/>
        <div className='floating-body-text'>
        <h1>{selectedData? selectedData.userSong : ''}</h1>
        <p>{selectedData? selectedData.artistName : ""}</p>
        <audio src={selectedData? selectedData.songPreview : ''} controls autoPlay name='media' className='custom-audio'/>
          </div>
          </div>
          </div>
      </div>
    </Dialog>
        </div>
      ) : (
        <p className='loading'>Loading...</p>
      )}
    </div>
  </div>
  );
}

export default Display;
