const LOCAL_STORAGE_ACCEPTED_KEY = "__accepted_images__";
const LOCAL_STORAGE_REJECTED_KEY = "__rejected_images__";
const LOCAL_STORAGE_DISPLAYED_KEY = "__displayed_images__";

const getAcceptedImagesFormStore = () => {
  let res;
  try {
    const storedData = JSON.parse(
      window.localStorage.getItem(LOCAL_STORAGE_ACCEPTED_KEY)
    );
    res = storedData || {};
  } catch (error) {
    res = {};
  }
  return res;
};

const setAcceptedImagesToStore = (acceptedImages) => {
  window.localStorage.setItem(
    LOCAL_STORAGE_ACCEPTED_KEY,
    JSON.stringify(acceptedImages)
  );
};

const getRejectedImagesFormStore = () => {
  let res;
  try {
    const storedData = JSON.parse(
      window.localStorage.getItem(LOCAL_STORAGE_REJECTED_KEY)
    );
    res = storedData || {};
  } catch (error) {
    res = {};
  }
  return res;
};

const setRejectedImagesToStore = (rejectedImages) => {
  window.localStorage.setItem(
    LOCAL_STORAGE_REJECTED_KEY,
    JSON.stringify(rejectedImages)
  );
};

const setCurrentDisplayedImageToStore = (image) => {
  if (!image) {
    return window.localStorage.removeItem(
      LOCAL_STORAGE_DISPLAYED_KEY,
      JSON.stringify(image)
    );
  }
  window.localStorage.setItem(
    LOCAL_STORAGE_DISPLAYED_KEY,
    JSON.stringify(image)
  );
};

const getCurrentDisplayedImageFormStore = () => {
  const storedImage = window.localStorage.getItem(LOCAL_STORAGE_DISPLAYED_KEY);
  return storedImage ? JSON.parse(storedImage) : undefined;
};

const clearStore = () => window.localStorage.clear();

export {
  getAcceptedImagesFormStore,
  setAcceptedImagesToStore,
  getRejectedImagesFormStore,
  setRejectedImagesToStore,
  clearStore,
  setCurrentDisplayedImageToStore,
  getCurrentDisplayedImageFormStore,
  LOCAL_STORAGE_ACCEPTED_KEY,
  LOCAL_STORAGE_REJECTED_KEY,
  LOCAL_STORAGE_DISPLAYED_KEY,
};
