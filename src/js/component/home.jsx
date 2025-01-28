import React, { useRef, useState, useEffect } from "react";
import "../../styles/index.css";

export default function ReproductorAudio() {
    const [songs, setSongs] = useState([]);
    const [songActual, setSongActual] = useState(null);
    const playerRef = useRef(null);

    useEffect(() => {
      const hostSong = async () => {
        const response = await fetch("https://playground.4geeks.com/sound/songs");
        const data = await response.json();
        console.log(data)
        setSongs(data.songs);
      };
      hostSong();
    }, [])
    

    const playSong = (index) => {
      if (playerRef.current) {
        playerRef.current.pause();
      }
      setSongActual(index);
      playerRef.current = new Audio(songs[index].url);
      playerRef.current.play()
    };

    const playNextSong = () => {
      const nextSong = (songActual + 1 ) % songs.length;
      playSong(nextSong);
    };

    const playPreviousSong = () => {
      const previousSong = (songActual - 1 + songs.length) % songs.length;
      playSong(previousSong);
    }


    return (
      <div className="ReproductorAudio">
        <h1>Reproductor de Audio</h1>
        <ul>
        {songs.map((song, index) => (
          <li key={index} onClick={() => playSong(index)}>
            {song.name}
          </li>
        ))}
        </ul>
        {songActual !== null && (
          <div>
            <h2>Reproduciendo: {songs[songActual].name}</h2>
          </div>
        )}
          <div>
            <button onClick={playPreviousSong}>Anterior</button>
            <button onClick={playSong}>play</button>
            <button onClick={playNextSong}>Siguiente</button>
          </div>
        </div>
      
  );
}








