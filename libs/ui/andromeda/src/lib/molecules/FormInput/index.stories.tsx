import { Story, Meta } from '@storybook/react';
import FormInput, { FormInputProps } from '.';

export default {
  title: 'Components/Organisms/AsideMenu',
  component: FormInput,
} as Meta;

const Template: Story<FormInputProps> = (args) => <FormInput label="Text" />;

export const Primary = Template.bind({});
