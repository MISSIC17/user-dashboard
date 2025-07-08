import { render, fireEvent, screen } from "@testing-library/react";
import { AddButton } from "@/components/custom/todo/add-button";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { toast } from "sonner";
import { MockStore } from "redux-mock-store";
import { RootState } from "@/lib/store";
import { AnyAction } from "@reduxjs/toolkit";

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
  },
}));

const mockStore = configureStore<Partial<RootState>, AnyAction>([]);

describe("AddButton", () => {
  let store: MockStore<Partial<RootState>>;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  it("should render the input and button", () => {
    render(
      <Provider store={store}>
        <AddButton />
      </Provider>,
    );

    expect(
      screen.getByPlaceholderText("Add a new todo..."),
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should disable the button when the input is empty", () => {
    render(
      <Provider store={store}>
        <AddButton />
      </Provider>,
    );

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should enable the button when the input has text", () => {
    render(
      <Provider store={store}>
        <AddButton />
      </Provider>,
    );

    const input = screen.getByPlaceholderText("Add a new todo...");
    fireEvent.change(input, { target: { value: "New todo" } });

    expect(screen.getByRole("button")).toBeEnabled();
  });

  it("should dispatch the addTodo action and clear the input on button click", () => {
    render(
      <Provider store={store}>
        <AddButton />
      </Provider>,
    );

    const input = screen.getByPlaceholderText("Add a new todo...");
    fireEvent.change(input, { target: { value: "New todo" } });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue("");
    expect(toast.success).toHaveBeenCalledWith("Todo added successfully!");
  });

  it("should dispatch the addTodo action and clear the input on Enter key press", () => {
    render(
      <Provider store={store}>
        <AddButton />
      </Provider>,
    );

    const input = screen.getByPlaceholderText("Add a new todo...");
    fireEvent.change(input, { target: { value: "New todo" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue("");
    expect(toast.success).toHaveBeenCalledWith("Todo added successfully!");
  });
});
