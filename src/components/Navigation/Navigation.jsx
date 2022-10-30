import "./Navigation.scss";

// assets
import logo from "../../assets/spotify-1.svg";

function Navigation(props) {
  function changeCategory(e) {
    props.setSelectedCategory(Number(e.target.value));
    props.toggleSearch(true);
  }

  return (
    <nav className="Navigation">
      <header className="header">
        <img src={logo} alt="Spotify" className="spotify-logo" />
        <button className="search-button" onClick={() => props.toggleSearch(true)}>Search</button>
      </header>

      <ul className="filters">
        {
          props.categories.map(category => (
            <li key={category.id} className={category.id === props.selectedCategory ? 'selected' : ''}>
              <button onClick={() => props.setSelectedCategory(category.id)}>{category.title}</button>
            </li>
          ))
        }
      </ul>

      <select onChange={e => changeCategory(e)} className="filters-dropdown">
        {
          props.categories.map(category => (
            <option
              key={category.id}
              value={category.id}
            >{category.title}</option>
          ))
        }
      </select>

      <section className="user">
        <img src="https://randomuser.me/api/portraits/women/85.jpg" alt="User Profile" />
      </section>
    </nav>
  );
}

export default Navigation;
