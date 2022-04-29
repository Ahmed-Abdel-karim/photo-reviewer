const LOCAL_STORAGE_ACCEPTED_KEY = "__accepted_photos__";
const LOCAL_STORAGE_REJECTED_KEY = "__rejected_photos__";

export const getAcceptedImagesFormStore = () => {
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

export const setAcceptedImagesToStore = (acceptedPhotos) => {
  window.localStorage.setItem(
    LOCAL_STORAGE_ACCEPTED_KEY,
    JSON.stringify(acceptedPhotos)
  );
};

export const getRejectedImagesFormStore = () => {
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

export const setRejectedImagesToStore = (acceptedPhotos) => {
  window.localStorage.setItem(
    LOCAL_STORAGE_REJECTED_KEY,
    JSON.stringify(acceptedPhotos)
  );
};
