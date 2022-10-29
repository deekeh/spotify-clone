import "./Navigation.scss";

// assets
import logo from "../../assets/spotify-1.svg";

function Navigation(props) {
  return (
    <nav className="Navigation">
      <header className="header">
        <img src={logo} alt="Spotify" className="spotify-logo" />
        <button className="search-button" onClick={() => props.toggleSearch(true)}>Search</button>
      </header>

      <ul className="filters">
        <li className="selected">
          <button>For You</button>
        </li>
        <li>
          <button>Top Tracks</button>
        </li>
        <li>
          <button>Favorites</button>
        </li>
        <li>
          <button>Recently Played</button>
        </li>
      </ul>

      <select className="filters-dropdown">
        <option value="for-you">For You</option>
        <option value="top-tracks">Top Tracks</option>
        <option value="favorites">Favorites</option>
        <option value="recently-played">Recently Played</option>
      </select>

      <section className="user">
        <img src="https://randomuser.me/api/portraits/women/85.jpg" alt="User Profile" />
      </section>
    </nav>
  );
}

export default Navigation;
