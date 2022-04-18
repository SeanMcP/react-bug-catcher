import React from "react";
import styled from "styled-components";
import { getAll } from "./api";
import { Heading } from "./shared";
import { PokemonLink } from "./PokemonLink";
import View from "./View";
import { countStorage, favoritesStorage } from "./local-storage";

export default function AllView() {
  const [all, setAll] = React.useState([]);
  const count = countStorage.get();
  const favorites = favoritesStorage.get();

  React.useEffect(() => {
    async function _get() {
      setAll(await getAll());
    }
    _get();
  }, []);
  return (
    <View title="Home">
      <Heading>Pokédex</Heading>
      <$NavGrid>
        {all.map((pokemon) => (
          <PokemonLink
            key={pokemon.id}
            pokemon={pokemon}
            count={count[pokemon.id] || 0}
            isFavorite={favorites[pokemon.id]}
          />
        ))}
      </$NavGrid>
    </View>
  );
}

const $NavGrid = styled.nav`
  display: grid;
  font-size: x-small;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  justify-content: center;
`;
