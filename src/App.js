import './App.scss';

// components
import Navigation from "./components/Navigation/Navigation";
import Filters from "./components/Filters/Filters";
import Player from "./components/Player/Player";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Filters />
      <Player />
    </div>
  );
}

export default App;
