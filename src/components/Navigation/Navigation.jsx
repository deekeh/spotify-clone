import "./Navigation.scss";

// assets
import logo from "../../assets/spotify-1.svg";

function Navigation() {
  return (
    <nav className="Navigation">
      <header className="header">
        <img src={logo} alt="Spotify" className="spotify-logo" />
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

      <section className="user">
        <img src="https://randomuser.me/api/portraits/women/85.jpg" alt="User Profile" />
      </section>
    </nav>
  );
}

export default Navigation;
