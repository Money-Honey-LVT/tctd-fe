import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import AppRoutes from './pages/routers';
import customTheme from './theme';

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <CookiesProvider>
          <MantineProvider theme={customTheme}>
            <ModalsProvider>
              <Notifications position="top-right" />
              <AppRoutes />
            </ModalsProvider>
          </MantineProvider>
        </CookiesProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
