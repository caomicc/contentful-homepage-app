import React from 'react';
import { Flex } from '@contentful/f36-components';
import Stats from '../components/stats/Stats';
import { UserData } from '../components/user/UserData';
import QuickLinks from '../components/quicklinks/QuickLinks';
import UserPostContainer from '../components/currentuserposts/UserPostContainer';
import RecentPostContainer from '../components/recentposts/RecentPostContainer';
import Guides from '../components/guides/Guides';

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
        {/* <TaskContainer /> */}
        <QuickLinks />
        <Stats />
      </Flex>
      <Flex flexDirection="column" fullWidth gap="spacingXl">
        <UserPostContainer />
        <RecentPostContainer />
      </Flex>
      <Flex
        style={{
          maxWidth: '300px',
        }}
        flexDirection="column"
        gap="spacingXl"
        fullWidth
      >
        <Guides />
      </Flex>
    </Flex>
  );
};
export default Home;
