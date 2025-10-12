import { EntryGroup2_propsType } from '@/libs/contentful/types';

// Sort items by order field before rendering
export const sortByOrderProp = (items: EntryGroup2_propsType[]) =>
  items.sort((a, b) => (a.order && b.order) ? (a.order - b.order) : 0);
