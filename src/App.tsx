import React from 'react';
import Home from './locations/Home';
import { useSDK } from '@contentful/react-apps-toolkit';
import { locations } from '@contentful/app-sdk';
import { QueryClient, QueryClientProvider } from 'react-query';
import ConfigScreen from './locations/ConfigScreen';

const queryClient = new QueryClient();

const App = () => {
  const sdk = useSDK();

  if (sdk.location.is(locations.LOCATION_HOME)) {
    return (
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );
  }
  if (sdk.location.is(locations.LOCATION_APP_CONFIG)) {
    return (
      <QueryClientProvider client={queryClient}>
        <ConfigScreen />
      </QueryClientProvider>
    );
  }

  return null;
};

export default App;
