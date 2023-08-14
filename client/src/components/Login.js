import React from "react";
import { Container } from "react-bootstrap";

export default function Login() {
    if (!window.PUBLIC_URL) {
        window.PUBLIC_URL = "http://localhost:3000"
    }
    const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=12e740c4bd6f472ea5c65c75fbe58a28&response_type=code&redirect_uri=${window.PUBLIC_URL}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

    return (
        <Container>
            <a className='btn btn-success' href={AUTH_URL}>
                Login with Spotify   
            </a>
        </Container>
    ); 
}