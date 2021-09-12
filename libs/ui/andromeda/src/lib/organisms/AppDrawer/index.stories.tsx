import { Story, Meta } from '@storybook/react';
import AppDrawer, { AppDrawerProps } from '.';
import { AppDrawerProvider } from './context';
import HomeIcon from '@material-ui/icons/Home';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';

export default {
  title: 'Components/Organisms/AppDrawer',
  component: AppDrawer,
} as Meta;

const Template: Story<AppDrawerProps> = (args) => (
  <AppDrawerProvider>
    <AppDrawer
      {...args}
      items={[
        {
          icon: HomeIcon,
          label: 'home',
          focused: true,
        },
        {
          icon: AddToQueueIcon,
          label: 'meet',
        },
      ]}
    />
  </AppDrawerProvider>
);

export const Primary = Template.bind({});
