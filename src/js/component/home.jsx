import React, { useRef, useState, useEffect } from "react";
import "../../styles/index.css";

const host = "https://assets.breatheco.de/apis/sound/";
const songs = [
  {
    id: 0,
    category: "game",
    name: "Mario Castle",
    url: "files/mario/songs/castle.mp3"
  },
  {
    id: 1,
    category: "game",
    name: "Mario Star",
    url: "files/mario/songs/hurry-starman.mp3"
  },
  {
    id: 2,
    category: "game",
    name: "Mario Overworld",
    url: "files/mario/songs/overworld.mp3"
  }
];
export default function App() {
  const [current, setCurrent] = useState(0);
  const myPlayer = useRef(null);

  useEffect(() => {
    myPlayer.current = new Audio();
  }, []);
  const loadSong = (index) => {
    setCurrent(index);
    myPlayer.current.src = host + songs[current].url;
    myPlayer.current.play();
  };

  return (
    <div className="App">
      {songs.map((s, i) => (
        <li key={i}>
          {i === current && "(playing)"} {s.name}
        </li>
      ))}
      <div>
        <button
          onClick={() => loadSong(current > 0 ? current - 1 : songs.length - 1)}
        >
          prev
        </button>
        <button onClick={() => loadSong(current)}>play</button>
        <button
          onClick={() =>
            loadSong(current >= songs.length - 1 ? 0 : current + 1)
          }
        >
          next
        </button>
      </div>
    </div>
  );
}

