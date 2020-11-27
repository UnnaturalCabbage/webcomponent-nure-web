import { Component } from "../../decorators";

const html = `
  <slot />
`;
const css = ` 
  :host {
    display: block;
    visibility: hidden;
  }

  :host(.enter) {
    visibility: visible;
    animation: 1s animation-surfacing-enter;
  }

  @keyframes animation-surfacing-enter {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const template = document.createElement("template");
template.innerHTML = `<style>${css}</style>${html}`;

@Component({
  tag: "scroll-animation"
})
class ScrollAnimation extends HTMLElement {
  _observer = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this._observer = new IntersectionObserver(this._onIntersection, {
      threshold: 0.1
    });
    this._observer.observe(this);
  }

  _onIntersection = ([e]) => {
    if (e && e.isIntersecting) {
      this._observer.unobserve(this);
      this.classList.add("enter");
    }
  };
}
