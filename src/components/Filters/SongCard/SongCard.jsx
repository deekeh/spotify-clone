import "./SongCard.scss";

function SongCard(props) {
  /**
   * Format the time duration in mm:ss format.
   * @param {Number} duration Duration of the song in seconds
   * @returns {String} Formatted time duration
   */
  function formatDuration(duration) {
    const d = Number(duration);
    if (isNaN(d)) return "0:00";
    return `${parseInt(d / 60)}:${d % 60}`
  }

  return (
    <li className={`SongCard${props.selected ? ' selected' : ''}`}>
      <button onClick={() => props.setSong(props.song._id)}>
        <img src={props.song?.photo} alt={props.song?.photo + 'Photo'} />

        <section className="song-info">
          <div className="song-name">
            {props.song?.title}
          </div>
          <div className="song-artist">
            {props.song?.artist}
          </div>
        </section>

        <div className="song-duration">
          {formatDuration(props.song?.duration)}
        </div>
      </button>
    </li>
  );
}

export default SongCard;