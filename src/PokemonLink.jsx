import styled from "styled-components";
import { Link } from "react-router-dom";
import { Pill } from "./shared";

export function PokemonLink({ count, hideLabel, pokemon }) {
  return (
    <$Link to={`/pokemon/${pokemon.id}`}>
      <img alt="" src={`/img/${pokemon.image}`} />
      {count && count != 0 ? <$Pill className="pill">{count}</$Pill> : null}
      <b className={hideLabel ? "visually-hidden" : ""}>{pokemon.name}</b>
    </$Link>
  );
}

const $Link = styled(Link)`
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
  text-decoration: none;
`;

const $Pill = styled(Pill)`
  position: absolute;
  top: 0;
  right: 0;
`;
