import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];

// Initialize todo counter with initial todos
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

// Handlers for checkbox and delete actions
function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

// Generates a Todo DOM element from data
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  return todo.getView();
};

// Section instance to manage rendering todos
const section = new Section({
  items: initialTodos, // Pass initial todos here with correct key 'items'
  renderer: (item) => {
    const todoEl = generateTodo(item);
    section.addItem(todoEl);
  },
  containerSelector: ".todos__list",
});

// Render initial todos
section.renderItems();

// Popup for adding new todos
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const { name, date: dateInput } = inputValues;
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const todoData = { name, date, id, completed: false };
    const todoEl = generateTodo(todoData);

    section.addItem(todoEl);
    todoCounter.updateCompleted(true); // New todo is initially not completed
    todoCounter.updateTotal(true);

    addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

// Open popup on button click
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// Initialize form validation for the add todo form
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
