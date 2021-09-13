import { DefaultAppConfig } from '@discover/ui-react-config'

export const decorators = [
  (Story) => (
    <DefaultAppConfig>
      <Story />
    </DefaultAppConfig>
  )
]

export const parameters = {
  layout: 'fullscreen',
};