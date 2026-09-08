'use client';

import RecoveryScreen from '@/components/RecoveryScreen';
import 'enjanga-core-setup/typography.css';
import 'enjanga-core-setup/design-tokens.css';
import 'enjanga-components-library/button.css';

export default function GlobalError() {
  // Root-layout failures cannot rely on its providers, styles, or CMS navigation.
  return <html lang="en"><body style={{ margin: 0, background: '#edf5ff', color: '#314255' }}>
    <RecoveryScreen retry={() => window.location.reload()} />
  </body></html>;
}
