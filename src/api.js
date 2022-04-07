import React from "react";

async function query(name) {
  const response = await fetch("/api?query=" + name);
  const data = await response.json();
  return data;
}

function makeHydrate(pokemon) {
  return function hydrate(id) {
    return { ...pokemon[id], id };
  };
}

export async function getPokemon(id) {
  const all = await query("getPokemon/" + id);
  const hydrate = makeHydrate(all);
  const { previous, next, ...pokemon } = hydrate(id);
  pokemon.previous = previous.map((id) => hydrate(id));
  pokemon.next = next.map((id) => hydrate(id));
  return pokemon;
}

export async function getAll() {
  const pokemon = await query("getAll");
  return Object.entries(pokemon).map(([id, item]) => ({
    ...item,
    id,
  }));
}

function useQuery(name) {
  const [response, setResponse] = React.useState({ status: "loading" });

  React.useEffect(() => {
    async function queryData() {
      const data = await query(name);
      setResponse({ status: "done", data });
    }
    queryData();
  }, [name]);

  return response;
}

export function useAllPokemon() {
  const { data, ...response } = useQuery("getAll");

  if (data) {
    response.data = Object.entries(data).map(([id, item]) => ({
      ...item,
      id,
    }));
  }

  return response;
}
