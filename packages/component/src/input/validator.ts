import type { ValidityStateFlags } from 'types/lib.elementInternals';

export interface Validator {
  validations: {
    flag: ValidityStateFlags;
    condition: (elem: HTMLElement) => boolean;
    message?: string;
  }[];
}



export function validate(elem: any, showError: boolean) {
  if (!elem.$validator || !elem.$validator.validations) return;

  const messageElem = elem.shadowRoot.querySelector('.message');

  if (messageElem) messageElem.innerHTML = '';

  const activeValidators = [];

  for (const validator of (elem.$validator as Validator).validations) {
    if (validator.condition(elem)) {
      elem.setValidity(validator.flag, validator.message);
      activeValidators.push(validator);

      if (showError) {
        elem.$input.classList.add('error');

        if (messageElem) {
          const div = document.createElement('div');
          div.innerHTML = validator.message;
          messageElem.appendChild(div);
          break;
        }
      }
    } else {
      elem.$input.classList.remove('error');
    }
  }

  if (!activeValidators.length) {
    elem.setValidity({})
  }

  elem.dispatchEvent(new CustomEvent('validate', {bubbles: true}));
}