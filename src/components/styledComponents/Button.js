import styled from "styled-components";

const Button = styled.button`
  background: ${({ theme, color = "primary" }) =>
    theme.palette[color] || "transparent"};
  color: white;
  border-radius: 0.5rem;
  border: none;
  padding: 0.7rem 1.2rem;
  margin: ${({ m }) => m};
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: box-shadow 200ms;
  cursor: pointer;
  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.light};
    transition: box-shadow 200ms;
  }
  &:active {
    transform: translateY(1px);
  }
  &:disabled {
    cursor: not-allowed;
    transform: translateY(0px);
    background: #f0f0f0;
    box-shadow: none;
  }
`;

export default Button;
