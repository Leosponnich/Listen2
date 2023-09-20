import React from "react";
import './login.css';

function Login() {
    const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=feb8469a722140269123ab9f53988c75&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read%20playlist-modify-public%20playlist-modify-private"

    const handleLoginClick = () => {
        // Redirect to the Spotify authentication URL
        window.location.href = AUTH_URL;
    }

    return (
        <div className="main background">
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
            <button className="login_button" onClick={handleLoginClick}>Login with Spotify</button>
        </div>
    )
}

export default Login;
