import { Slide, Toolbar, useScrollTrigger } from '@material-ui/core';
import WhiteBoard from '../../atoms/WhiteBoard';
import MobileAppMenu from '../../organisms/MobileAppMenu';
import { ItemsAppMenuProps } from '../../organisms/MobileAppMenu';
import MobileHeader from '../../organisms/MobileHeader';

interface CoreTemplateProps {
  menuRoutes: ItemsAppMenuProps[];
}

const MobileCoreTemplate: React.FC<CoreTemplateProps> = ({
  menuRoutes,
  children,
}) => {
  const trigger = useScrollTrigger();
  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <MobileHeader />
      </Slide>
      <Toolbar />
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <main style={{ flexGrow: 1 }}>
          <WhiteBoard>{children}</WhiteBoard>
        </main>
        <MobileAppMenu items={menuRoutes} />
      </div>
    </>
  );
};

export default MobileCoreTemplate;
