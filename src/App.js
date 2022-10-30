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

  async function setCategoryAndSongs(id) {
    setSelectedCategory(id);
    try {
      const songsData = await getSongs();
      setSongs(songsData);
    }
    catch (err) {
      console.error(err);
    }
  }


  /* ---- SONGS ---- */
  async function getSongs() {
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
            "playlistId": selectedCategory
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

  function setSong(id) {
    setSelectedSong(id);
    toggleFiltersSection(false);
  }


  /* ---- GET DATA ON LOAD ---- */
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
