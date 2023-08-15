import React from 'react';
import { useState, useEffect } from'react';
import Playlist from './Playlist'
import Track from './Track';
import Savedtrack from './Savedtrack'
import Player from './Player';
import UserAuth from './UserAuth'; 
import SpotifyWebApi from 'spotify-web-api-node';
import { ButtonGroup, Container, Form } from "react-bootstrap";
import image from '../image/rainyPic.jpeg';

const spotifyApi = new SpotifyWebApi({
    clientId: '12e740c4bd6f472ea5c65c75fbe58a28'
})

export default function Mainpage({ code }) {
    const accessToken = UserAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingList, setPlayinglist] = useState()
    const [tracks, setTracks] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [savedTracks, setSavedTracks] = useState([])
    const [color, setColor] = useState("white")

    const changeColor = color => {
        setColor(color)
    }
    
    function choosePlaylist(playlist) {
        setPlayinglist(playlist)
        setSearch("")
    }

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch("")
    }

    function addToLibrary() {
        spotifyApi.addToMySavedTracks([playingTrack.id])
        .then(res => {
            console.log(res)
            console.log("current track added!")
        })
    }

    function showMyLibrary() {
        spotifyApi.getMySavedTracks({
            limit:10
        })
        .then(res => {
            console.log(res)
            console.log("Show my saved tracks!")
            setSavedTracks(res.body.items.map(item => {
                return {
                    id: item.track.id,
                    artist: item.track.artists[0].name,
                    image: item.track.album.images[2].url,
                    name: item.track.name,
                    uri: item.track.uri
                }
            }))
        })
    }

    function hideMyLibrary() {
        setSavedTracks([])
    }

    function deleteFromLibrary(track) {
        spotifyApi.removeFromMySavedTracks([track.id])
        .then(res => {
            console.log(res)
            console.log("Track removed!")
        })
    }

    useEffect(() => {
        if (!accessToken) return 
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        document.body.style.backgroundColor = color
    },[color])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return 
        spotifyApi.searchPlaylists(search)
        .then(res => {
            // console.log("hello")
            // console.log(res.body)
            setTracks([])
            setSearchResults(res.body.playlists.items.slice(0,10).map(playlist => {
                return  {
                    id: playlist.id,
                    name: playlist.name,
                    image: playlist.images[0].url,
                    uri: playlist.uri,
                }
            }))
        })
    }, [search, accessToken])

    useEffect(() => {
        if (!playingList) return 
        spotifyApi.getPlaylistTracks(playingList.id)
        .then(res => {
            console.log(res)
            setTracks(res.body.items.slice(0,10).map(item => {
                return {
                    id: item.track.id,
                    artist: item.track.artists[0].name,
                    image: item.track.album.images[2].url,
                    name: item.track.name,
                    uri: item.track.uri 
                }
            }))
        })
    },[playingList, accessToken])

    return (
        <div style={{backgroundImage: `url(${image})`, backgroundSize: 'cover', height: '200vh'}}>
        <Container>
            {/* <div>{code}</div> */}
            <button type="button" onClick={()=>{changeColor('#2daae5')}}>Start Music Journey</button>
            <header>
                <h1 style={{padding: '10px 20px', textAlign: 'center', color:'white', fontSize: '60px'}}>Welcome to your tailored music station!</h1>
                <h1 style={{padding: '10px 20px', textAlign: 'center', color:'white', fontSize: '50px'}}>What do you feel like listening today?</h1>
            </header>
            <Form.Control 
                type="search" 
                placeholder="Search what you want to listen now..." 
                value={search} 
                onChange={e => setSearch(e.target.value)}
            />
            <div>
                {searchResults.map(playlist => (
                    <Playlist playlist={playlist} choosePlaylist={choosePlaylist}/>
                ))}
            </div>
            <div>
                {tracks.map(track => (
                    <Track track={track} chooseTrack={chooseTrack}/>
                ))}
            </div>
            <div>
                <Player accessToken={accessToken} trackUri={playingTrack?.uri}/>
            </div>
            <ButtonGroup style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px 15px'}}>
                <button onClick={addToLibrary}>Add to my Music Library</button>
                <button onClick={showMyLibrary}>Show my Music Library</button>
                <button onClick={hideMyLibrary}>Hide my Music Library</button>
            </ButtonGroup>
            <div>
                <h3 style={{color: 'white'}}>Your Music Library</h3>
                {savedTracks.map(track => (
                    <Savedtrack track={track} chooseTrack={chooseTrack} deleteTrack={deleteFromLibrary} />
                ))}
            </div>
        </Container>
        </div>
    )
}
