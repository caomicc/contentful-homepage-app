import React from 'react';
import {
  Box,
  Button,
  Flex,
  SectionHeading,
  TextLink,
} from '@contentful/f36-components';
import { useAsync } from 'react-async-hook';
import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import { NavList } from '@contentful/f36-navlist';
import { ContentTypeProps } from 'contentful-management';

const getQuickLinks = async (cma: ReturnType<typeof useCMA>) => {
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

const QuickLinks = () => {
  const cma = useCMA();
  const sdk = useSDK();

  console.log('cma', cma);
  console.log('sdk', sdk);

  console.log(
    'sdk params',
    sdk.parameters.installation
    // sdk.parameters.invocation,
    // sdk.parameters.instance
  );

  const { result, loading } = useAsync(getQuickLinks, [cma]);

  return (
    <Box>
      <SectionHeading>Quicklinks:</SectionHeading>
      {loading ? (
        <Flex marginTop="spacingXl">{/* <LoadingStats /> */}</Flex>
      ) : (
        <NavList aria-label="Content Type Sidebar">
          <NavList.Item
            as={TextLink}
            target="_blank"
            href="https://workhuman-next.netlify.net"
            style={{
              justifyContent: 'flex-start',
              textDecoration: 'none',
            }}
          >
            🏡 Visit our Homepage
          </NavList.Item>
          <NavList.Item
            as={TextLink}
            target="_blank"
            href="https://workhuman-next.netlify.net/blog"
            style={{
              justifyContent: 'flex-start',
              textDecoration: 'none',
            }}
          >
            📚 Visit our Blog
          </NavList.Item>
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

export default QuickLinks;
