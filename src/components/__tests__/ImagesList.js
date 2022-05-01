import { render, screen, userEvent } from "../../test/app-test-utils";
import ImagesList from "../Content/ImagesList";
import testData from "../../test/test-data.json";

const renderList = () => {
  const initialImages = testData.slice(0, 5);
  render({
    ui: <ImagesList images={initialImages} />,
  });
  const imagesList = screen.queryByTestId("images-list");
  return {
    imagesList,
    initialImages,
    initialImagesElements: initialImages.map(({ urls }) => {
      return imagesList.querySelector(`[src="${urls.thumb}"]`);
    }),
    getImageParent: (imgEl) => imgEl.parentElement.parentElement,
  };
};

test("display all images provided", async () => {
  const { initialImagesElements } = renderList();
  initialImagesElements.forEach((el) => {
    expect(el).toBeInTheDocument();
  });
});

test("first photo active by default", async () => {
  const { initialImagesElements, getImageParent } = renderList();
  const image = initialImagesElements[0];
  const listItem = getImageParent(image);
  expect(listItem).toHaveClass("active");
});

test("heighlight image when clicked", async () => {
  const { initialImagesElements, getImageParent } = renderList();
  const image = initialImagesElements[2];
  const listItem = getImageParent(image);
  expect(listItem).not.toHaveClass("active");
  userEvent.click(image);
  expect(listItem).toHaveClass("active");
});

test("prev and next buttons work correctly", async () => {
  const { initialImagesElements, getImageParent } = renderList();
  const currentActiveLi = getImageParent(initialImagesElements[0]);
  const nextLi = getImageParent(initialImagesElements[1]);
  expect(currentActiveLi).toHaveClass("active");
  expect(nextLi).not.toHaveClass("active");

  const nextBtn = screen.getByLabelText(/next image/i);
  userEvent.click(nextBtn);
  expect(currentActiveLi).not.toHaveClass("active");
  expect(nextLi).toHaveClass("active");

  const prevBtn = screen.getByLabelText(/prevoius image/i);
  userEvent.click(prevBtn);
  expect(currentActiveLi).toHaveClass("active");
  expect(nextLi).not.toHaveClass("active");
});
