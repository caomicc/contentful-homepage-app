import React from "react";
import { Box, Flex, SectionHeading } from "@contentful/f36-components";
import { useAsync } from "react-async-hook";
import { useCMA, useSDK } from "@contentful/react-apps-toolkit";
import { NavList } from "@contentful/f36-navlist";
import { url } from "inspector";

const getGuides = async (
  cma: ReturnType<typeof useCMA>,
  sdk: ReturnType<typeof useSDK>
) => {
  console.log(cma, sdk);
  try {
    const [guides] = sdk.parameters.installation.inputList;
    console.log(guides);
    return {
      items: guides,
    };
  } catch (e) {
    console.log(e);
  }
};

const Guides = () => {
  const cma = useCMA();
  const sdk = useSDK();

  console.log("cma", cma);
  console.log("sdk", sdk);

  console.log("sdk params", sdk.parameters.installation);

  const { result, loading } = useAsync(getGuides, [cma, sdk]);

  // const items = sdk.parameters.installation.inputList?.map(
  //   ([key, item]: [string, any]) => <div key={key}>{item}</div>
  // );

  return (
    <Box>
      <SectionHeading>Guides:</SectionHeading>
      {loading ? (
        <Flex marginTop="spacingXl">Loading...</Flex>
      ) : (
        <NavList aria-label="Content Type Sidebar">
          {/* <>{console.log(sdk.parameters.installation.inputList)}</> */}
          {/* {items} */}
        </NavList>
      )}
    </Box>
  );
};

export default Guides;
