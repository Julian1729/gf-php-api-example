class NavButton {
  constructor({ buttonEl, clickHandler }) {
    this._buttonEl = buttonEl;
    this._clickHandler = clickHandler;

    this._buttonEl.addEventListener("click", this._clickHandler);
  }

  enable() {
    this._buttonEl.classList.remove("nav-button--disabled");
    this._buttonEl.disabled = false;
  }

  disable() {
    this._buttonEl.classList.add("nav-button--disabled");
    this._buttonEl.disabled = true;
  }
}

export default NavButton;
