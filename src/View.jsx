import React from "react";
import styled from "styled-components";

export default function View({ title, ...rest }) {
  React.useEffect(() => {
    document.title = `${title} – Bug Catcher`;
  }, [title]);
  return <Container {...rest} />;
}

const Container = styled.div`
  background-color: var(--screen-background);
  box-shadow: inset 2px 2px 0 4px hsla(0, 0%, 0%, 10%);
  padding: 1rem;
`;
