import { Story, Meta } from '@storybook/react';
import IconButon, { IconButtonProps } from '.';
import HomeIcon from '@material-ui/icons/Home';

export default {
  title: 'Components/Atoms/IconButon',
  component: IconButon,
} as Meta;

const Template: Story<IconButtonProps> = (args) => <IconButon {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  icon: HomeIcon,
  label: 'Button',
};
