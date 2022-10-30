import "./Player.scss";

// assets
import elipsis from "../../assets/horizontal-elipsis.svg";
import previous from "../../assets/previous.svg";
import next from "../../assets/next.svg";
import play from "../../assets/play.svg";
import pause from "../../assets/pause.svg";
import volume from "../../assets/volume.svg";
import { useEffect, useState } from "react";

function Player(props) {
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  // const [songState, setSongState] = useState(0);
  const [seekPosition, setSeekPosition] = useState(0);
  function toggleSong() {
    if (isSongPlaying) {
      document.querySelector('#audio-player').pause();
      setIsSongPlaying(false);
    }
    else {
      document.querySelector('#audio-player').play();
      setIsSongPlaying(true);
    }
  }

  function seek(e) {
    // setSongState(Number(e.target.value));
    document.querySelector('#audio-player').currentTime = Number(e.target.value);
  }

  function updateSongTime(e) {
    setSeekPosition(Number(e.target.currentTime));
  }

  useEffect(function () {
    document.querySelector('#audio-player').currentTime = 0;
    document.querySelector('#audio-player').pause();
    setIsSongPlaying(false);
    setSeekPosition(0);
    // setSongState(0);
  }, [props.song]);

  return (
    <main className="Player">
      <audio src={props.song?.url} id="audio-player" onTimeUpdate={updateSongTime}></audio>
      <header className="header">
        <h2>{props.song?.title || 'Song Not Selected'}</h2>
        <h3>{props.song?.artist || 'No Artist'}</h3>
      </header>

      <section className="player-controller">
        <div className="song-banner-container">
          <img src={props.song?.photo || 'https://picsum.photos/id/239/800/800'} alt="Song Banner" className="hero" />
          {/* props.song.url */}
        </div>
        {/* hard-coding max since the duration received in API is incorrect */}
        <input
          className="song-seeker"
          type="range"
          name="vol"
          min="0"
          max="217"
          value={seekPosition}
          onChange={seek}
        ></input>

        <section className="controls-footer">
          <button className="elipsis">
            <img src={elipsis} alt="Menu" />
          </button>

          <div className="controls">
            <button disabled={!props.song}>
              <img src={previous} alt="Pevious" />
            </button>
            <button disabled={!props.song} onClick={toggleSong}>
              {/* <img src={play} alt="Play" /> */}
              <img src={isSongPlaying ? pause : play} alt="Pause" />
            </button>
            <button disabled={!props.song}>
              <img src={next} alt="Next" />
            </button>
          </div>

          <button className="volume">
            <img src={volume} alt="Volume" />
          </button>
        </section>
      </section>
    </main>
  );
}

export default Player;
