import { useCallback, useMemo, useState } from "react";
import {
  getAcceptedImagesFormStore,
  getRejectedImagesFormStore,
  setAcceptedImagesToStore,
  setRejectedImagesToStore,
} from "../../services/data-store";

const useImagesData = () => {
  const currentAcceptedImages = getAcceptedImagesFormStore();
  const currentRejecteddImages = getRejectedImagesFormStore();
  const [acceptedImages, setAcceptedImages] = useState(currentAcceptedImages);
  const [rejectedImages, setRejectedImages] = useState(currentRejecteddImages);

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
