import NavButton from "./NavButton";

class Question {
  constructor({ element, nextHandler, prevHandler, questionTemplate, index }) {
    this._element = element ? element : questionTemplate.cloneNode(true);

    this._index = index;

    this._nextBtnEl = this._element.querySelector(".question__next-button");
    this._backBtnEl = this._element.querySelector(".question__back-button");

    this._nexthandler = nextHandler;
    this._prevHandler = prevHandler;

    this._nextButton = new NavButton({
      buttonEl: this._nextBtnEl,
      clickHandler: nextHandler,
    });

    this._backButton = new NavButton({
      buttonEl: this._backBtnEl,
      clickHandler: prevHandler,
    });
  }

  // _setEventListeners() {
  //   this._nextBtnEl.addEventListener("click", this._nextHandler.bind(this));
  //   this._backBtnEl.addEventListener("click", this._prevHandler.bind(this));
  // }

  hide() {
    console.log("hide");
    this._element.classList.remove("question--appear");
  }

  appear() {
    this._element.classList.add("question--appear");
  }

  pass() {
    this._element.classList.add("question--pass");
  }

  reappear() {
    this._element.classList.remove("question--pass");
  }
}

export default Question;
