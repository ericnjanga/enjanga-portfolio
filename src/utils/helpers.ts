import { InformationBlock } from '@/libs/contentful/types';

// Sort items by order field before rendering
export const sortByOrderProp = (items?: InformationBlock[]) =>
  items?.sort((a, b) => a.order - b.order);
