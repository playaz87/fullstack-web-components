import {ElementInternals} from 'element-internals-polyfill/dist/element-internals';
import type { ValidityStateFlags } from 'types/lib.elementInternals';
import { validate, Validator } from './validator';

export class TextInputComponent extends HTMLElement {
  static formAssociated = true;
  private internals: ElementInternals;
  public $validator: Validator;
  private $attr = {};

  constructor() {
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});
    const template = document.createElement('template');

    template.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: var(--font-default);
          font-size: var(--font-body-sm);
        }
        
        input {
          height: var(--input-min-dimension);
          width: 100%;
          border-radius: var(--radius-sm);
          border: var(--border-default);
          font-size: var(--font-body-md);
          outline: none;
          box-sizing: border-box;
          
          &:not(.error):not(:disabled) {
            &:focus, &:focus:hover, &:active {
              border: var(--border-focus);
            }
          }
          
          &.error {
            border: var(--border-error);
          }
          
          &:disabled {
            opacity: var(--color-disable);
            background: var(--color-disable);
            border: var(--border-disable);
          }
        }
        
        .message {
          margin-top: var(--margin-xxs);
          color: var(--color-error);
          font-weight: var(--font-weight-default);
        }
  
      </style>

      <div class="control">
        <input type="text"/>
      </div>
      <div class="message"></div>
    `;

    shadowRoot.appendChild(template.content.cloneNode(true));

    this.internals = this.attachInternals() as unknown as ElementInternals;
  }

  static get observedAttributes() {
    return [
      'name',
      'type',
      'required',
      'minlength',
      'maxlength',
      'pattern',
      'list',
      'placeholder',
      'readonly',
      'spellcheck',
      'disabled',
      'value',
    ];
  }

  set value(value: string) {
    this.$input.value = value;
  }

  get value(): string {
    return this.$input.value;
  }

  get disabled() {
    return this.$input.disabled;
  }

  set disabled(value: boolean | string) {
    if (value === 'true' || value === true) {
      this.$input.setAttribute('disabled', 'true');
    } else {
      this.$input.removeAttribute('disabled');
    }
  }

  set required(required: boolean | string) {
    if (required === true || required === 'true') {
      this.$input.setAttribute('required', 'true');
    } else {
      this.$input.setAttribute('required', 'false')
    }
  }

  get required(): boolean {
    return this.$input.required;
  }

  get type() {
    return this.$input.type ?? 'text';
  }
  set type(type: string) {
    this.$input.setAttribute('type', type);
  }

  get list() {
    return this.$input.list;
  }
  get minLength() {
    return this.$input.minLength;
  }
  set minLength(min: number) {
    this.$input.minLength = min;
  }
  get maxLength() {
    return this.$input.maxLength;
  }
  set maxLength(max: number) {
    this.$input.maxLength = max;
  }
  get readOnly() {
    return this.$input.readOnly;
  }
  get pattern() {
    return this.$input.pattern;
  }
  set pattern(pattern: string) {
    this.$input.pattern = pattern;
  }
  get placeholder() {
    return this.$input.placeholder;
  }
  get spellcheck() {
    return this.$input.spellcheck;
  }

  attributeChangedCallback(name, prev, next) {
    this.$attr[name] = next;
    switch (name) {
      case 'value':
        this.value = next;
        break;
      case 'disabled':
        this.disabled = next;
        break;
      case 'required':
        this.required = next;
        break;
      case 'type':
        this.$input.setAttribute('type', next);
        break;
      case 'minlength':
        this.$input.setAttribute('minlength', next);
        break;
      case 'maxlength':
        this.$input.setAttribute('maxlength', next);
        break;
      case 'pattern':
        this.$input.setAttribute('pattern', next);
        break;
      case 'list':
        this.$input.setAttribute('list', next);
        break;
      case 'placeholder':
        this.$input.setAttribute('placeholder', next);
        break;
      case 'readonly':
        this.$input.setAttribute('readonly', next);
        break;
      case 'spellcheck':
        this.$input.setAttribute('spellcheck', next);
        break;
    }
  }

  connectedCallback() {
    this.$input.onblur = () => {
      this.onValidate(true);
    }

    this.$input.onchange = () => {
      this.onChange();
    }

    console.log(this.$attr)

    for (const [k, v] of Object.entries(this.$attr)) {
      this.$input.setAttribute(k, v as string);
    }

    this.onValidate(false);
  }

  onChange() {
    console.log('onchange')
    // Clear error state on input
    this.shadowRoot.querySelector('.message').innerHTML = '';
    this.$input.classList.remove('error');
    this.internals.setFormValue(this.value, this.value)
  }

  formStateRestoreCallback(state: string, mode: string) {
    console.log('form state restore')
    this.value = state;
  }

  formDisabledCallback(disabled: boolean | string) {
    this.disabled = disabled;
  }

  formResetCallback(state: string) {
    this.value = this.getAttribute('value') ?? '';
  }

  checkValidity() {
    return this.internals.checkValidity();
  }

  get validity() {
    return this.internals.validity;
  }

  get validationMessage() {
    return this.internals.validationMessage;
  }

  get $input(): HTMLInputElement {
    return this.shadowRoot.querySelector('input');
  }

  setValidity(flags: ValidityStateFlags, message?: string, anchor?: HTMLElement): void {
    this.internals.setValidity(flags, message, anchor);
  }

  onValidate(showError: boolean) {
    console.log('on validate', showError)
    validate(this, showError);
  }

  focus() {
    this.$input.focus();
  }

  blur() {
    this.$input.blur();
  }
}
customElements.define('in-textinput', TextInputComponent);
