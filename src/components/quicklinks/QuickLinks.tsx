import {
  Box,
  Flex,
  MenuDivider,
  SectionHeading,
  TextLink,
} from '@contentful/f36-components';
import { useAsync } from 'react-async-hook';
import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import { NavList } from '@contentful/f36-navlist';
import { LoadingStats } from '../stats/LoadingStats';

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
  const sdk = useSDK();

  console.log(
    'sdk params',
    sdk.parameters.installation,
    sdk.space.getContentType('blogPost')
  );

  const { result, loading } = useAsync(getQuickLinks, [sdk.cma]);

  const quickLinks = sdk.parameters.installation.selectedSidebarCTs;

  console.log('quickLinks', quickLinks)
  console.log('result', )

  return (
<>
      {loading ? (
        <Flex marginTop="spacingXl"><LoadingStats /></Flex>
      ) : (
        <>
        <Box style={{
          padding: '0.5rem 0.75rem',
        }}>
        <SectionHeading style={{
          padding: '0.25rem 1rem 0.25rem .5rem',
          marginBottom: '0.25rem',
        }}>Our Site</SectionHeading>
        <NavList aria-label="Content Type Sidebar">
          <NavList.Item
            as={TextLink}
            target="_blank"
            href="https://workhuman-next.netlify.app"
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
            href="https://workhuman-next.netlify.app/blog"
            style={{
              justifyContent: 'flex-start',
              textDecoration: 'none',
            }}
          >
            📚 Visit our Blog
          </NavList.Item>
          </NavList>
        </Box>
        <MenuDivider/>
        <Box style={{
          padding: '0.5rem 0.75rem',
        }}>
        <SectionHeading style={{
          padding: '0.25rem 1rem 0.25rem .5rem',
          marginBottom: '0.25rem',
        }}>Quick Links</SectionHeading>
        <NavList aria-label="Content Type Sidebar">
          {quickLinks.map((ct, index) => {
            return (
              <NavList.Item
                as={TextLink}
                target="_blank"
                key={ct}
                style={{
                  justifyContent: 'flex-start',
                  textDecoration: 'none',
                }}
                onClick={() => {
                  // @ts-ignore
                  sdk.navigator.openNewEntry({
                    contentTypeId: ct,
                  });
                }}
              >
                Create New {ct}
              </NavList.Item>
            )})
          }

        </NavList>
      </Box>
    </>
  )}
</>
  );
}

export default QuickLinks;
