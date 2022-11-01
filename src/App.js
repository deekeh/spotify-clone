import './App.scss';

import { useEffect, useState } from 'react';

// components
import Navigation from "./components/Navigation/Navigation";
import Filters from "./components/Filters/Filters";
import Player from "./components/Player/Player";

function App() {
  const [filtersSection, setFiltersSection] = useState(false);
  const toggleFiltersSection = (setState) => {
    setFiltersSection(setState);
  };


  /* ---- SONG CATEGORIES ---- */
  /**
   * Get song categories and their IDs for linking with songs-list API eventually.
   * If there is an error while fetching the categories, it returns an empty array as a fallback.
   * @returns {Array} Array of categories of songs
   */
  async function getCategories() {
    try {
      const response = await fetch("https://api.ss.dev/resource/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: `query Query {
            getPlaylists {
              id
              title
            }
          }`
        })
      })
      const categories = await response.json();
      return categories.data.getPlaylists;
    }
    catch (err) {
      console.error(err);
      return [];
    }
  }

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);


  /* ---- SONGS ---- */
  /**
   * Fetch all songs of the selected category from the Songs API.
   * @param {Number} id The ID of the category of songs to be fetched
   * @returns {Array} Array of all songs along with name, artist, duration and other meta-data
   */
  async function getSongs(id) {
    try {
      const response = await fetch("https://api.ss.dev/resource/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: `query Query($playlistId: Int!) {
            getSongs(playlistId: $playlistId) {
              _id
              title
              photo
              url
              duration
              artist
            }
          }`,
          variables: {
            "playlistId": id || selectedCategory
          }
        })
      });
      const songs = await response.json();
      return songs.data.getSongs;
    }
    catch (err) {
      console.error(err);
      return [];
    }
  }

  /**
   * Filter the current selected song and set as the current song to passed to Player for playing.
   * Also change the background image of the application every time a different song is selected.
   * @param {String} id ID of the current song to be added to the Player and played on the application
   */
  function setSong(id) {
    const songurl = songs.find(song => song._id === id);
    console.log(songurl?.photo);
    document.querySelector(".body-overlay-layer-2").style.backgroundImage = `url('${songurl?.photo}')`;
    setSelectedSong(id);
    toggleFiltersSection(false);
  }

  /**
   * Set the selected category, then set songs of the selected category.
   * Useful while setting category on Navigation, since both processes need to be done synchronously.
   * @param {Number} id ID of the selected category
   */
  async function setCategoryAndSongs(id) {
    setSelectedCategory(id);
    try {
      setSongs([]);
      const songsData = await getSongs(id);
      setSongs(songsData);
    }
    catch (err) {
      console.error(err);
    }
  }


  /* ---- GET DATA ON LOAD ---- */
  // set initial data on page load
  useEffect(function () {
    async function onLoad() {
      const categoriesData = await getCategories();
      await setCategories(categoriesData);
      const songsData = await getSongs();
      await setSongs(songsData);
    }
    onLoad();
  }, []);

  return (
    <div className="App">
      <Navigation
        toggleSearch={toggleFiltersSection}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setCategoryAndSongs}
      />
      <Filters
        show={filtersSection}
        toggleShow={toggleFiltersSection}
        selectedCategory={categories.find(category => category.id === selectedCategory)}
        songs={songs}
        selectedSong={selectedSong}
        setSong={setSong}
      />
      <Player song={songs.find(song => song._id === selectedSong)} />
    </div>
  );
}

export default App;
