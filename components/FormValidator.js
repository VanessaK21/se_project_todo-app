class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._formSelector = settings.formSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formElement = formElement;
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        this._formElement,
        this._inputElement,
        this._inputElement.validationMessage,
        this._settings
      );
    } else {
      hideInputError(this._formElement, this._inputElement, this._settings);
    }
  }

  setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    _toggleButtonState(this._inputList, this._buttonElement, this._settings);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        toggleButtonState(this._inputList, this._buttonElement, this._settings);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
  resetValidation() {}


  _showInputError() {}

_toggleButtonState() {
    _checkInputValidity(this._formElement)
    classList.add(this._submitButtonSelector)
    }

export default FormValidator;
