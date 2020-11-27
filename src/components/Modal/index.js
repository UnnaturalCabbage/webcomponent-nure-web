import { Component } from "../../decorators";

const html = `
  <div class="backdrop" id="backdrop"></div>
  <div class="container">
    <slot />
  </div>
`;
const css = `
  :host {
    position: fixed;
    z-index: 999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :host(.enter) {
    animation: enter 0.2s forwards;
  }
  :host(.exit) {
    animation: exit 0.2s forwards;
  }

  .backdrop {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .container {
    position: absolute;
    padding: 10px;
    border-radius: 5px;
    background-color: #fff;
  }

  @keyframes enter {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
      display: flex;
    }
  }
  @keyframes exit {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      z-index: -1;
      display: none;
    }
  }
`;

const template = document.createElement("template");
template.innerHTML = `<style>${css}</style>${html}`;

@Component({
  tag: "modal"
})
class Modal extends HTMLElement {
  _rendered = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.addEventListener("click", (e) => {
      switch (e.target.id) {
        case "backdrop": {
          this.closeModal();
          break;
        }
        default: {
        }
      }
    });
  }

  openModal = () => {
    this.classList.remove("exit");
    this.classList.add("enter");
    if (!this._rendered) {
      this._rendered = true;
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  };

  closeModal = () => {
    this.classList.remove("enter");
    this.classList.add("exit");
  };
}
