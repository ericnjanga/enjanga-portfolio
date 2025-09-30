import { CDP_context_propsType } from "./types";
import { DataFor } from "../contentful-queryConfig";
import { sortByOrderProp } from '@utils/helpers'; 

// import { IB_propsType } from '../../types';
// import { CQ_quote_propsType } from 'enjanga-components-library';

const getFormatedDataForContext = (data: any, dataFor: DataFor): CDP_context_propsType => {

  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log('>>>>> entries = ', data);
  //   return entries.map((entry: { sys: { id: string } }) => ({
  //   contentId: entry.sys.id,
  // }));
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      

  let plainDescription;
  let richDescription;
  let orderedItems; 
  const id = data?.en?.sys?.id ?? '';
  const title = data?.en?.title ?? '';
  const blurb = data?.en?.blurb ?? '';
  const image = data?.en?.image;
  const items = data?.en?.items;

  switch (dataFor) {
    case 'Landing Page Banner':
    case 'Blog Page Banner':
    case 'Footer Copyright':
    case 'Case Study Entry':
    case 'Blog Post Entry':
      if (dataFor==='Blog Post Entry') 
      console.log('....-----data?', data);
      richDescription = data?.en?.description;
      break;

    case 'List of Scope of expertise':
    case 'InfoBlock by parentId':
    case 'Blog Post Collection':
    case 'List of Best Work':
    case 'List of quotes':
    case 'About Info Collection':
    case 'List of Footer Links':
      orderedItems = sortByOrderProp(items);
      break;
  }

  return {
    id,
    title,
    blurb,
    image,
    plainDescription,
    richDescription,
    items,
    orderedItems,
  };
};

export default getFormatedDataForContext;
