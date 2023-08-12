import React from "react"

export default function Track({ track, chooseTrack }) {
    function handlePlay() {
        chooseTrack(track)
    }
    return (
        <div onClick={handlePlay} className="d-flex m-2 align-items-center">
            <img src={track.image} alt="pic"/>
            <div className="ml-3" style={{color: 'white', padding: '5px 10px'}}>
                <div>{track.artist}</div>
                <div>{track.name}</div>
            </div>
        </div>
    )
}