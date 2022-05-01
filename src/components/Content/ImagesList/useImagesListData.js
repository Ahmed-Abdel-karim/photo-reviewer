import { useCallback, useEffect, useRef, useState } from "react";

const useImagesListData = ({ images, imageWidth, padding }) => {
  const [activeIndex, setActive] = useState("0");
  const imagesNumber = Object.values(images).length;
  const sliderWidth = (imageWidth + padding) * imagesNumber;

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

  // heighlight first photo when added
  useEffect(() => {
    setActive("0");
  }, [imagesNumber]);

  return {
    sliderWidth,
    handleNext,
    handlePrev,
    handleImageClick,
    listRef,
    imagesNumber,
    activeIndex,
  };
};

export default useImagesListData;
