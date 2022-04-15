import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";

const AllView = React.lazy(() => import("./AllView"));
const ExploreView = React.lazy(() => import("./ExploreView"));
const PokemonView = React.lazy(() => import("./PokemonView"));

function Suspenseful({ children }) {
  return (
    <React.Suspense fallback={<$DivLoading>Loading...</$DivLoading>}>
      {children}
    </React.Suspense>
  );
}

function App() {
  return (
    <$DivFrame className="App">
      <BrowserRouter>
        <$DivWindow>
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
        </$DivWindow>
        <$Nav>
          <$Link to="/">Pokédex</$Link>
          <$Link to="/explore">Explore</$Link>
        </$Nav>
      </BrowserRouter>
      <$ASource
        href="https://github.com/seanmcp/react-bug-catcher"
        target="_blank"
      >
        View source
      </$ASource>
    </$DivFrame>
  );
}

const $DivLoading = styled.div`
  align-items: center;
  background-color: var(--screen-background);
  display: flex;
  justify-content: center;
`;

const $DivFrame = styled.div`
  --frame: #dc4443;
  --frame-highlight: #e79b99;
  --frame-lowlight: #aa3333;
  --screen-background: #f8eded;

  background-color: var(--frame);
  border: 2px solid var(--frame-lowlight);
  border-top-color: var(--frame-highlight);
  border-left-color: var(--frame-highlight);
  border-radius: 4px;
  display: grid;
  grid-template-rows: auto min-content;
  height: 600px;
  margin: 2rem auto;
  max-width: 400px;
  padding: 1rem;
`;

const $DivWindow = styled.div`
  background-color: white;
  border: 2px solid var(--frame-highlight);
  border-top-color: var(--frame-lowlight);
  border-left-color: var(--frame-lowlight);
  border-radius: 2px;
  display: grid;
`;

const $Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
`;

const $Link = styled(Link)`
  border: 1px solid var(--frame-lowlight);
  box-shadow: inset 1px 1px 0 var(--frame-highlight);
  border-radius: 2px;
  color: white;
  padding: 0.5rem;
  text-shadow: 0 2px 0 var(--frame-lowlight);
  text-decoration: none;

  &:hover {
    background-color: var(--frame-lowlight);
    box-shadow: inset 1px 1px 0 hsla(0, 0%, 0%, 10%);
  }
`;

const $ASource = styled.a`
  bottom: 0.5rem;
  color: hsl(0, 0%, 50%);
  font-size: x-small;
  left: 0;
  position: fixed;
  right: 0;
  text-align: center;

  &:not(:focus, :hover) {
    text-decoration: none;
  }
`;

export default App;
