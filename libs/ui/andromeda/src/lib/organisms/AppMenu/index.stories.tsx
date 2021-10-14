import { Story, Meta } from '@storybook/react';
import AppMenu, { AppMenuProps } from '.';
import { AppMenuProvider } from './context';
import HomeIcon from '@material-ui/icons/Home';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';

export default {
  title: 'Components/Organisms/AppMenu',
  component: AppMenu,
} as Meta;

const Template: Story<AppMenuProps> = (args) => (
  <AppMenuProvider>
    <AppMenu
      {...args}
      items={[
        {
          icon: HomeIcon,
          label: 'home',
          path: '/',
          focused: true,
        },
        {
          icon: AddToQueueIcon,
          label: 'meet',
          path: '/',
        },
      ]}
    />
  </AppMenuProvider>
);

export const Primary = Template.bind({});
