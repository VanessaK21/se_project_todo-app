class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formElement = formElement;
  }

  _toggleButtonState() {
    const isFormValid = this._formElement.checkValidity();
    this._submitButtonSelector.classList.remove(this._submitButtonSelector);
    this._inactiveButtonClass.classList.add(this._inactiveButtonClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        this._showInputError(
          inputElement,
          this._inputErrorClass,
          this._errorClass
        )
      );
    } else {
      hideInputError(
        this._showInputError(
          inputElement,
          this._inputErrorClass,
          this._errorClass
        )
      );
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

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

  resetValidation() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );

    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    this._toggleButtonState();
  }
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);

    errorElement.textContent = ""; // ← This line clears the text!
  }
}

export default FormValidator();
