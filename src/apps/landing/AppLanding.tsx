import * as React from 'react';

import { Box, Button } from '@mui/joy';

import { Brand } from '~/common/app.config';
import { AppSmallContainer } from '../AppSmallContainer';
import { launchAppChat, navigateToNews } from '~/common/app.routes';


export function AppLanding() {
  return (
    <AppSmallContainer
      title={`Welcome to ${Brand.Title.Common}`}
      description='Select one of the tools below to get started.'
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant='solid' onClick={() => launchAppChat()}>
          Open Chat
        </Button>
        <Button variant='soft' onClick={() => navigateToNews()}>
          View News
        </Button>
      </Box>
    </AppSmallContainer>
  );
}
