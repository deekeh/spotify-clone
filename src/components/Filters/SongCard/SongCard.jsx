import "./SongCard.scss";

function SongCard(props) {
  return (
    <li className={`SongCard${props.selected ? ' selected' : ''}`}>
      <button>
        <img src="https://picsum.photos/48/48" alt="Song Picture" />

        <section className="song-info">
          <div className="song-name">
            StarBoy
          </div>
          <div className="song-artist">
            The Weekend
          </div>
        </section>

        <div className="song-duration">
          5:32
        </div>
      </button>
    </li>
  );
}

export default SongCard;