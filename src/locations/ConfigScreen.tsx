import React, { useCallback, useState, useEffect } from 'react';
import { ConfigAppSDK } from '@contentful/app-sdk';
import {
  Heading,
  Form,
  Flex,
  Checkbox,
  Button,
  Card,
  Paragraph,
  Subheading,
  Stack,
  TextInput,
  FormControl,
} from '@contentful/f36-components';
import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import { ContentTypeProps } from 'contentful-management';
import tokens from '@contentful/f36-tokens';
import GuideEditor from '../components/guides/GuideEditor';

export interface Guide {
  id: string;
  name: string;
  url: string;
}

export interface GuideList {
  id: string;
  name: string;
  guideList: Guide[];
}

export interface AppInstallationParameters {
  guidesList: GuideList[];
  selectedSidebarCTs?: string[];
}

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
  const [inputList, setInputList] = useState<Array<any>>([]);

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

      if (currentParameters?.inputList) {
        setInputList(currentParameters.inputList);
      }

      // Once preparation has finished, call `setReady` to hide
      // the loading screen and present the app to a user.
      sdk.app.setReady();
    })();
  }, [sdk]);

  // handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { name: '', url: '' }]);
  };

  const onConfigure = useCallback(async () => {
    // This method will be called when a user clicks on "Install"
    // or "Save" in the configuration screen.
    // for more details see https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/#register-an-app-configuration-hook

    // const updatedParameters: AppInstallationParameters =

    return {
      parameters: {
        selectedSidebarCTs,
        inputList,
      },
    };
  }, [sdk, selectedSidebarCTs, inputList]);

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
        <Card>
          <Stack flexDirection="column">
            <>
              {console.log(
                'sdk.parameters.installation',
                sdk.parameters.installation
              )}
            </>
            {inputList.map((x, i) => {
              return (
                <Stack fullWidth>
                  <FormControl isRequired>
                    <FormControl.Label>Guide Name</FormControl.Label>
                    <TextInput
                      name="name"
                      placeholder="name"
                      value={x.name}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormControl.Label>Guide URL</FormControl.Label>
                    <TextInput
                      name="url"
                      placeholder="url"
                      value={x.url}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </FormControl>
                  <Flex className="btn-box">
                    {inputList.length !== 0 && (
                      <Button
                        variant="negative"
                        onClick={() => handleRemoveClick(i)}
                      >
                        Remove
                      </Button>
                    )}
                  </Flex>
                </Stack>
              );
            })}
            <Button variant="positive" onClick={handleAddClick}>
              Add
            </Button>
          </Stack>
        </Card>
      </Flex>
    </Flex>
  );
};

export default ConfigScreen;
