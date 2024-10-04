import React from 'react';
import { Box, MenuDivider } from '@contentful/f36-components';
import { Layout } from '@contentful/f36-layout';

import Stats from '../components/stats/Stats';
import { UserData } from '../components/user/UserData';
import RecentPostContainer from '../components/recentposts/RecentPostContainer';
import Guides from '../components/guides/Guides';
import QuickLinks from '../components/quicklinks/QuickLinks';
import UserPostContainer from '../components/currentuserposts/UserPostContainer';

export const Home = () => {
  return (
    <Layout
      style={{
        maxWidth:'1920px',
        margin: '0 auto',
        boxShadow: 'rgba(25, 37, 50, 0.1) 0px 6px 16px -2px, rgba(25, 37, 50, 0.15) 0px 3px 6px -3px',
        borderRadius: "10px 10px 0px 0px",
        width: "calc(100% - 2rem)",
        background: 'rgb(255, 255, 255)',
        minHeight: 'calc(100vh - 0px)',
      }}
      leftSidebar={
        <Box style={{
          maxWidth: '280px',
          padding: '1.5rem 0.25rem 0px',
          borderRight: '1px solid rgb(231, 235, 238)'
        }}>
          <UserData />
          <MenuDivider />
          <QuickLinks />
          <MenuDivider />
          <Stats />
          {/* <Guides /> */}
        </Box>
      }
    >
      <Layout.Body>
        <Box style={{
          padding: '0.75rem 1.5rem 0.75rem'
        }}>
          <UserPostContainer />
          <RecentPostContainer />
        </Box>
      </Layout.Body>
    </Layout>
  );
};
export default Home;
