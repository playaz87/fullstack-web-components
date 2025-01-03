export class CardComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});

    const template = document.createElement('template');
    template.innerHTML = `<span>Hello World</span>`;

    shadowRoot.appendChild(template.content.cloneNode(true));

    customElements.define('in-card', CardComponent);
  }
}