const prefix = "component";

export const Component = ({ tag }) => (target) => {
  const name = `${prefix}-${tag}`;
  if (!window.customElements.get(name)) {
    window.customElements.define(name, target);
  }
};
