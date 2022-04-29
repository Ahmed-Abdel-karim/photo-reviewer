import { useCallback, useReducer } from "react";
import { setAcceptedPhotos, getAcceptedPhotos } from "../../services/data-store";

const ACCEPT_PHOTO = "ACCEPT_PHOTO";
const SET_DISPLAYED_PHOTO = "SET_DISPLAYED_PHOTO";

const reducer = (state, action) => {
  switch (action.type) {
    case ACCEPT_PHOTO:
      const newList = {
        ...state.acceptedPhotos,
        [action.payload.id]: action.payload,
      };
      setAcceptedPhotos(newList);
      return {
        ...state,
        acceptedPhotos: newList,
      };
    case SET_DISPLAYED_PHOTO:
      return {
        ...state,
        displayedPhoto: action.payload,
      };
    default:
      break;
  }
};

const initialState = {
  acceptedPhotos: getAcceptedPhotos(),
  displayedPhoto: null,
};

const usePhotoStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const acceptPhoto = useCallback(
    (photo) =>
      dispatch({
        type: ACCEPT_PHOTO,
        payload: photo,
      }),
    [dispatch]
  );

  const setDisplayedPhoto = useCallback(
    (photo) =>
      dispatch({
        type: SET_DISPLAYED_PHOTO,
        payload: photo,
      }),
    [dispatch]
  );

  return {
    ...state,
    acceptPhoto,
    setDisplayedPhoto,
  };
};

export default usePhotoStore