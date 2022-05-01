import React from "react";
import styled from "styled-components";
import FlexBox from "../../styledComponents/FlexBox";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Button from "../../styledComponents/Button";
import Typography from "../../styledComponents/Typography";
import useImagesListData from "./useImagesListData";

const IMAGE_WIDTH = 10;
const PADDING = 0.5;

const SLi = styled.li`
  list-style: none;
  display: block;
  height: 100%;
  width: ${IMAGE_WIDTH}rem;
  border: 6px solid transparent;
  box-sizing: border-box;
  &.active {
    border-color: ${({ theme }) => theme.palette.primary};
  }
`;

const SGalleryContainer = styled.div`
  overflow: hidden;
  max-width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SContainer = styled(FlexBox)`
  position: relative;
  margin-bottom: 2rem;
`;

const SIconContainer = styled(Button)`
  position: absolute;
  top: 28%;
  ${({ direction }) => `${direction}:-1.5rem`};
  background: ${({ theme }) => theme.palette.primary};
  border-radius: 50rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;

const SImageContainer = styled.button`
  background: transparent;
  padding: 0;
  margin: 0;
  display: block;
  height: 100%;
  width: 100%;
  border: none;
`;

const ImagesList = ({ images }) => {
  const {
    handleImageClick,
    handleNext,
    handlePrev,
    sliderWidth,
    listRef,
    imagesNumber,
    activeIndex,
  } = useImagesListData({
    images,
    imageWidth: IMAGE_WIDTH,
    padding: PADDING,
  });

  return (
    <>
      {imagesNumber ? (
        <SContainer data-testid="images-list">
          <SIconContainer
            aria-label="prevoius image"
            onClick={handlePrev}
            direction="left"
          >
            <IoIosArrowBack fontSize="2.5rem" />
          </SIconContainer>
          <SGalleryContainer>
            <FlexBox
              justifyContent="space-between"
              height="9rem"
              as="ul"
              width={`${sliderWidth}rem`}
              ref={listRef}
            >
              {Object.values(images).map((image, index) => {
                return (
                  <SLi
                    key={image.id}
                    id={image.id}
                    className={
                      String(activeIndex) === String(index) ? "active" : ""
                    }
                  >
                    <SImageContainer onClick={handleImageClick}>
                      <img
                        height="100%"
                        width="100%"
                        src={image.urls.thumb}
                        alt={image.alt_description || image.id}
                        draggable={false}
                        data-index={index}
                      />
                    </SImageContainer>
                  </SLi>
                );
              })}
            </FlexBox>
          </SGalleryContainer>
          <SIconContainer
            aria-label="next image"
            onClick={handleNext}
            direction="right"
          >
            <IoIosArrowForward fontSize="2.5rem" />
          </SIconContainer>
        </SContainer>
      ) : (
        <FlexBox m="0 0 2rem 0" width="100%" bg="#f8f8f8" height="9rem">
          <Typography>No Accepted Images To Display</Typography>
        </FlexBox>
      )}
    </>
  );
};

export default ImagesList;
