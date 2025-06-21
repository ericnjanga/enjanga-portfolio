'use client';

import { HeaderGlobalAction } from '@carbon/react';
import { Translate, BrightnessContrast, Email } from '@carbon/icons-react';

const ActionItems = () => (
  <>
    <HeaderGlobalAction
      aria-label="Language translation"
      tooltipAlignment="center"
      className="action-icons"
    >
      <Translate size={20} />
    </HeaderGlobalAction>
    <HeaderGlobalAction
      aria-label="Switch to dark mode"
      tooltipAlignment="center"
      className="action-icons"
    >
      <BrightnessContrast size={20} />
    </HeaderGlobalAction>
    <HeaderGlobalAction aria-label="Contact me" tooltipAlignment="end">
      <Email size={20} />
    </HeaderGlobalAction>
  </>
);

export default ActionItems;
