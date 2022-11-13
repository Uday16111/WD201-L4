/* eslint-disable no-undef */
const todoList = require("../todo");
let today = new Date().toLocaleDateString("en-CA");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Testing the TODO list", () => {
  beforeAll(() => {
    add({
      title: "Playing valorant for 2 hours",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });

  test("A new todo add to the list", () => {
    // expect(all.length).toBe(0);
    let length = all.length;

    add({
      title: "Watch K Drama for 2 hours",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toBe(length + 1);
  });

  test("A TODO which is completed is maarked", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("bringing all the TODO Back which are overdue", () => {
    let LT = overdue();

    expect(
      LT.every((todo) => {
        return todo.dueDate < today;
      })
    ).toBe(true);
  });

  test("retrieving all todos that are due for today", () => {
    let LT = dueToday();

    expect(
      LT.every((todo) => {
        return todo.dueDate === today;
      })
    ).toBe(true);
  });

  test("retrieving all todos that are due for later", () => {
    let LT = dueLater();

    expect(
      LT.every((todo) => {
        return todo.dueDate > today;
      })
    ).toBe(true);
  });
});
