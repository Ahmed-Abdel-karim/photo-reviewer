import styled from "styled-components";

export default styled.p`
  font-size: ${({ size }) => (size ? `${size}rem` : "auto")};
  color: ${({ color }) => (color ? color : "black")};
  margin: ${({ m = "unset" }) => m};
  padding: ${({ p = "unset" }) => p};
`;
