
//fetching user info
export const fetchUserInfo = async (token) => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      const userData = response.json();
      return userData;  

    } catch (error) {
      console.error('Error:', error);
    }
  };




//fetching song item. if song not playing, no item returns
export const fetchNowPlaying = async (token) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };