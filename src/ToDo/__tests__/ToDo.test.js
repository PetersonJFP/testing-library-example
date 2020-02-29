import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";

import ToDo from "../ToDo";

describe("ToDo", () => {
  it("renders correctly", async () => {
    // render the component
    const { asFragment, getByTestId } = render(<ToDo />);

    // snapshot of the base componente, before any use
    expect(asFragment()).toMatchSnapshot("before make changes");

    // promisses to find components on generated HTML
    const input = await waitForElement(() => getByTestId("new-task"));
    const btn = await waitForElement(() => getByTestId("add-task"));

    // change an element value and click de submit button
    fireEvent.change(input, { target: { value: "foo" } });
    fireEvent.click(btn);

    fireEvent.change(input, { target: { value: "bar" } });
    fireEvent.click(btn);

    fireEvent.change(input, { target: { value: "foobar" } });
    fireEvent.click(btn);

    // snapshot of the component after use
    expect(asFragment()).toMatchSnapshot("with 3 todos (foo, bar, foobar)");
  });

  it("should save the inputted to-do and show then on HTML", async () => {
    const { getByTestId, getByText } = render(<ToDo />);

    const input = await waitForElement(() => getByTestId("new-task"));
    const btn = await waitForElement(() => getByTestId("add-task"));

    const newTask = "description";

    fireEvent.change(input, { target: { value: newTask } });
    fireEvent.click(btn);

    // try recovery the created component
    const taskItem = await waitForElement(() => getByText(newTask));

    // recently created component must be exist
    expect(taskItem).toBeDefined();
    // ou
    expect(taskItem).toBeInTheDocument();
  });

  it("should remove task when the user clicks on the task remove button", async () => {
    const { getByTestId, queryAllByText, queryByText } = render(<ToDo />);

    const input = await waitForElement(() => getByTestId("new-task"));
    const btn = await waitForElement(() => getByTestId("add-task"));

    const newTask = "description";

    fireEvent.change(input, { target: { value: newTask } });
    fireEvent.click(btn);

    // must have 1 task created whit the task name passed
    expect(queryAllByText(newTask).length).toBe(1);

    // get remove task button
    const btnRemove = await waitForElement(() =>
      getByTestId(`remove-task-${newTask}`)
    );

    // click on the remove task button
    fireEvent.click(btnRemove);

    // the query by text must not find anything
    expect(queryByText(newTask)).toBeNull();
  });
});
