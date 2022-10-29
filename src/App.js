import './App.scss';

import { useState } from 'react';

// components
import Navigation from "./components/Navigation/Navigation";
import Filters from "./components/Filters/Filters";
import Player from "./components/Player/Player";

function App() {
  const [filtersSection, setFiltersSection] = useState(false);
  const toggleFiltersSection = (setState) => {
    setFiltersSection(setState);
    console.log(filtersSection);
  };

  return (
    <div className="App">
      <Navigation toggleSearch={toggleFiltersSection} />
      <Filters
        show={filtersSection}
        toggleShow={toggleFiltersSection}
      />
      <Player />
    </div>
  );
}

export default App;
