import { Story, Meta } from '@storybook/react';
import WhiteBoard from '.';
import { BoxProps } from '@material-ui/core';

export default {
  title: 'Components/Atoms/WhiteBoard',
  component: WhiteBoard,
  parameters: {
    docs: {
      page: () => (
        <>
          <h1>Explanation about the css</h1>
          <h3>
            This component was created to be used with AppBar component of the
            material ui
          </h3>
          <p>
            The theme.mixins.toolbar has the styles of the ToolBar component.
            This component is beign used in the Header. Because it changes the
            height dinamically, is necessary to get its height.
          </p>
          <p>
            https://stackoverflow.com/questions/55344569/how-do-i-change-the-material-ui-toolbar-height{' '}
            <br />
            https://github.com/mui-org/material-ui/issues/10076#issuecomment-361232810
          </p>
        </>
      ),
    },
  },
} as Meta;

const Template: Story<BoxProps> = (args) => (
  <WhiteBoard {...args}>
    <h1>whiteboard</h1>
  </WhiteBoard>
);

export const Primary = Template.bind({});
