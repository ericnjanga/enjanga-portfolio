'use client';

import RecoveryScreen from '@/components/RecoveryScreen/RecoveryScreen';

export default function ErrorPage() {
  // A full request also retries failed Server Components and their cached render errors.
  return <RecoveryScreen retry={() => window.location.reload()} />;
}
