import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import FlexBox from "../../styledComponents/FlexBox";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Button from "../../styledComponents/Button";
import Typography from "../../styledComponents/Typography";

const PHOTO_WIDTH = 10;
const PHOTO_PADDING = 0.5;

const SLi = styled.li`
  list-style: none;
  display: block;
  height: 100%;
  width: ${PHOTO_WIDTH}rem;
  border: 6px solid transparent;
  box-sizing: border-box;
  &.active {
    border-color: ${({ theme }) => theme.palette.primary};
  }
`;

const SGalleryContainer = styled.div`
  overflow-x: auto;
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
  const [activeIndex, setActive] = useState("0");
  const imagesNumber = Object.values(images).length;
  const sliderWidth = (PHOTO_WIDTH + PHOTO_PADDING) * imagesNumber;
  const listRef = useRef(null);

  const handleImageClick = useCallback((e) => {
    const imageIndex = e.target.getAttribute("data-index");
    setActive(imageIndex);
  }, []);

  const handleNext = useCallback(() => {
    setActive((p) => (Number(p) < imagesNumber - 1 ? Number(p) + 1 : 0));
  }, [imagesNumber]);

  const handlePrev = useCallback(() => {
    setActive((p) => (Number(p) > 0 ? Number(p) - 1 : imagesNumber - 1));
  }, [imagesNumber]);

  // move element to viewport when selected
  useEffect(() => {
    const currentElement = listRef.current?.getElementsByClassName("active")[0];
    currentElement?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [listRef, activeIndex]);

  useEffect(() => {
    setActive("0");
  }, [imagesNumber]);

  return (
    <SContainer>
      {imagesNumber ? (
        <>
          <SIconContainer onClick={handlePrev} direction="left">
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
          <SIconContainer onClick={handleNext} direction="right">
            <IoIosArrowForward fontSize="2.5rem" />
          </SIconContainer>
        </>
      ) : (
        <FlexBox bg="#f8f8f8" height="9rem">
          <Typography>No AcceptedImages To Display</Typography>
        </FlexBox>
      )}
    </SContainer>
  );
};

export default ImagesList;
