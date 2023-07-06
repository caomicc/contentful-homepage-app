import React from 'react';
import { Flex } from '@contentful/f36-components';
import Stats from '../components/stats/Stats';
import dayjs from 'dayjs';
import greetPlugin from 'dayjs-greet';
import CollectionContainer from '../components/collection/CollectionContainer';
import { KnownAppSDK } from '@contentful/app-sdk';
import { UserData } from '../components/user/UserData';

type HomeProps = {
  sdk: KnownAppSDK;
  cma: any;
};

export const Home = ({ sdk, cma }: HomeProps) => {
  dayjs.extend(greetPlugin);

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
