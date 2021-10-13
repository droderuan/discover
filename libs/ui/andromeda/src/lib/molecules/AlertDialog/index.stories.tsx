import { Story, Meta } from '@storybook/react';
import AlertDialog, { AlertDialogProps } from '.';

export default {
  title: 'Components/Organisms/AlertDialog',
  component: AlertDialog,
  argTypes: {
    open: {
      default: true,
      options: [true, false],
      control: { type: 'radio' },
    },
    actions: {
      options: [
        [
          { label: 'click', action: () => console.log('hi') },
          { label: 'click2', action: () => console.log('hi2') },
        ],
      ],
    },
  },
} as Meta;

const Template: Story<AlertDialogProps> = (args) => <AlertDialog {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  open: true,
  title: 'title',
  message: 'A long message here',
};
