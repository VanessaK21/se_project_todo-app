class Todo {
  constructor(data, selector, handleCheck, _handleDelete) {
    this._completed = data.completed;
    this._name = data.name;
    this._date = data.date;
    this._id = data.id;
    this._selector = selector;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete(this._completed);
      this._remove();
    });
    this._todoCheckboxEl.addEventListener("change", () => {
      this._toggleCompletion();
      this._handleCheck(this._completed);
    });
  }
  _generateDatesElement() {
    this._dueDate = new Date(this._data.date);
    if (!isNaN(this._dueDate)) {
      this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}`;
    }
  }

  _toggleCompletion = () => {
    this._completed = !this._completed;
  };
}

_remove = () => {
  this._element.remove();
};
getView();
this._todoElement = this._templateElement.content
  .querySelector(".todo")
  .cloneNode(true);

this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
this._todoLabel = this._todoElement.querySelector(".todo__label");
this._todoCheckboxEl.checked = this._data.completed;
this._todoCheckboxEl.id = `todo-${this._data.id}`;
this._todoLabel.setAttribute("for", `todo-${this._data.id}`);

const todoNameEl = this._todoElement.querySelector(".todo__name");

const todoDate = this._todoElement.querySelector(".todo__date");
const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
this._todoDeleteBtn = todoDeleteBtn;
this._todoDate = todoDate;

todoNameEl.textContent = this._data.name;

this._setEventListeners();
this._generateDatesElement();

return this._todoElement;

export default Todo;
