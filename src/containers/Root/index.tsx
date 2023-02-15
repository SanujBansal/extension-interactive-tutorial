import { Button, Card } from 'antd';
import React from 'react';
import ReactJoyride from 'react-joyride';
import styles from './index.module.css';

interface RootProps {}

const Root = React.memo((props: RootProps) => {
  const [isSettingAvailable, setIsSettingAvailable] = React.useState(false);
  const [run, setRun] = React.useState(false);

  const [steps] = React.useState<any>([
    {
      content: (
        <div>
          <h3>Click on the settings Icon</h3>
          <br />
        </div>
      ),
      target: '#node-N79-3667866668',
    },
  ]);
  React.useEffect(() => {
    setTimeout(() => {
      if (document.querySelector('#node-N79-3667866668')) {
        setIsSettingAvailable(true);
      }
    }, 4000);
  }, []);

  if (isSettingAvailable)
    return (
      <div>
        <ReactJoyride
          continuous
          run={run}
          showProgress
          spotlightClicks
          showSkipButton
          steps={steps}
          styles={{
            options: {
              zIndex: 10000,
            },
          }}
        />
        <Card className={styles.card}>
          <h4>Hello, Do you want me to guide you? Click Start Button Below.</h4>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button type="primary" onClick={() => setRun(true)}>
              Start
            </Button>
            <Button onClick={() => setIsSettingAvailable(false)}>Close</Button>
          </div>
        </Card>
      </div>
    );
  else return <div></div>;
});

export default Root;
