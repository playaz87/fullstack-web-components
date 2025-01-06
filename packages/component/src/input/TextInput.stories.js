import {TextInputComponent} from './TextInput';
import {html} from 'lit-html';

export default {
  title: 'Components/Inputs/TextInput',
  component: 'in-textinput'
}

const validators = {
  username: {
    validations:[
      {
        flag: {valueMissing: true},
        message: "Required",
        condition: (input) => input.required && !input.value.length
      },
      {
        flag: {tooShort: true},
        message: "Too short",
        condition: (input) => input.minLength && input.value.length < input.minLength
      }
    ]
  },
  password: {
    validations: [
      {
        flag: {valueMissing: true},
        message: "Required",
        condition: (input) => input.required && !input.value.length
      },
      {
        flag: {tooShort: true},
        message: "Too short",
        condition: (input) => input.minLength && input.value.length < input.minLength
      },
      {
        flag: {patternMismatch: true},
        message: "Invalid",
        condition: input => input.pattern && !(new RegExp(input.pattern).test(input.value))
      }
    ]
  }
}

const PrimaryTemplate = ({onValidate, validators}) => {
  setTimeout(() => {
    const input = document.querySelector('[name="username"]');
    input.$validator = validators.username;
  }, 0);
  return html`<form @validate="${onValidate}"><in-textinput name="username" required="true"></in-textinput></form>`;
}

export const Primary = PrimaryTemplate.bind({});

Primary.args = {
  validators,
  onValidate: (ev) => {
    console.log('validating')
    if (!document.querySelector('[name="username"]').validity.valid) {
      console.warn('INVALID');
    } else {
      console.warn('VALID');
    }
  }
}

const DisabledTemplate = () => html`<in-textinput
  value="disabled input"
  disabled
  name="test-input"
></in-textinput>`

export const Disabled = DisabledTemplate.bind({});
Disabled.args = {};


const ErrorTemplate = ({}) => {
  setTimeout(() => {
    const input = document.querySelector('[name="username"]');
    input.$validator = validators.username;
    input.focus();
    input.blur();
  }, 0);

  return html`<in-textinput type="text" id="username" name="username" required="true" class="form-control"></in-textinput>`
}

export const Error = ErrorTemplate.bind({});
// Error.args = {
//   validators
// };

const FormTemplate = ({headline, onSubmit, onValidate, onFormData}) => {
  setTimeout(() => {
    for (const prop in validators) {
      document.querySelector(`[name="${prop}"]`).$validator = validators[prop];
    }
  }, 0)
  return html`
    <h4 slot="header">${headline}</h4>
    <form
      name="foo"
      slot="content"
      @formdata="${onFormData}"
      @validate="${onValidate}"
      @submit="${onSubmit}"
    >
      <fieldset>
        <legend>Login Form</legend>
        <label for="username">Username</label>
        <in-textinput
          type="text"
          id="username"
          name="username"
          required="true"
          minlength="8"
          class="form-control"
        ></in-textinput>
        <label for="username">Password</label>
        <in-textinput
          type="password"
          id="password"
          name="password"
          required="true"
          minlength="8"
          pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
          class="form-control"
        ></in-textinput>
        <input class="submit" type="submit" value="Submit">
      </fieldset>
    </form>
  `
}

export const Form = FormTemplate.bind({});
Form.args = {
  headline: 'Login',
  onSubmit: ev => {
    // Instantiating FormData causes onFormData event
    console.log(new FormData(ev.target));
    ev.preventDefault();
  },
  onFormData: ev => {
    console.log(ev);
    for (const value of ev.formData.values()) {
      console.log(value);
    }
  },
  onValidate: ev => {
    const validations = [];
    for (const prop in validators) {
      validations.push(document.querySelector(`[name="${prop}"]`).validity.valid);
    }
    if (validations.some(v => !v)) console.warn(`INVALID ${validations}`);
    else console.warn('VALID');
  }
}