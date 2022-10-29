import "./Player.scss";

// assets
import elipsis from "../../assets/horizontal-elipsis.svg";
import previous from "../../assets/previous.svg";
import next from "../../assets/next.svg";
import play from "../../assets/play.svg";
import pause from "../../assets/pause.svg";
import volume from "../../assets/volume.svg";

function Player() {
  return (
    <main className="Player">
      <header className="header">
        <h2>Viva La Vida</h2>
        <h3>Cold Play</h3>
      </header>

      <section className="player-controller">
        <div className="song-banner-container">
          <img src="https://picsum.photos/300/300" alt="Song Banner" className="hero" />
        </div>
        <input className="song-seeker" type="range" name="vol" min="0" max="50"></input>

        <section className="controls-footer">
          <button className="elipsis">
            <img src={elipsis} alt="Menu" />
          </button>

          <div className="controls">
            <button>
              <img src={previous} alt="Pevious" />
            </button>
            <button>
              {/* <img src={play} alt="Play" /> */}
              <img src={pause} alt="Pause" />
            </button>
            <button>
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
