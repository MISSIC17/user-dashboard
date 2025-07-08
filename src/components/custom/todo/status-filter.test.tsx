import { render, screen } from "@testing-library/react";
import { StatusFilter } from "@/components/custom/todo/status-filter";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MockStore } from "redux-mock-store";
import { RootState } from "@/lib/store";
import { AnyAction } from "@reduxjs/toolkit";

const mockStore = configureStore<Partial<RootState>, AnyAction>([]);

describe("StatusFilter", () => {
  let store: MockStore<Partial<RootState>>;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  it("should render the select component", () => {
    render(
      <Provider store={store}>
        <StatusFilter />
      </Provider>,
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
