import CoreTemplate from '.';
import { AsideMenuProvider } from '../../organisms/AsideMenu/context';

export default {
  title: 'Components/Templates/CoreTemplate',
  component: CoreTemplate,
};
export const Primary = () => (
  <AsideMenuProvider>
    <CoreTemplate />
  </AsideMenuProvider>
);
