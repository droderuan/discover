import { Toolbar } from '@material-ui/core';
import WhiteBoard from '../../atoms/WhiteBoard';
import AppMenu from '../../organisms/AppMenu';
import { useDeviceStatus } from '@discover/ui/next';
import { AsideItemProps } from '../../organisms/AppMenu';
import Headerbar from '../../organisms/Header';

interface CoreTemplateProps {
  menuRoutes: AsideItemProps[];
}

const CoreTemplate: React.FC<CoreTemplateProps> = ({
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
        {isMobile ? (
          <>
            <main style={{ flex: 1 }}>
              <WhiteBoard>{children}</WhiteBoard>
            </main>
            <Toolbar />
            <AppMenu items={menuRoutes} />
          </>
        ) : (
          <>
            <aside>
              <AppMenu items={menuRoutes} />
            </aside>
            <main style={{ flex: '1' }}>
              <WhiteBoard>{children}</WhiteBoard>
            </main>
          </>
        )}
      </div>
    </>
  );
};

export default CoreTemplate;
