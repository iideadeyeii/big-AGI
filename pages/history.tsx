import * as React from 'react';
import { AppHistory } from '../src/apps/history/AppHistory';
import { withNextJSPerPageLayout } from '~/common/layout/withLayout';

export default withNextJSPerPageLayout({ type: 'optima' }, () => <AppHistory />);
