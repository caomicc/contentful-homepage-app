import React, { useCallback, useState, useEffect } from 'react';
import { ConfigAppSDK } from '@contentful/app-sdk';
import {
  Heading,
  Form,
  // Accordion,
  Flex,
  Checkbox,
} from '@contentful/f36-components';
import { css } from 'emotion';
import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import { ContentTypeProps, EditorInterface } from 'contentful-management';
import tokens from '@contentful/f36-tokens';
import { getInitialSidebarContentTypes } from '../utils/sidebar';
import {
  filterShortTextFieldCTs,
  getInitialFieldContentTypes,
  buildFieldTargetState,
} from '../utils/shortTextField';
const merge = require('lodash.merge');

export interface AppInstallationParameters {}

const styles = {
  body: css({
    height: 'auto',
    minHeight: '65vh',
    margin: '0 auto',
    marginTop: tokens.spacingXl,
    padding: `${tokens.spacingXl} ${tokens.spacing2Xl}`,
    maxWidth: tokens.contentWidthText,
    backgroundColor: tokens.colorWhite,
    zIndex: 2,
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '2px',
  }),
  background: css({
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    top: 0,
    width: '100%',
    height: '300px',
    backgroundColor: tokens.colorPrimary,
  }),
};

const buildSidebarTargetState = (selectedSidebarCTs: string[]) => {
  console.log('building state...');
  console.log('selectedSidebarCTs', selectedSidebarCTs);
  const endResult = selectedSidebarCTs.reduce(
    (acc, ct) => ({
      ...acc,
      [ct]: {
        sidebar: { position: 0 },
      },
    }),
    {}
  );
  console.log('endResult', endResult);
};

const onCTSelect = (
  selectedCTs: string[],
  setSelectedCTs: (cts: string[]) => void,
  ct: string
) => {
  console.log('onCTSelect, ct', selectedCTs, ct);

  console.log(
    'selectedCTs.includes(ct)',
    selectedCTs.includes(ct),
    selectedCTs.filter((item) => item !== ct)
  );

  selectedCTs.includes(ct)
    ? setSelectedCTs(selectedCTs.filter((item) => item !== ct))
    : setSelectedCTs([...selectedCTs, ct]);
};

const ConfigScreen = () => {
  const [parameters, setParameters] = useState<AppInstallationParameters>({});
  const [contentTypes, setContentTypes] = useState<ContentTypeProps[]>([]);
  const [selectedSidebarCTs, setSelectedSidebarCTs] = useState<string[]>([]);
  // const [supportedFieldCTs, setSupportedFieldCTs] = useState<
  //   ContentTypeProps[]
  // >([]);
  // const [selectedFieldCTs, setSelectedFieldCTs] = useState<string[]>([]);
  const sdk = useSDK<ConfigAppSDK>();
  const cma = useCMA();

  const onConfigure = useCallback(async () => {
    // This method will be called when a user clicks on "Install"
    // or "Save" in the configuration screen.
    // for more details see https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/#register-an-app-configuration-hook

    // Get current the state of EditorInterface and other entities
    // related to this app installation
    const currentState = await sdk.app.getCurrentState();

    console.log('selectedSidebarCTs', selectedSidebarCTs);
    console.log(
      'buildSidebarTargetState',
      buildSidebarTargetState(selectedSidebarCTs)
    );

    return {
      // Parameters to be persisted as the app configuration.
      parameters: {
        selectedSidebarCTs,
      },
      // In case you don't want to submit any update to app
      // locations, you can just pass the currentState as is
      targetState: {
        EditorInterface: {
          // ...currentState?.EditorInterface,

          // apply to all selected content types' sidebar & fields
          ...merge(buildSidebarTargetState(selectedSidebarCTs)),
        },
      },
    };
  }, [parameters, sdk, selectedSidebarCTs]);

  console.log('line 122, parameters', parameters);

  const onSidebarContentTypeClick = useCallback(
    (ct: string) => {
      onCTSelect(selectedSidebarCTs, setSelectedSidebarCTs, ct);
    },
    [selectedSidebarCTs, setSelectedSidebarCTs]
  );

  useEffect(() => {
    // `onConfigure` allows to configure a callback to be
    // invoked when a user attempts to install the app or update
    // its configuration.
    sdk.app.onConfigure(() => onConfigure());
  }, [sdk, onConfigure]);

  useEffect(() => {
    (async () => {
      // Get current parameters of the app.
      // If the app is not installed yet, `parameters` will be `null`.
      const currentParameters: AppInstallationParameters | null =
        await sdk.app.getParameters();

      if (currentParameters) {
        setParameters(currentParameters);
      }

      // Once preparation has finished, call `setReady` to hide
      // the loading screen and present the app to a user.
      sdk.app.setReady();
    })();
  }, [sdk]);

  useEffect(() => {
    (async () => {
      const cts = await cma.contentType.getMany({
        spaceId: sdk.ids.space,
        environmentId: sdk.ids.environment,
      });
      setContentTypes(cts.items || []);
    })();
  }, [cma, sdk]);

  // Get all editor interfaces to set initial list of content types
  // with app already assigned to it
  useEffect(() => {
    (async () => {
      const assignedCTs = await getInitialSidebarContentTypes(cma, sdk);
      setSelectedSidebarCTs(assignedCTs);
    })();
  }, [cma, sdk, setSelectedSidebarCTs]);

  return (
    <>
      <div className={styles.background} />
      <div className={styles.body}>
        <Flex
          flexDirection="column"
          className={css({ margin: '4rem', maxWidth: '800px' })}
        >
          <Form>
            <Heading>Editor assignment example</Heading>
            Assign to Content Type Sidebar
            {contentTypes.map((ct) => (
              <Checkbox
                isChecked={selectedSidebarCTs.includes(ct.sys.id)}
                onChange={() => {
                  onSidebarContentTypeClick(ct.sys.id);
                }}
                key={ct.sys.id}
                className={css({
                  margin: tokens.spacingM,
                })}
              >
                {ct.name}
              </Checkbox>
            ))}
          </Form>
        </Flex>
      </div>
    </>
  );
};

export default ConfigScreen;
