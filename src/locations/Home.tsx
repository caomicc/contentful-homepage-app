import React from 'react';
import { Flex } from '@contentful/f36-components';
import Stats from '../components/stats/Stats';
import CollectionContainer from '../components/collection/CollectionContainer';
import { UserData } from '../components/user/UserData';

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
        <Stats />
      </Flex>
      <Flex fullWidth>
        <CollectionContainer />
      </Flex>
    </Flex>
  );
};
export default Home;
