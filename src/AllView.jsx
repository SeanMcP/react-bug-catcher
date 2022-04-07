import React from "react";
import styled from "styled-components";
import { getAll } from "./api";
import { PokemonLink } from "./PokemonLink";
import View from "./View";

export default function AllView() {
  const [all, setAll] = React.useState([]);
  const party = getParty();

  React.useEffect(() => {
    async function _get() {
      setAll(await getAll());
    }
    _get();
  }, []);
  return (
    <View title="Home">
      <$NavGrid>
        {all.map((pokemon) => (
          <PokemonLink
            key={pokemon.id}
            pokemon={pokemon}
            count={party[pokemon.id] || 0}
          />
        ))}
      </$NavGrid>
    </View>
  );
}

function getParty() {
  return JSON.parse(localStorage.getItem("party") || "{}");
}

const $NavGrid = styled.nav`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  justify-content: center;
`;
