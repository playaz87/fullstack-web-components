import {ButtonComponent} from './Button';
import { html } from 'lit-html';

export default {
  title: 'Components/Button',
  component: 'in-button'
}

const Template = ({label, variant, disabled}) => html`
  <button class="${variant}" is="in-button" ?disabled="${disabled}">${label}</button>
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
}

export const Icon = Template.bind({});
Icon.args = {
  variant: 'icon icon-close',
  label: svg
}

export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'primary',
  label: 'Disabled',
  disabled: 'true'
}