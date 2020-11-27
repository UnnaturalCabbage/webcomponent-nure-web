import { Component } from "../../decorators";

const html = `
  <slot />
`;
const css = ` 
  :host {
    display: block;
  }
`;

const template = document.createElement("template");
template.innerHTML = `<style>${css}</style>${html}`;

@Component({
  tag: "modal-button"
})
class ModalButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const { for: forModal } = this.dataset;

    this.shadowRoot.addEventListener("click", () => {
      const modalToOpen = document.getElementById(forModal);
      console.log(modalToOpen);
      if (modalToOpen) {
        modalToOpen.openModal();
      }
    });
  }
}
