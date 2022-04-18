import React from "react";
import jsCookie from "js-cookie";
import styled from "styled-components";
import { useAllPokemon } from "./api";
import View from "./View";
import { Pill } from "./shared";
import { favoritesStorage } from "./local-storage";

export default function ExploreView() {
  const [pokemon, setPokemon] = React.useState(null);
  const [message, setMessage] = React.useState(
    "You find a nice wooded spot to look for bugs."
  );
  const [mood, setMood] = React.useState(null);
  const { data: allPokemon } = useAllPokemon();

  const [berries, setBerries] = useCookie("berries");
  const [balls, setBalls] = useCookie("balls");
  const favorites = favoritesStorage.get();

  function tossBerry() {
    setBerries(berries - 1);

    if (pokemon) {
      if (Math.random() > 0.25) {
        setMood("happy");
        setMessage(`The ${pokemon.name} is happily munching a berry.`);
      } else {
        setMood("angry");
        setMessage(`Uh oh, that seemed to irritate the ${pokemon.name}!`);
      }
    } else {
      if (Math.random() > 0.5) {
        encounterPokemon();
      } else {
        setMessage(
          berries
            ? `No Pokemon appeared. You have ${berries} berr${
                berries === 1 ? "y" : "ies"
              } left.`
            : "Uh oh, you're all out of berries! Try coming back later."
        );
      }
    }
  }

  function encounterPokemon() {
    const rarity = getRarity();
    const options = allPokemon.filter((pokemon) => pokemon.rarity === rarity);
    const chosen = options[Math.floor(Math.random() * options.length)];
    setMessage(
      favorites[chosen.id]
        ? `One of your favorites has appeared: a wild ${chosen.name}!`
        : `A wild ${chosen.name} has appeared!`
    );
    setPokemon(chosen);
  }

  function tossBall() {
    setBalls(balls - 1);
    const rarityFactor = pokemon.rarity * -0.1;
    const moodFactor = getMoodFactor(mood);
    if (Math.random() + rarityFactor + moodFactor > 0.1) {
      setMessage(`Success! You caught a ${pokemon.name}.`);
      catchPokemon(pokemon.id);
      endEncounter();
    } else {
      setMessage("Oo, so close!");
      if (Math.random() + rarityFactor + moodFactor > 0.25) {
        setMessage(
          `The Pokemon ran away! ${
            !mood ? "Try using a berry" : "Better luck"
          } next time.`
        );
        endEncounter();
      }
    }
  }

  function endEncounter() {
    setPokemon(null);
    setMood(null);
  }

  return (
    <$View title="Explore">
      <$MessageBanner aria-live="polite">{message}</$MessageBanner>
      <$PokemonContainer>
        {pokemon && <img src={`/img/${pokemon.image}`} alt={pokemon.name} />}
      </$PokemonContainer>
      <$ButtonContainer>
        <$Button
          disabled={berries === 0 || mood === "happy"}
          onClick={tossBerry}
        >
          <img alt="Razz berry" src="/img/razz-berry.png" />
          <$Pill>{berries}</$Pill>
        </$Button>
        <$Button disabled={!pokemon || balls === 0} onClick={tossBall}>
          <img alt="Net ball" src="/img/net-ball.png" />
          <$Pill>{balls}</$Pill>
        </$Button>
      </$ButtonContainer>
    </$View>
  );
}

function getExpirationTime() {
  const now = new Date();
  if (now.getMinutes() >= 30) {
    now.setMinutes(0);
    // TODO(@seanmcp): Handle midnight
    now.setHours(now.getHours() + 1);
  } else {
    now.setMinutes(30);
  }
  now.setSeconds(0);
  now.setMilliseconds(0);
  return now;
}

function getRarity() {
  let rarity = 1;
  const random = Math.random();
  if (random > 0.83) {
    rarity = 3;
  } else if (random > 0.5) {
    rarity = 2;
  }
  return rarity;
}

function getMoodFactor(mood) {
  switch (mood) {
    case "happy":
      return 0.3;
    case "angry":
      return -0.3;
    default:
      return 0;
  }
}

function useCookie(name, initialValue = 20) {
  const [cookie, setCookie] = React.useState();

  React.useEffect(() => {
    const value = jsCookie.get(name);
    if (!value) {
      jsCookie.set(name, initialValue, { expires: getExpirationTime() });
      setCookie(initialValue);
    } else {
      setCookie(parseInt(value));
    }
  }, [initialValue, name]);

  function setAndPersistCookie(value) {
    jsCookie.set(name, value, { expires: getExpirationTime() });
    setCookie(value);
  }

  return [cookie, setAndPersistCookie];
}

function catchPokemon(id) {
  const party = JSON.parse(localStorage.getItem("party") || "{}");
  if (!party[id]) party[id] = 0;
  party[id]++;
  localStorage.setItem("party", JSON.stringify(party));
}

const $View = styled(View)`
  background-image: url(/img/lucrian-forest-background.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  min-height: 390px;
  position: relative;
`;

const $MessageBanner = styled.div`
  background: white;
  border: 3px solid black;
  box-shadow: 0.5rem 0.5rem 0 hsla(0, 0%, 0%, 0.1);
  left: 1rem;
  padding: 0.5rem;
  position: absolute;
  right: 1rem;
  top: 1rem;
`;

const $PokemonContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-grow: 1;

  img {
    transform: translateY(40%);
    width: 144px;
  }
`;

const $ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const $Button = styled.button`
  align-items: center;
  background-color: hsla(0, 100%, 100%, 50%);
  border: 0;
  border-radius: 48px;
  display: inline-flex;
  justify-content: center;
  height: 48px;
  position: relative;
  width: 48px;

  &[disabled] {
    opacity: 0.5;
  }
`;

const $Pill = styled(Pill)`
  position: absolute;
  top: 0;
  right: 0;
`;
