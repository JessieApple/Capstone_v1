import React from "react";

export default function Playlist({ playlist, choosePlaylist }) {
    function handlePlaylist() {
        choosePlaylist(playlist)
    }
    return (
        <div onClick={handlePlaylist} style={{color: 'white', padding: '5px 10px'}}>
            <img src={playlist.image} height={64} width={64} alt="pic"/> {playlist.name}
        </div>
    )
}