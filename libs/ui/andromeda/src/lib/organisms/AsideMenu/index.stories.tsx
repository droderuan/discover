import { Story, Meta } from '@storybook/react';
import AsideMenu, { AsideMenuProps } from '.';
import { AsideMenuProvider } from './context';
import HomeIcon from '@material-ui/icons/Home';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';

export default {
  title: 'Components/Organisms/AsideMenu',
  component: AsideMenu,
} as Meta;

const Template: Story<AsideMenuProps> = (args) => (
  <AsideMenuProvider>
    <AsideMenu
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
  </AsideMenuProvider>
);

export const Primary = Template.bind({});
