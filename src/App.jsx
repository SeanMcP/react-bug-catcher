import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";

const AllView = React.lazy(() => import("./AllView"));
const ExploreView = React.lazy(() => import("./ExploreView"));
const PokemonView = React.lazy(() => import("./PokemonView"));

function Suspenseful({ children }) {
  return <React.Suspense fallback={<>Loading...</>}>{children}</React.Suspense>;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspenseful>
                <AllView />
              </Suspenseful>
            }
          />
          <Route
            path="/explore"
            element={
              <Suspenseful>
                <ExploreView />
              </Suspenseful>
            }
          />
          <Route
            path="/pokemon/:id"
            element={
              <Suspenseful>
                <PokemonView />
              </Suspenseful>
            }
          />
        </Routes>
        <nav>
          <Link to="/">Pokédex</Link>
          <Link to="/explore">Explore</Link>
        </nav>
      </BrowserRouter>
    </div>
  );
}

export default App;
