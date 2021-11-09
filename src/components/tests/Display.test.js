import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Display from "../Display";
import fetchShow from "../../api/fetchShow";
import userEvent from "@testing-library/user-event";
jest.mock("./../../api/fetchShow");

const testShow = {
  name: "Supreme Existence",
  summary:
    "Humanity has evolved long without a true test. Now it is time for they they face who have slept below for long.",
  seasons: [
    {
      id: 1,
      name: "Season 1",
      episodes: [],
    },
    {
      id: 2,
      name: "Season 2",
      episodes: [],
    },
  ],
};

test("renders without any passed props", () => {
  render(<Display />);
});

test("when fetch button is pressed, the show component will display", async () => {
  render(<Display />);
  fetchShow.mockResolvedValueOnce({
    name: testShow.name,
    summary: testShow.summary,
    seasons: testShow.seasons,
  });
  const fetchShowButton = screen.queryByRole("button");
  userEvent.click(fetchShowButton);
  const showComponent = await screen.findByTestId("show-container");
  expect(showComponent).toBeInTheDocument();
});

test("when fetch button is pressed, amount of options are equal to seasons", async () => {
  render(<Display />);
  fetchShow.mockResolvedValueOnce({
    name: testShow.name,
    summary: testShow.summary,
    seasons: testShow.seasons,
  });
  const fetchShowButton = screen.queryByRole("button");
  userEvent.click(fetchShowButton);
  const seasonSelector = await screen.findByRole("combobox");
  expect(seasonSelector).toHaveLength(testShow.seasons.length + 1);
});

test("when fetch button is pressed, displayFunc should be called", async () => {
  const displayFuncMock = jest.fn();
  render(<Display displayFunc={displayFuncMock} />);
  fetchShow.mockResolvedValueOnce({
    name: testShow.name,
    summary: testShow.summary,
    seasons: testShow.seasons,
  });
  const fetchShowButton = screen.queryByRole("button");
  userEvent.click(fetchShowButton);
  await waitFor(() => {
    expect(displayFuncMock).toBeCalled();
  });
});

///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
