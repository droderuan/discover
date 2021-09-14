import { CoreTemplate, Content } from '@discover/ui-andromeda';

export function Index() {
  return (
    <CoreTemplate>
      <Content>
        <div
          style={{
            width: '100%',
            flexDirection: 'column',
            height: '100%',
            background: '#204090',
          }}
        >
          <div
            style={{
              background: '#ff9090',
              height: 80,
              flex: 1,
              flexShrink: 1,
              minWidth: 160,
            }}
          >
            1
          </div>
          <div style={{ background: '#aa9090', height: 80, width: 80 }}>2</div>
          <div style={{ background: '#ff3590', height: 80, width: 80 }}>3</div>
          <div style={{ background: '#ff1290', height: 80, width: 80 }}>4</div>
        </div>
      </Content>
    </CoreTemplate>
  );
}

export default Index;
