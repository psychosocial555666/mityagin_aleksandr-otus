import { html, css, LitElement } from 'lit';

export class Leaf extends LitElement {
  static styles = css`p { color: green }`;

  static properties = {
    id: { type: String },
    items: { type: Array },
  };

  constructor() {
    super();
    this.id = 'Somebody';
  }

  itemTemplate(item) {
    return html`
    <div tree=${JSON.stringify(item)}>
      <my-tree></my-tree>
    </div>
    `;
  }

  render() {
    return html`
    <li>Item - ${this.id}
    ${this.items.map(item => this.itemTemplate(item))}
    </li>
    `;
  }
}

export class Tree extends LitElement {
  static styles = css`ul { color: #804030 }`;

  static properties = {
    structure: { type: Object },
  };

  constructor() {
    super();
  }

  render() {
    this.structure = JSON.parse(this.parentElement.getAttribute('tree'));
    return html`<ul><my-leaf id=${this.structure.id} items=${JSON.stringify(this.structure.items || [])}></my-tree></ul>`;
  }
}

customElements.define('my-tree', Tree);
customElements.define('my-leaf', Leaf);