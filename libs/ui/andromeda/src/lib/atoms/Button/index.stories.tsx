import { Story, Meta } from '@storybook/react';
import Button from '.';
import { ButtonProps } from '@material-ui/core';

export default {
  title: 'Components/Atoms/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <Button {...args}>button</Button>
);

export const Primary = Template.bind({});
