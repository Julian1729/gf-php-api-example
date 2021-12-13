import Question from "./Question";

class GravityFormQuestion extends Question {
  constructor({
    index,
    question,
    questionTemplate,
    optionTemplate,
    // onOptionSelect,
    nextHandler,
    prevHandler,
  }) {
    super({ nextHandler, prevHandler, questionTemplate, index });
    this._choices = question.choices;
    this._required = question.required;
    this._id = question.id;
    this._type = question.type;
    this._label = question.label;
    this._subheading = question.subheading;
    this._className = question.className;
    this._optionTemplate = optionTemplate;
    // this._onOptionSelect = onOptionSelect;

    this._index = index;

    this._name = `input_${this._id}`;

    this._inputElements = [];

    this._choiceElements = this._generateChoiceElements();
  }

  getView() {
    // set id
    this._element.id = `question-${this._id}`;

    // set question label
    this._element.querySelector(".question__heading").textContent = this._label;

    if (this._subheading) {
      const subheading = this._element.querySelector(".question__subheading");
      subheading.textContent = this._subheading;
      subheading.classList.add("question__subheading--show");
    }

    // append options to list
    const optionListEl = this._element.querySelector(".question__option-list");
    optionListEl.append(...this._choiceElements);
    if (this._className) {
      optionListEl.classList.add(this._className);
    }

    const backBtnEl = this._element.querySelector(".question__back-button");
    const nextBtnEl = this._element.querySelector(".question__next-button");

    // add handler to button
    if (this._type === "radio") {
      // no need for next button, it will automatically go to next question
      nextBtnEl.remove();
    }

    // remove back button on first card
    if (this._index === 0) {
      backBtnEl.remove();
    }

    return this._element;
  }

  _generateChoiceElements() {
    return this._choices.map(({ value, selected, text }, i) => {
      const optionEl = this._optionTemplate.cloneNode(true);
      const inputEl = optionEl.querySelector(".option__input");
      const labelEl = optionEl.querySelector(".option__label");
      const textEl = optionEl.querySelector(".option__text");
      const markEl = optionEl.querySelector(".option__mark");
      const optionId = `${this._id}_quiz_${i}`;
      // radio or checkbox
      inputEl.type = this._type;
      // set mark class
      markEl.classList.add(`option__mark--type--${this._type}`);
      // set name
      inputEl.name =
        this._type === "checkbox" ? `${this._name}.${i + 1}` : this._name;
      // set value
      inputEl.value = value;
      // selected
      inputEl.checked = selected;
      // set id
      inputEl.id = optionId;
      // set for id
      labelEl.setAttribute("for", optionId);
      // set label text
      textEl.textContent = text;
      // add change listener
      switch (this._type) {
        case "radio":
          inputEl.addEventListener("click", this._nexthandler);
          // inputEl.addEventListener("change", this._nexthandler);
          break;
        default:
          this._nextButton.enable();
      }
      // collect input
      this._inputElements.push(inputEl);
      return optionEl;
    });
  }

  get value() {
    return this._inputElements.find((e) => e.checked);
  }

  get required() {
    return this._required;
  }
}

export default GravityFormQuestion;
