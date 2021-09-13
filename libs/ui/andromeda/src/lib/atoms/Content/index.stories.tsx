import { Story, Meta } from '@storybook/react';
import Content from '.';
import { BoxProps } from '@material-ui/core';

export default {
  title: 'Components/Atoms/Content',
  component: Content,
} as Meta;

const Template: Story<BoxProps> = (args) => (
  <Content {...args}>
    <h1>Content</h1>
  </Content>
);

export const Primary = Template.bind({});
