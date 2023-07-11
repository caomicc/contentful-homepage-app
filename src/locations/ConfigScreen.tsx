import React, { useCallback, useState, useEffect } from 'react';
import { ConfigAppSDK } from '@contentful/app-sdk';
import { Heading, Form, Flex, Checkbox } from '@contentful/f36-components';
import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import { ContentTypeProps } from 'contentful-management';
import tokens from '@contentful/f36-tokens';

export type AppInstallationParameters = {
  selectedSidebarCTs?: AppInstallationParameters | null | string[];
  parameters?: AppInstallationParameters;
};
const onCTSelect = (
  selectedCTs: string[],
  setSelectedCTs: (cts: string[]) => void,
  ct: string
) => {
  selectedCTs.includes(ct)
    ? setSelectedCTs(selectedCTs.filter((item) => item !== ct))
    : setSelectedCTs([...selectedCTs, ct]);
};

const ConfigScreen = () => {
  const [parameters, setParameters] = useState<AppInstallationParameters>({});
  const [contentTypes, setContentTypes] = useState<ContentTypeProps[]>([]);
  const [selectedSidebarCTs, setSelectedSidebarCTs] = useState<string[]>([]);

  const sdk = useSDK<ConfigAppSDK>();
  const cma = useCMA();

  useEffect(() => {
    (async () => {
      // Get current parameters of the app.
      // If the app is not installed yet, `parameters` will be `null`.
      const currentParameters: AppInstallationParameters | null | any =
        await sdk.app.getParameters();

      if (currentParameters?.selectedSidebarCTs) {
        setSelectedSidebarCTs(currentParameters.selectedSidebarCTs);
      }

      if (currentParameters) {
        setParameters(currentParameters);
      }

      // Once preparation has finished, call `setReady` to hide
      // the loading screen and present the app to a user.
      sdk.app.setReady();
    })();
  }, [sdk]);

  const onConfigure = useCallback(async () => {
    // This method will be called when a user clicks on "Install"
    // or "Save" in the configuration screen.
    // for more details see https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/#register-an-app-configuration-hook

    const updatedParameters: AppInstallationParameters = {
      selectedSidebarCTs,
      parameters,
    };

    return {
      parameters: updatedParameters,
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
      const cts = await cma.contentType.getMany({
        spaceId: sdk.ids.space,
        environmentId: sdk.ids.environment,
      });
      setContentTypes(cts.items || []);
    })();
  }, [cma, sdk]);

  return (
    <Flex
      style={{
        margin: '4rem',
      }}
    >
      <Flex
        flexDirection="column"
        gap={tokens.spacingM}
        style={{
          width: '1199px',
          margin: '0 auto',
        }}
      >
        <Heading>Select content types to use for quick links</Heading>
        <Form
          style={{
            columnCount: 4,
          }}
        >
          {contentTypes.map((ct) => (
            <Checkbox
              isChecked={selectedSidebarCTs.includes(ct.sys.id)}
              onChange={() => {
                onSidebarContentTypeClick(ct.sys.id);
              }}
              key={ct.sys.id}
              style={{
                marginBottom: tokens.spacingM,
              }}
            >
              {ct.name}
            </Checkbox>
          ))}
        </Form>
        <Heading>Add Guides</Heading>
      </Flex>
    </Flex>
  );
};

export default ConfigScreen;
