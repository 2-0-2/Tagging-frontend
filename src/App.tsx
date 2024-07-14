import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/index";
import Typing from "./pages/Typing/index";
import Game from "./pages/Game/index";
import GameResult from "./pages/GameResult";

function App() {
  const [gameScore, setGameScore] = useState<number>(0); // State to hold game score

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/typing" element={<Typing />} />
        <Route path="/game" element={<Game setGameScore={setGameScore} />} />
        <Route
          path="/game-result"
          element={
            <GameResult isOpen={true} onClose={() => {}} score={gameScore} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
