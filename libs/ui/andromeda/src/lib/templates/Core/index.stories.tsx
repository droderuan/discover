import CoreTemplate from '.';
import { AppDrawerProvider } from '../../organisms/AppDrawer/context';

export default {
  title: 'Components/Templates/CoreTemplate',
  component: CoreTemplate,
};
export const Primary = () => (
  <AppDrawerProvider>
    <CoreTemplate />
  </AppDrawerProvider>
);
