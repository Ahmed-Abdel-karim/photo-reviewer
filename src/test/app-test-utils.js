import {
  getByRole,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  clearStore,
  getAcceptedImagesFormStore,
  setCurrentDisplayedImageToStore,
} from "../services/data-store";
import {
  setAcceptedImagesToStore,
  setRejectedImagesToStore,
} from "../services/data-store";
import Styles from "../Styles";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { RANDOM_PHOTO_URL } from "../services/photos-service";

const server = setupServer();

const generateRandoImageResponse = (fakeImageResponse = []) => {
  let index = 0;
  server.use(
    rest.get(RANDOM_PHOTO_URL, (req, res, ctx) => {
      let response = fakeImageResponse[index];
      index++;
      return res(ctx.json(response));
    })
  );
};

const renderWithStoreAndStyles = (
  { ui, options },
  { acceptedImages = {}, rejectedImages = {}, currentDisplayedImage } = {}
) => {
  setAcceptedImagesToStore(acceptedImages);
  setRejectedImagesToStore(rejectedImages);
  setCurrentDisplayedImageToStore(currentDisplayedImage);
  return {
    ...render(<Styles>{ui}</Styles>, options),
    acceptedImages,
    rejectedImages,
  };
};

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(() => screen.queryAllByText(/loading/i));

export {
  renderWithStoreAndStyles as render,
  screen,
  userEvent,
  clearStore,
  server,
  generateRandoImageResponse,
  waitForLoadingToFinish,
  getByRole,
};
