import "./Filters.scss";

import searchIcon from "../../assets/search.svg";

// components
import SongCard from "./SongCard/SongCard";

function Filters(props) {
  return (
    <aside className={`Filters${props.show ? ' show' : ''}`}>
      <header className="header">
        <h2>
          For You
        </h2>

        <button className="back-button" onClick={() => props.toggleShow(false)}>
          Back
        </button>
      </header>

      <form className="search-form">
        <label className="search-box">
          <input type="text" placeholder="Search Song, Artist" />
          <button type="submit">
            <img src={searchIcon} alt="Search" />
          </button>
        </label>
      </form>

      <ul className="songs-list">
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard selected={true} />
        <SongCard />
      </ul>
    </aside>
  )
};

export default Filters;
