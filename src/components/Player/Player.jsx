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
  const [seekPosition, setSeekPosition] = useState(0);
  /**
   * Pause the song if it is playing, play it if it is paused.
   */
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

  /**
   * Bring the song position to the time mentioned in the seeker range.
   * @param {Object} e Event object of the seeker
   */
  function seek(e) {
    document.querySelector('#audio-player').currentTime = Number(e.target.value);
  }

  /**
   * Synchronize with the time the song is playing at.
   * @param {Object} e Event object of the song
   */
  function updateSongTime(e) {
    setSeekPosition(Number(e.target.currentTime));
  }

  const [songVolume, setSongVolume] = useState(100);
  /**
   * Change browser-level volume of the song currently playing.
   * @param {Object} e Event object of the volume range
   */
  function changeVolume(e) {
    document.querySelector('#audio-player').volume = Number(e.target.value) / 100;
    setSongVolume(e.target.value);
  }

  const [showVolume, setShowVolume] = useState(false);
  /**
   * Show or hide the volume bar when the volume button is pressed.
   */
  function toggleVolumeBar() {
    setShowVolume(state => !state);
  }

  const [localSong, setLocalSong] = useState();
  /**
   * Intercept and stop the song currently playing, if a new song is selected.
   */
  useEffect(function () {
    if (!!props.song?._id && props.song?._id !== localSong?._id) {
      setLocalSong(props.song);
      document.querySelector('#audio-player').currentTime = 0;
      document.querySelector('#audio-player').pause();
      setIsSongPlaying(false);
      setSeekPosition(0);
    }
  }, [props.song]);

  return (
    <main className="Player">
      <audio src={localSong?.url} id="audio-player" onTimeUpdate={updateSongTime}></audio>
      <header className="header">
        <h2>{localSong?.title || 'Song Not Selected'}</h2>
        <h3>{localSong?.artist || 'No Artist'}</h3>
      </header>

      <section className="player-controller">
        <div className="song-banner-container">
          <img src={localSong?.photo || 'https://picsum.photos/id/239/800/800'} alt="Song Banner" className="hero" />
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
            <button disabled={!localSong}>
              <img src={previous} alt="Pevious" />
            </button>
            <button disabled={!localSong} onClick={toggleSong}>
              <img src={isSongPlaying ? pause : play} alt="Pause" />
            </button>
            <button disabled={!localSong}>
              <img src={next} alt="Next" />
            </button>
          </div>

          <div className="volume">
            <div className={`volume-slider-container${!showVolume ? ' hidden' : ''}`}>
              <div className="volume-slider-overlay"></div>
              <input
                type="range"
                className="volume-slider"
                onChange={changeVolume}
                min="0"
                max="100"
                value={songVolume}
              />
            </div>
            <button onClick={toggleVolumeBar} className="volume-button">
              <img src={volume} alt="Volume" />
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}

export default Player;
