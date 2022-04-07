import styled from "styled-components";
import { Link } from "react-router-dom";
import Pill from "./Pill";

export function PokemonLink({ count, pokemon }) {
  return (
    <S_Link to={`/pokemon/${pokemon.id}`}>
      <img alt="" src={`/img/${pokemon.image}`} />
      {count && count != 0 ? <S_Pill className="pill">{count}</S_Pill> : null}
      <b>{pokemon.name}</b>
    </S_Link>
  );
}

const S_Link = styled(Link)`
  display: inline-grid;
  position: relative;
  text-decoration: none;
  justify-content: center;
`;

const S_Pill = styled(Pill)`
  position: absolute;
  top: 0;
  right: 0;
`;
