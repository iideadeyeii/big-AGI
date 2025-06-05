import * as React from 'react';

import { AppLanding } from '../src/apps/landing/AppLanding';

import { withNextJSPerPageLayout } from '~/common/layout/withLayout';


export default withNextJSPerPageLayout({ type: 'optima' }, () => {

  // Landing page with quick links to apps

  return <AppLanding />;
});
