import HomeIcon from '@material-ui/icons/Home';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';

import Headerbar from '../../organisms/Header';
import AppDrawer from '../../organisms/AppDrawer';

const CoreTemplate: React.FC = () => {
  return (
    <>
      <Headerbar />
      <AppDrawer
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
          {
            icon: AddToQueueIcon,
            label: 'new meet',
          },
        ]}
      />
    </>
  );
};

export default CoreTemplate;
