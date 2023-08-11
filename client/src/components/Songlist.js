// import React from 'react';

// const Songlist = (props) => {
//     return (
//         <div className="songlist">
//             {props.items.map(item => {
//                 return (
//                     <div className="song" key={item.track.id}>
//                         <img src={item.track.album.images[2].url} alt={item.track.name} />
//                         <div className="song-info">
//                             <h3>{item.track.name}</h3>
//                             <p>{item.track.artists[0].name}</p>
//                         </div>
//                     </div>
//                 )
//             })}
//         </div>
//     );
// }

// export default Songlist;

import React from "react"

export default function Songlist({ track, chooseTrack }) {
    function handlePlay() {
        chooseTrack(track)
    }
    return (
        <div onClick={handlePlay}>
            <img src={track.album} alt="album pic"/>
            <div>
                <div>{track.title}</div>
                <div>{track.artist}</div>
            </div>
        </div>
    )
}