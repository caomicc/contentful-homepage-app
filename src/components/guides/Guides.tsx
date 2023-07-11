import React from 'react';
import { Box, Flex, SectionHeading } from '@contentful/f36-components';
import { useAsync } from 'react-async-hook';
import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import { NavList } from '@contentful/f36-navlist';

const getGuides = async (cma: ReturnType<typeof useCMA>) => {
  try {
    const [contentTypes, entries, assets, locales, tags, users] =
      await Promise.all([
        cma.contentType.getMany({}),
        cma.entry.getMany({}),
        cma.asset.getMany({}),
        cma.locale.getMany({}),
        cma.tag.getMany({}),
        cma.user.getManyForSpace({}),
      ]);

    return {
      contentTypes: { items: contentTypes.items, text: 'Content Types' },
      entries: { num: entries.total, text: 'Entries' },
      assets: { num: assets.total, text: 'Assets' },
      locales: { num: locales.total, text: 'Locales' },
      tags: { num: tags.total, text: 'Tags' },
      users: { num: users.total, text: 'Users' },
    };
  } catch (e) {
    console.log(e);
  }
};

const Guides = () => {
  const cma = useCMA();
  const sdk = useSDK();

  console.log('cma', cma);
  console.log('sdk', sdk);

  console.log('sdk params', sdk.parameters.installation);

  const { result, loading } = useAsync(getGuides, [cma]);

  return (
    <Box>
      <SectionHeading>Guides:</SectionHeading>
      {loading ? (
        <Flex marginTop="spacingXl">{/* <LoadingStats /> */}</Flex>
      ) : (
        <NavList aria-label="Content Type Sidebar">
          {result &&
            Object.entries(result.contentTypes.items)
              .filter(([key, value]) =>
                // value.sys.id === 'blogPost' ||
                // value.sys.id === 'page' ||
                // value.sys.id === 'caseStudy' ||
                // value.sys.id === 'document' ||
                // value.sys.id === 'event' ||
                // value.sys.id === 'newsArticle' ||
                // value.sys.id === 'webinar' ||
                sdk.parameters.installation.selectedSidebarCTs.includes(
                  value.sys.id
                )
              )
              .map(([key, value]: [string, any]) => (
                <NavList.Item
                  as={'button'}
                  style={{
                    justifyContent: 'flex-start',
                    textDecoration: 'none',
                  }}
                  onClick={() => {
                    sdk.navigator.openNewEntry(value.sys.id);
                  }}
                  key={key}
                >
                  ➕ Create a new {value.name}
                </NavList.Item>
              ))}
        </NavList>
      )}
    </Box>
  );
};

export default Guides;
