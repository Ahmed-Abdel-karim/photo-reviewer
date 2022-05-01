import { useCallback, useLayoutEffect, useState } from "react";
import {
  getCurrentDisplayedImageFormStore,
  setCurrentDisplayedImageToStore,
} from "../../../services/data-store";
import { getRandomImage } from "../../../services/photos-service";

const useRandomImageData = ({
  onAcceptImage,
  onRejectImage,
  omittedImages,
}) => {
  const [{ isLoading, image, error }, setImageData] = useState({
    isLoading: false,
  });

  const [isSelecting, setIsSelecting] = useState(false);

  // set persisted data on initial load
  useLayoutEffect(() => {
    const storedPhoto = getCurrentDisplayedImageFormStore();
    if (storedPhoto) {
      setIsSelecting(true);
      setImageData({
        isLoading: false,
        image: storedPhoto,
      });
    }
  }, []);

  const handleGetNewImage = useCallback(() => {
    setImageData({
      isLoading: true,
    });
    getRandomImage(omittedImages)
      .then((image) => {
        setCurrentDisplayedImageToStore(image);
        setImageData({
          isLoading: false,
          image,
        });
      })
      .catch((e) => {
        setImageData({
          isLoading: false,
          error: e.message,
        });
      });
  }, [omittedImages]);

  const handleAcceptImage = useCallback(() => {
    onAcceptImage(image);
    setIsSelecting(false);
    setCurrentDisplayedImageToStore();
    setImageData({
      isLoading: false,
    });
  }, [onAcceptImage, image, setIsSelecting]);

  const handleRejectImage = useCallback(() => {
    onRejectImage(image);
    handleGetNewImage();
  }, [onRejectImage, handleGetNewImage, image]);

  const handleAddNew = useCallback(() => {
    setIsSelecting(true);
    handleGetNewImage();
  }, [handleGetNewImage, setIsSelecting]);

  return {
    handleAcceptImage,
    handleAddNew,
    handleRejectImage,
    isSelecting,
    isLoading,
    image,
    error,
  };
};

export default useRandomImageData;
