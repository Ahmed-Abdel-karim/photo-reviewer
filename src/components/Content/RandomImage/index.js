import React from "react";
import Button from "../../styledComponents/Button";
import { FaCheck, FaTimes, FaPlus } from "react-icons/fa";
import FlexBox from "../../styledComponents/FlexBox";
import Typography from "../../styledComponents/Typography";
import useRandomImageData from "./useRandomImageData";
import styled from "styled-components";

const SImg = styled.img`
  max-width: 100%;
  height: 100%;
  width: auto;
`;

const RandomImage = ({ onAcceptImage, omittedImages, onRejectImage }) => {
  const {
    handleAcceptImage,
    handleAddNew,
    handleRejectImage,
    image,
    isLoading,
    isSelecting,
    error,
  } = useRandomImageData({ onAcceptImage, omittedImages, onRejectImage });

  return (
    <FlexBox
      flexDirection="column"
      border="1px solid silver"
      borderRadius="1rem"
      p="1rem 2rem"
    >
      <Button disabled={isSelecting} onClick={handleAddNew}>
        <FaPlus fontSize="0.85rem" /> Add New
      </Button>
      <FlexBox width="100%" m="2rem" height="260px" bg="#f8f8f8">
        {image && (
          <SImg
            src={image.urls.small}
            alt={image.alt_description || image.id}
            aria-label="presented image"
          />
        )}
        {!image && !isLoading && <Typography>No Image To Display</Typography>}
        {isLoading && <Typography role="alert">Loading</Typography>}
        {error && <Typography role="alert">{error}</Typography>}
      </FlexBox>
      <FlexBox>
        <Button
          m="0 1rem"
          color="secondary"
          disabled={!image || !isSelecting}
          onClick={handleAcceptImage}
          aria-label="accept image"
        >
          <FaCheck fontSize="1rem" />
        </Button>
        <Button
          disabled={!isSelecting || isLoading}
          color="error"
          onClick={handleRejectImage}
          aria-label="reject image"
        >
          <FaTimes fontSize="1rem" />
        </Button>
      </FlexBox>
    </FlexBox>
  );
};

export default RandomImage;
