import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getPokemon } from "./api";
import { Heading } from "./shared";
import { PokemonLink } from "./PokemonLink";
import View from "./View";
import { getFavorites } from "./local-storage";

export default function PokemonView() {
  const { id } = useParams();
  const [pokemon, setPokemon] = React.useState(null);
  const [isFavorite, setIsFavorite] = React.useState(false);

  React.useEffect(() => {
    async function getData() {
      const pokemon = await getPokemon(id);
      setPokemon(pokemon);
    }

    getData();
  }, [id]);

  React.useEffect(() => {
    setIsFavorite(getFavorites()[id]);
  }, [id]);

  if (!pokemon) return <div>Loading...</div>;
  const party = JSON.parse(localStorage.getItem("party") || "{}");
  const count = party[pokemon.id];

  function toggleFavorite() {
    const favorites = getFavorites();
    if (favorites[id] == true) {
      delete favorites[id];
    } else {
      favorites[id] = true;
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(favorites[id]);
  }

  return (
    <View title={pokemon.name}>
      <$Header>
        <Heading>
          {pokemon.name}
          {isFavorite ? "*" : ""}
        </Heading>
      </$Header>
      <$ImagesContainer>
        {pokemon.previous.length > 0 ? (
          <PokemonLink
            hideLabel
            pokemon={pokemon.previous[pokemon.previous.length - 1]}
          />
        ) : (
          <span />
        )}
        <$Img alt="" src={`/img/${pokemon.image}`} />
        {pokemon.next.length > 0 ? (
          <PokemonLink hideLabel pokemon={pokemon.next[0]} />
        ) : (
          <span />
        )}
      </$ImagesContainer>
      <p>
        <$FavoriteButton onClick={toggleFavorite}>
          {isFavorite ? "Favorited!" : "Add to favorites"}
        </$FavoriteButton>
      </p>
      <p>
        <b>Catch count</b>: {count || 0}
      </p>
      <p>
        <b>Type:</b>{" "}
        {pokemon.type.map((type) => (
          <$TypeSpan key={type} data-type={type}>
            {type[0].toUpperCase() + type.slice(1)}
          </$TypeSpan>
        ))}
      </p>
    </View>
  );
}

const $Header = styled.header`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const $FavoriteButton = styled.button`
  background: transparent;
  border: 1px solid black;
  padding: 0.25rem;
`;

const $ImagesContainer = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 64px auto 64px;
`;

const $Img = styled.img`
  display: block;
  height: 10rem;
  margin: 0 auto;
`;

const $TypeSpan = styled.span`
  margin-right: 1ch;
`;
