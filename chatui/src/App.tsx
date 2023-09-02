import React from 'react';
import RotueTable from './config/RotueTable';
import {QueryClientProvider ,QueryClient} from '@tanstack/react-query'

import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {store} from './app/store'
import { Provider } from 'react-redux';
function App() {

  const queryClient = new QueryClient();
  return (
      <div>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <RotueTable />
              <ReactQueryDevtools initialIsOpen/>
            </QueryClientProvider>
        </Provider>
     </div>
  );
}

export default App;
