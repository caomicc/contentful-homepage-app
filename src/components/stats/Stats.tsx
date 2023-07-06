import React, { useCallback } from 'react';
import { Box, Flex, Grid, SectionHeading } from '@contentful/f36-components';
import { useAsync } from 'react-async-hook';
import { useCMA } from '@contentful/react-apps-toolkit';
import { StatCard } from './StatCard';
import { LoadingStats } from './LoadingStats';

const Stats = () => {
  const cma = useCMA();
  const getStats = useCallback(async () => {
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
      contentTypes: { num: contentTypes.total, text: 'Content Types' },
      entries: { num: entries.total, text: 'Entries' },
      assets: { num: assets.total, text: 'Assets' },
      locales: { num: locales.total, text: 'Locales' },
      tags: { num: tags.total, text: 'Tags' },
      users: { num: users.total, text: 'Users' },
    };
  }, [cma]);

  const { result: statResult, loading: statLoading } = useAsync(getStats, []);
  return (
    <Box>
      <SectionHeading>Current space summary:</SectionHeading>
      {statLoading ? (
        <Flex marginTop="spacingXl">
          <LoadingStats />
        </Flex>
      ) : (
        <Grid
          // marginTop="spacingXl"
          columns="1fr 1fr"
          rowGap="spacingM"
          columnGap="spacingM"
          style={{
            width: '100%',
          }}
        >
          {statResult &&
            Object.entries(statResult).map(([key, value]) => (
              <Grid.Item key={key}>
                <StatCard count={value.num} title={value.text} />
              </Grid.Item>
            ))}
        </Grid>
      )}
    </Box>
  );
};

export default Stats;
