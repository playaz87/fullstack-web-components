import {ButtonComponent} from './Button';
import { html } from 'lit-html';
import { nothing } from 'lit-html';

export default {
  title: 'Components/Button',
  component: 'in-button'
}

const Template = ({label, variant, disabled, svg}) => html`
  <button class="${variant}" is="in-button" ?disabled="${disabled}" aria-labelledby="${label}-btn-label">
    ${svg ? nothing : label}
    ${svg}
    ${svg ? html`<span id="${label}-btn-label" hidden="true">${label}</span>`: nothing}
  </button>
`;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
  variant: 'primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
  variant: 'secondary'
};


let icon = null;
let svg;

if (window.FontAwesome) {
  icon = window.FontAwesome.icon({prefix: 'fas', iconName: 'plus'});
  svg = icon.node[0];
  svg.setAttribute('aria-hidden', true);
}

export const Icon = Template.bind({});
Icon.args = {
  variant: 'icon icon-close',
  label: 'close',
  svg: svg
}

export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'primary',
  label: 'Disabled',
  disabled: 'true'
}