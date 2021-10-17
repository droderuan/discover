import { Toolbar } from '@material-ui/core';
import WhiteBoard from '../../atoms/WhiteBoard';
import MobileAppMenu from '../../organisms/MobileAppMenu';
import { ItemsAppMenuProps } from '../../organisms/MobileAppMenu';
import { useDeviceStatus } from '@discover/ui/next';
import Headerbar from '../../organisms/Header';

interface CoreTemplateProps {
  menuRoutes: ItemsAppMenuProps[];
}

const MobileCoreTemplate: React.FC<CoreTemplateProps> = ({
  menuRoutes,
  children,
}) => {
  const { isMobile } = useDeviceStatus();

  return (
    <>
      <Headerbar />
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <main style={{ flex: 1 }}>
          <WhiteBoard>{children}</WhiteBoard>
        </main>
        <Toolbar />
        <MobileAppMenu items={menuRoutes} />
      </div>
    </>
  );
};

export default MobileCoreTemplate;
