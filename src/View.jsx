import React from "react";
import styled from "styled-components";

export default function View({ title, ...rest }) {
  React.useEffect(() => {
    document.title = `${title} – Bug Catcher`;
  }, [title]);
  return <Container {...rest} />;
}

const Container = styled.div`
  box-shadow: inset 0 0 0.5rem 0.5rem hsla(0, 0%, 0%, 0.1);
  padding: 1rem;
`;
