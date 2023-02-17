import { Button, Card } from 'antd';
import React from 'react';
import ReactJoyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import styles from './index.module.css';

interface RootProps {}

const stepSelectors = [
  "[data-id='3667866668']",
  "[data-id='4104703633']",
  "[data-url*='ac/security/passwordmanagement']",
  "[title='Strength']",
  "[data-id*='3205063254']",
  "[data-id*='723818621']",
  "[title='Strength and Length enforcement']",
];

const Root = React.memo((props: RootProps) => {
  const currentStep = localStorage.getItem('tutorialStep');
  const [isSettingAvailable, setIsSettingAvailable] = React.useState(false);
  const [run, setRun] = React.useState(false);
  const [stepIndex, setStepIndex] = React.useState(
    currentStep ? Number.parseInt(currentStep || '0') : 0
  );
  const [steps] = React.useState<any>([
    {
      content: (
        <div>
          <h3>Click "Security"</h3>
          <br />
        </div>
      ),
      target: stepSelectors[0],
      hideFooter: true,
      disableBeacon: true,
    },
    {
      content: (
        <div>
          <h3>Click Overview</h3>
          <br />
        </div>
      ),
      target: stepSelectors[1],
      hideFooter: true,
    },
    {
      content: (
        <div>
          <h3>
            Let's take a look at your password management policies. Click
            "Password management
          </h3>
          <br />
        </div>
      ),
      target: stepSelectors[2],
      hideFooter: true,
    },
    {
      content: (
        <div>
          <h3>
            Click "Enforce strong password". This will take effect on new
            accounts only.
          </h3>
          <br />
        </div>
      ),
      target: stepSelectors[3],
      hideFooter: true,
    },
    {
      content: (
        <div>
          <h3>Click here.</h3>
          <br />
        </div>
      ),
      target: stepSelectors[4],
      hideFooter: true,
    },
    {
      content: (
        <div>
          <h3>Password Management</h3>
          <br />
        </div>
      ),
      target: stepSelectors[5],
      hideFooter: true,
    },
    {
      content: (
        <div>
          <h3>
            CAUTION: If you want to enforce this for all users immediately, then
            click "Enforce password policy at next sign-in". However, if you
            have a large number of users or those not technically saavy, be
            prepared.
          </h3>
          <br />
        </div>
      ),
      target: stepSelectors[6],
      hideFooter: true,
    },
  ]);

  const clickListener = React.useCallback(
    (e: any) => {
      const check = e.target.closest(stepSelectors[stepIndex]);

      if (check) {
        setTimeout(() => {
          setStepIndex((index) => index + 1);
          localStorage.setItem('tutorialStep', `${stepIndex + 1}`);
        }, 500);
      }
    },
    [stepIndex]
  );

  React.useEffect(() => {
    setTimeout(() => {
      if (document.querySelector("[data-id='3667866668']")) {
        setIsSettingAvailable(true);
      }
      if (currentStep) {
        setRun(true);
      }
    }, 3000);

    // const observer = new MutationObserver(function () {
    //   const currentStep = localStorage.getItem('tutorialStep');
    //   if (currentStep) {
    //     const stepInteger = Number.parseInt(currentStep);
    //     if (
    //       document.querySelector(
    //         stepSelectors[stepInteger + 1] // if next step is available
    //       )
    //     ) {
    //       // go next
    //       localStorage.setItem('tutorialStep', `${stepInteger + 1}`);
    //       setStepIndex((index) => index + 1);
    //       console.log('going next');
    //     }
    //   }
    // });

    // const config = { subtree: true, childList: true };
    // observer.observe(document, config);

    document.addEventListener('click', clickListener);
  }, [clickListener, currentStep]);

  const handleCallback = (data: any) => {
    const { action, index, status, type } = data;

    if ([EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      setTimeout(() => {
        setRun(true);
      }, 2000);
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
    }
  };

  if (isSettingAvailable)
    return (
      <div>
        <ReactJoyride
          callback={handleCallback}
          continuous
          run={run}
          stepIndex={stepIndex}
          disableScrolling
          disableScrollParentFix
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
            {currentStep || stepIndex || run ? (
              <Button
                type="primary"
                onClick={() => {
                  setStepIndex((index) => index + 1);
                  localStorage.setItem('tutorialStep', `${stepIndex + 1}`);
                  setRun(true);
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() => {
                  setRun(true);
                  localStorage.setItem('tutorialStep', '0');
                }}
              >
                Start
              </Button>
            )}

            <Button
              onClick={() => {
                setIsSettingAvailable(false);
                setRun(false);
                localStorage.removeItem('tutorialStep');
              }}
            >
              Close
            </Button>
          </div>
        </Card>
      </div>
    );
  else return <div></div>;
});

export default Root;
