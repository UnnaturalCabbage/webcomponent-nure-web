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
    animation: var(--animation-time) var(--animation);
  }

  @keyframes scroll-animation-surfacing {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes scroll-animation-slide-from-left {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0%);
    }
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

/**
 * Animate once the content inside this component when it is in the viewport
 * 
 * @element component-scroll-animation
 * @slot
 * 
 * @attribute {"scroll-animation-surfacing" | "scroll-animation-slide-from-left" | "scroll-animation-slide-from-right"} animation - animation that will be played
 * @attribute {string} animation-time -
 * 
 * @example
 *   <component-scroll-animation data-animation="scroll-animation-surfacing" data-animation-time="1.5s"></<component-scroll-animation>
 */
@Component({
  tag: "scroll-animation"
})
class ScrollAnimation extends HTMLElement {
  _observer;
  _animation;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const {
      animation = "",
      animationTime = "1s"
    } = this.dataset;
    const style = document.createElement("style");
    style.innerHTML = `
      :host {
        --animation: ${animation};
        --animation-time: ${animationTime};
      }
    `;
    this.shadowRoot.appendChild(style);

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
