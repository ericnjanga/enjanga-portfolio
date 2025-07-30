import { InformationBlock } from '@/libs/CMS-content-types';

// Sort items by order field before rendering
export const sortByOrderProp = (items?: InformationBlock[]) =>
  items?.sort((a, b) => a.order - b.order);
