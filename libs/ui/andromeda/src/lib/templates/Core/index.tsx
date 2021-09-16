import HomeIcon from '@material-ui/icons/Home';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';

import Headerbar from '../../organisms/Header';
import AsideMenu from '../../organisms/AsideMenu';
import WhiteBoard from '../../atoms/WhiteBoard';

const CoreTemplate: React.FC = ({ children }) => {
  return (
    <>
      <Headerbar />
      <div style={{ display: 'flex' }}>
        <aside>
          <AsideMenu
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
              {
                icon: AddToQueueIcon,
                label: 'new meet',
                path: '/',
              },
            ]}
          />
        </aside>
        <main style={{ flex: '1' }}>
          <WhiteBoard>{children}</WhiteBoard>
        </main>
      </div>
    </>
  );
};

export default CoreTemplate;
