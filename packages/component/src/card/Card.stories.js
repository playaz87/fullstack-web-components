import {CardComponent} from './Card';

export default {
  title: 'Components/Card',
  argTypes: {
    image: {
      control: {type: 'text'}
    },
    headline: { control: {type: 'text'}},
    content: { control: {type: 'text'}},
    link: { control: {type: 'text'}},
  }
}

const PrimaryTemplate = ({image, headline, content, link}) => `<in-card>
  <img slot="header" src="${image ?? 'https://picsum.photos/600/400'}">
  <h4 slot="header">${headline ?? 'Food'}</h4>
  <p slot="content">${content ?? 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci asperiores commodi hic inventore ipsa laboriosam modi nihil quae saepe veniam.'}</p>
  <a href="#" slot="footer">${link ?? 'Read'}</a>
</in-card>`;

export const ImageCard = PrimaryTemplate.bind({});