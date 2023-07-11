import React, { useCallback } from 'react';
import { Box, Flex, SectionHeading } from '@contentful/f36-components';
import { useAsync } from 'react-async-hook';
import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import UserPostList from './UserPostList';

const UserPostContainer = () => {
  const cma = useCMA();
  const sdk = useSDK();
  const getStats = useCallback(async () => {
    const [contentTypes, entries, assets, locales, tags] = await Promise.all([
      cma.contentType.getMany({}),
      cma.entry.getMany({
        query: {
          'sys.updatedBy.sys.id': sdk.user.sys.id,
          limit: 5,
        },
      }),
      cma.asset.getMany({}),
      cma.locale.getMany({}),
      cma.tag.getMany({}),
    ]);

    return {
      // contentTypes: { num: contentTypes.total, text: 'Content Types' },
      entries: { num: entries, text: 'Entries' },
      // assets: { num: assets.total, text: 'Assets' },
      // locales: { num: locales.total, text: 'Locales' },
      tags: { num: tags.total, text: 'Tags' },
    };
  }, [cma]);

  const { result, loading } = useAsync(getStats, []);
  return (
    <Box
      style={{
        width: '100%',
      }}
    >
      <SectionHeading>Your most recently edited entries</SectionHeading>

      {loading ? (
        <Flex marginTop="spacingXl">
          <UserPostList
            // contentTypes={contentTypes}
            entries={[]}
            onClickItem={(entryId) => sdk.navigator.openEntry(entryId)}
          />
        </Flex>
      ) : (
        <Flex
          style={{
            width: '100%',
          }}
        >
          {result && (
            <UserPostList
              // contentTypes={contentTypes}
              entries={result.entries.num.items}
              onClickItem={(entryId) => sdk.navigator.openEntry(entryId)}
            />
          )}
        </Flex>
      )}
    </Box>
  );
};

export default UserPostContainer;
