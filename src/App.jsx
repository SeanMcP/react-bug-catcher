import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";

const AllView = React.lazy(() => import("./AllView"));
const ExploreView = React.lazy(() => import("./ExploreView"));
const PokemonView = React.lazy(() => import("./PokemonView"));

function Suspenseful({ children }) {
  return <React.Suspense fallback={<>Loading...</>}>{children}</React.Suspense>;
}

function App() {
  return (
    <$Div className="App">
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
    </$Div>
  );
}

const $Div = styled.div`
  border: 2rem solid #e65964;
  border-left-width: 0.5rem;
  border-right-width: 0.5rem;
  border-radius: 0.5rem;
  margin: 2rem auto;
  max-width: 390px;
  height: 664px;
`;

export default App;
