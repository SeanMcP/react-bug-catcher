import React from "react";
import { useParams } from "react-router-dom";
import { getPokemon } from "./api";
import { PokemonLink } from "./PokemonLink";
import View from "./View";

export default function PokemonView() {
  const { id } = useParams();
  const [pokemon, setPokemon] = React.useState(null);

  React.useEffect(() => {
    async function getData() {
      const pokemon = await getPokemon(id);
      setPokemon(pokemon);
    }

    getData();
  }, [id]);

  if (!pokemon) return <div>Loading...</div>;
  const party = JSON.parse(localStorage.getItem("party") || "{}");
  const count = party[pokemon.id];

  return (
    <View title={pokemon.name}>
      <img alt="" src={`/img/${pokemon.image}`} />
      <h1>{pokemon.name}</h1>
      <p>{count}</p>
      <div>
        <b>Type:</b>
        {pokemon.type.map((type) => (
          <span key={type} data-type={type}>
            {type}
          </span>
        ))}
      </div>
      <h2>Previous forms</h2>
      {pokemon.previous.length > 0
        ? pokemon.previous.map((pokemon) => (
            <PokemonLink key={pokemon.id} pokemon={pokemon} />
          ))
        : "None"}
      <h2>Future forms</h2>
      {pokemon.next.length > 0
        ? pokemon.next.map((pokemon) => (
            <PokemonLink key={pokemon.id} pokemon={pokemon} />
          ))
        : "None"}
    </View>
  );
}
