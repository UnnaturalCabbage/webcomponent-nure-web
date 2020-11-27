import { Component } from "../../decorators";

const html = `
  <slot />
`;
const css = ` 
  :host {
    display: block;
    visibility: hidden;
  }

  :host(.surfacing) {
    visibility: visible;
    animation: 1s scroll-animation-surfacing-enter;
  }
  @keyframes scroll-animation-surfacing-enter {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  :host(.slide-from-left) {
    visibility: visible;
    animation: 1s scroll-animation-slide-from-left;
  }
  @keyframes scroll-animation-slide-from-left {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0%);
    }
  }

  :host(.slide-from-right) {
    visibility: visible;
    animation: 1s scroll-animation-slide-from-right;
  }
  @keyframes scroll-animation-slide-from-right {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0%);
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
  _animation = "surfacing";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const { animation } = this.dataset;
    if (animation) {
      this._animation = animation;
    }

    this._observer = new IntersectionObserver(this._onIntersection, {
      threshold: 0.1
    });
    this._observer.observe(this);
  }

  _onIntersection = ([e]) => {
    if (e && e.isIntersecting) {
      this._observer.unobserve(this);
      switch (this._animation) {
        case "surfacing":
          this.classList.add("surfacing");
          break;
        case "slide-from-left":
          this.classList.add("slide-from-left");
          break;
        case "slide-from-right":
          this.classList.add("slide-from-right");
          break;
        default: {}
      }
    }
  };
}
