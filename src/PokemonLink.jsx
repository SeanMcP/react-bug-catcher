import styled from "styled-components";
import { Link } from "react-router-dom";
import Pill from "./Pill";

export function PokemonLink({ count, pokemon }) {
  return (
    <$Link to={`/pokemon/${pokemon.id}`}>
      <img alt="" src={`/img/${pokemon.image}`} />
      {count && count != 0 ? <$Pill className="pill">{count}</$Pill> : null}
      <b>{pokemon.name}</b>
    </$Link>
  );
}

const $Link = styled(Link)`
  display: inline-grid;
  position: relative;
  text-decoration: none;
  justify-content: center;
`;

const $Pill = styled(Pill)`
  position: absolute;
  top: 0;
  right: 0;
`;
