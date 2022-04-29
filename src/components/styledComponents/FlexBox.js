import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: ${({ flexDirection = "row" }) => flexDirection};
  align-items: ${({ alignItems = "center" }) => alignItems};
  justify-content: ${({ justifyContent = "center" }) => justifyContent};
  width: ${({ width = "auto" }) => width};
  height: ${({ height = "auto" }) => height};
  margin: ${({ m = "unset" }) => m};
  padding: ${({ p = "unset" }) => p};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  background: ${({ bg }) => bg};
`;
