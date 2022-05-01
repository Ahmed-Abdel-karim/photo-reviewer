import { render, screen } from "./test/app-test-utils";
import App from "./App";

test("renders app components when loading", () => {
  render({
    ui: <App />,
  });
  expect(
    screen.getByRole("heading", { name: "Images Reviewer" })
  ).toBeInTheDocument();
  expect(screen.getByRole("main")).toBeInTheDocument();
});
