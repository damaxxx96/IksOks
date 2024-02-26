import "./App.scss";
import Game from "./pages/Game/Game";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Lobby from "./pages/Lobby/Lobby";
import Login from "./pages/Login/Login";
import { AppProvider } from "./contexts/AppContext";

function App() {
  return (
    <Router>
      <AppProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Lobby />} />
            <Route path="/login" element={<Login />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;
