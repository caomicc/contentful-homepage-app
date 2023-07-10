import React from 'react';
import { Flex } from '@contentful/f36-components';
import Stats from '../components/stats/Stats';
import CollectionContainer from '../components/collection/CollectionContainer';
import { UserData } from '../components/user/UserData';
import CommentsContainer from '../components/comments/CommentsContainer';
import QuickLinks from '../components/quicklinks/QuickLinks';

export const Home = () => {
  return (
    <Flex gap={'spacingXl'} padding={'spacingXl'} fullWidth>
      <Flex
        style={{
          maxWidth: '300px',
        }}
        flexDirection="column"
        gap="spacingXl"
        fullWidth
      >
        <UserData />
        <QuickLinks />
        <Stats />
      </Flex>
      <Flex fullWidth gap="spacingXl">
        <CollectionContainer />
        <CommentsContainer />
      </Flex>
    </Flex>
  );
};
export default Home;
