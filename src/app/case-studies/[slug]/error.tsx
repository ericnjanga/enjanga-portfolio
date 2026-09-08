'use client';

import RecoveryScreen from '@/components/RecoveryScreen';

export default function CaseStudyError() {
  return <RecoveryScreen caseStudy retry={() => window.location.reload()} />;
}
