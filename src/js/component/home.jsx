import React, { useRef, useState, useEffect } from "react";
import "../../styles/index.css";

export default function ReproductorAudio() {
    const [songs, setSongs] = useState([]);
    const [songActual, setSongActual] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const playerRef = useRef(null);

    useEffect(() => {
      const hostSong = async () => {
        const response = await fetch("https://playground.4geeks.com/sound/songs");
        const data = await response.json();
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
      playerRef.current.play();
      setIsPlaying(true);
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
        <div className="reproductor">
          <div className="button">
          {songs.length > 0 && (
            <h2>Reproduciendo: {songs[songActual].name}</h2>
          )}
            <div >
                <button onClick={playPreviousSong}><i className="fa-solid fa-backward fa-2x"></i></button>
                <button onClick={() => playSong(songActual)}><i className="fa-solid fa-play fa-2x"></i></button>
                <button onClick={playNextSong}><i className="fa-solid fa-forward fa-2x"></i></button>
            </div>
          </div>
        </div>
          <audio ref={playerRef} />
        </div>
  );
}