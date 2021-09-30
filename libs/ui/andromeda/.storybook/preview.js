import { DefaultAppConfig } from '@discover/ui-next';

export const decorators = [
  (Story) => (
    <DefaultAppConfig>
      <Story />
    </DefaultAppConfig>
  ),
];

export const parameters = {
  layout: 'fullscreen',
};
