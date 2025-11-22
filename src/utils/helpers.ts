import { ContentModel2 } from '@utils/dataProcessing/types';

// Sort items by order field before rendering
export const sortByOrderProp = (items: ContentModel2[]) =>
  items.sort((a, b) => (a.order && b.order) ? (a.order - b.order) : 0);
