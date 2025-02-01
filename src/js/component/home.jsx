import React, { useRef, useState, useEffect } from "react";
import "../../styles/index.css";

export default function ReproductorAudio() {
    const [songs, setSongs] = useState([]);
    const [songActual, setSongActual] = useState(0);
    const playerRef = useRef(null);

    useEffect(() => {
      const hostSong = async () => {
        const response = await fetch("https://playground.4geeks.com/sound/songs");
        const data = await response.json();
        console.log(data)
        const updatedSongs = data.songs.map( song => ({
          ...song, 
          url: `https://playground.4geeks.com${song.url}`
        }));
        setSongs(updatedSongs);
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
        {songs
        .map((song, index) => (
          <li key={index} onClick={() => playSong(index)}>
            {song.name}
          </li>
        ))}
        </ul>
        {songActual ? (
          <div>
            <h2>Reproduciendo: {songs[songActual].name}</h2>
          </div>
        ) : null}
          <div>
            <button onClick={playPreviousSong}>Anterior</button>
            <button onClick={() => playSong(songActual)}>play</button>
            <button onClick={playNextSong}>Siguiente</button>
          </div>
          <audio ref={playerRef} />
        </div>
      
  );
}