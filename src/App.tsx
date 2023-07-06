import React from 'react';
import Home from './locations/Home';
import { useSDK } from '@contentful/react-apps-toolkit';
import { locations } from '@contentful/app-sdk';
import { QueryClient, QueryClientProvider } from 'react-query'
import { createClient } from 'contentful-management'

const queryClient = new QueryClient()

const App = () => {
  const sdk = useSDK();

  const cma = createClient(
    { apiAdapter: sdk.cmaAdapter },
  )

  if (sdk.location.is(locations.LOCATION_HOME)) {
    return(
      <QueryClientProvider client={queryClient}>
        <Home sdk={sdk} cma={cma} />
      </QueryClientProvider>
    )
  }

  return null;
};

export default App;
