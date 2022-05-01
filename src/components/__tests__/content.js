import {
  render,
  screen,
  generateRandoImageResponse,
  userEvent,
  waitForLoadingToFinish,
} from "../../test/app-test-utils";
import Content from "../Content";
import testData from "../../test/test-data.json";

const formatImages = (images) =>
  images.reduce((acc, next) => {
    acc[next.id] = next;
    return acc;
  }, {});

test("renders content with no images in the screen for someone who has never used the app", async () => {
  render({
    ui: <Content />,
  });
  // check the count
  expect(
    screen.getByRole("heading", { name: /approved images/i })
  ).toBeInTheDocument();
  expect(screen.getByTestId("count")).toHaveTextContent("0");
  // check no images in slider
  expect(
    screen.getByText(/no accepted images to display/i)
  ).toBeInTheDocument();
  expect(screen.queryByTestId("images-list")).not.toBeInTheDocument();
  // check add button is exist and enabled
  const addButon = screen.getByRole("button", { name: /add new/i });
  expect(addButon).toBeInTheDocument();
  expect(addButon).not.toBeDisabled();
  expect(screen.getByText(/no image to display/i)).toBeInTheDocument();
});

test("keep previous state", async () => {
  const initialImages = testData.slice(0, 5);
  const acceptedImages = formatImages(initialImages);
  render(
    {
      ui: <Content />,
    },
    {
      acceptedImages,
      currentDisplayedImage: testData[8],
    }
  );
  // check the count
  expect(screen.getByTestId("count")).toHaveTextContent(initialImages.length);
  expect(
    screen.queryByText(/no accepted images to display/i)
  ).not.toBeInTheDocument();
  // check images in slider
  const imagesList = screen.queryByTestId("images-list");
  expect(imagesList).toBeInTheDocument();
  initialImages.forEach(({ urls }) => {
    expect(
      imagesList.querySelector(`[src="${urls.thumb}"]`)
    ).toBeInTheDocument();
  });
  // check if the persisted random image is displayed
  expect(screen.getByLabelText(/presented image/i).getAttribute("src")).toBe(
    testData[8].urls.small
  );
});

test("add image to list when click 'add new' and 'accept image'", async () => {
  let fakeImages = [testData[0]];
  generateRandoImageResponse(fakeImages);

  render({
    ui: <Content />,
  });

  const addButton = screen.getByRole("button", { name: /add new/i });
  const acceptButton = screen.getByLabelText(/accept image/i);

  expect(acceptButton).toBeDisabled();
  expect(screen.getByTestId("count")).toHaveTextContent("0");

  userEvent.click(addButton);
  expect(addButton).toBeDisabled();

  await waitForLoadingToFinish();
  //display random image
  expect(screen.getByLabelText(/presented image/i).getAttribute("src")).toBe(
    fakeImages[0].urls.small
  );

  expect(acceptButton).not.toBeDisabled();

  userEvent.click(acceptButton);

  // clear image from random image section and add it to images list
  expect(acceptButton).toBeDisabled();
  expect(addButton).not.toBeDisabled();
  expect(screen.getByText(/no image to display/i)).toBeInTheDocument();

  const imagesList = screen.queryByTestId("images-list");
  expect(imagesList).toBeInTheDocument();

  const acceptedImage = imagesList.querySelector(
    `[src="${fakeImages[0].urls.thumb}"]`
  );
  expect(acceptedImage).toBeInTheDocument();
  // check for count incerement
  expect(screen.getByTestId("count")).toHaveTextContent("1");
});

test("will not display rejected image", async () => {
  let fakeImages = [testData[0], testData[1], testData[2]];
  generateRandoImageResponse(fakeImages);
  render(
    {
      ui: <Content />,
    },
    {
      rejectedImages: formatImages([testData[0], testData[1]]),
    }
  );

  const addButton = screen.getByRole("button", { name: /add new/i });
  userEvent.click(addButton);
  await waitForLoadingToFinish();

  expect(screen.getByLabelText(/presented image/i).getAttribute("src")).toBe(
    fakeImages[2].urls.small
  );
});

test("will display new image after click on reject", async () => {
  let fakeImages = [testData[0], testData[1], testData[2]];
  generateRandoImageResponse(fakeImages);
  render(
    {
      ui: <Content />,
    },
    {
      rejectedImages: formatImages([testData[0]]),
    }
  );

  const addButton = screen.getByRole("button", { name: /add new/i });
  const rejectButton = screen.getByLabelText(/reject image/i);

  userEvent.click(addButton);
  await waitForLoadingToFinish();
  userEvent.click(rejectButton);
  await waitForLoadingToFinish();
  expect(screen.getByLabelText(/presented image/i).getAttribute("src")).toBe(
    fakeImages[2].urls.small
  );
});
