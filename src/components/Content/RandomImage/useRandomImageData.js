import { useCallback, useState } from "react";
import { getRandomImage } from "../../../services/photos-service";

const useRandomImageData = ({
  onAcceptImage,
  onRejectImage,
  omittedImages,
}) => {
  const [{ isLoading, image }, setImageData] = useState({
    isLoading: false,
  });

  const [isSelecting, setIsSelecting] = useState(false);

  const handleGetNewImage = useCallback(() => {
    setImageData({
      isLoading: true,
    });
    getRandomImage(omittedImages).then((image) => {
      setImageData({
        isLoading: false,
        image,
      });
    });
  }, [omittedImages]);

  const handleAcceptImage = useCallback(() => {
    onAcceptImage(image);
    setIsSelecting(false);
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
  };
};

export default useRandomImageData;
