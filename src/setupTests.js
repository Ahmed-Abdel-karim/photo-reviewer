// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { clearStore, server } from "./test/app-test-utils";

// mock scrollIntoView because it is not exist in jsdom
Element.prototype.scrollIntoView = jest.fn();

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  clearStore();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
