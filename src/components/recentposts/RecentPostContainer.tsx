import React, { useCallback } from 'react';
import { Box, Flex, Heading, SectionHeading } from '@contentful/f36-components';
import { useAsync } from 'react-async-hook';
import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import RecentPostList from './RecentPostList';

const CollectionContainer = () => {
  const cma = useCMA();
  const sdk = useSDK();

  const getStats = useCallback(async () => {
    const [contentTypes, entries, tags] = await Promise.all([
      cma.contentType.getMany({}),
      cma.entry.getMany({
        query: {
          limit: 5,
        },
      }),
      cma.tag.getMany({}),
    ]);

    return {
      contentTypes: { num: contentTypes.total, text: 'Content Types' },
      entries: { num: entries, text: 'Entries' },
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
      <Heading marginTop='spacingM'>Recently edited entries</Heading>

      {loading ? (
        <Flex marginTop="spacingXl">
          <RecentPostList
            // contentTypes={contentTypes}
            entries={[]}
            onClickItem={(entryId: string) => sdk.navigator.openEntry(entryId)}
          />
        </Flex>
      ) : (
        <Flex
          style={{
            width: '100%',
          }}
        >
          {result && (
            <RecentPostList
              // contentTypes={contentTypes}
              entries={result.entries.num.items}
              onClickItem={(entryId: string) =>
                sdk.navigator.openEntry(entryId)
              }
            />
          )}
        </Flex>
      )}
    </Box>
  );
};

export default CollectionContainer;
