import { Story, Meta } from '@storybook/react';
import FormInput, { FormInputProps } from '.';

export default {
  title: 'Components/Organisms/AppMenu',
  component: FormInput,
} as Meta;

const Template: Story<FormInputProps> = (args) => (
  <FormInput label="Text" name="text" clearErrors={() => alert('clearing')} />
);

export const Primary = Template.bind({});
