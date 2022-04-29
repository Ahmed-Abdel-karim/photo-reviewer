import React from "react";
import styled from "styled-components";
import Typography from "../styledComponents/Typography";
import { FcStackOfPhotos } from "react-icons/fc";

const SHeadr = styled.header`
  background: ${({ theme }) => theme.palette.primary};
  position: sticky;
  display: flex;
  padding: 0.5rem 2rem;
  box-shadow: ${({ theme }) => theme.boxShadow.main};
`;

const Header = () => {
  return (
    <SHeadr as="header">
      <FcStackOfPhotos fontSize="1.5rem" />
      <Typography color="white" as="h1" m="0 0.5rem" size={1.4}>
        Images Reviewer
      </Typography>
    </SHeadr>
  );
};

export default Header;
