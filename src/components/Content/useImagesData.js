import { useCallback, useMemo, useState } from "react";
import {
  getAcceptedImagesFormStore,
  getRejectedImagesFormStore,
  setAcceptedImagesToStore,
  setRejectedImagesToStore,
} from "../../services/data-store";

const currentAcceptedPhotos = getAcceptedImagesFormStore();
const currentRejecteddPhotos = getRejectedImagesFormStore();

const useImagesData = () => {
  const [acceptedImages, setAcceptedImages] = useState(currentAcceptedPhotos);
  const [rejectedImages, setRejectedImages] = useState(currentRejecteddPhotos);

  const addAcceptedImage = useCallback((img) => {
    setAcceptedImages((imgs) => {
      const newImages = { [img.id]: img, ...imgs };
      setAcceptedImagesToStore(newImages);
      return newImages;
    });
  }, []);

  const addRejectedImage = useCallback((img) => {
    setRejectedImages((imgs) => {
      const newImages = { [img.id]: img, ...imgs };
      setRejectedImagesToStore(newImages);
      return newImages;
    });
  }, []);

  const omittedImages = useMemo(
    () => ({ ...acceptedImages, ...rejectedImages }),
    [acceptedImages, rejectedImages]
  );

  return {
    acceptedImages,
    omittedImages,
    addRejectedImage,
    addAcceptedImage,
  };
};

export default useImagesData;
