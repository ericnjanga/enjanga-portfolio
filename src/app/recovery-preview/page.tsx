'use client';

import RecoveryScreen from '@/components/RecoveryScreen/RecoveryScreen';

export default function RecoveryPreview() {
  return <RecoveryScreen  retry={() => window.location.reload()} />;
}