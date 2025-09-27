import { IB_propsType } from '@/libs/contentful/types';

// Sort items by order field before rendering
export const sortByOrderProp = (items?: IB_propsType[]) =>
  items?.sort((a, b) => a.order - b.order);
