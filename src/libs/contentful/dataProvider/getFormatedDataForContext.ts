import { DataFor, dataFor1 } from "../contentful-queryConfig";
import { sortByOrderProp } from '@utils/helpers'; 
import { 
  EntryGroup1_propsType, 
} from "../types";




// import { CQ_quote_propsType } from 'enjanga-components-library';
function getFormatedDataForContext(data: any[], dataFor: dataFor1): EntryGroup1_propsType;


function getFormatedDataForContext(data: any[], dataFor: dataFor1): EntryGroup1_propsType { 
  let contextValue;   

  switch (dataFor) {
    case 'BannerHomePage Entry':
    case 'BannerBlogPage Entry':
    case 'FooterCopyright Entry':
    case 'CaseStudy Entry': 
      const value = data?.shift();
      contextValue = {
        title: value?.title,
        description: value?.description,
        __isNormalized: true
      } as EntryGroup1_propsType;

    // console.log('???????????????????????');
    // console.log('????? contextValue = ', contextValue, value);
    // console.log('???????????????????????');
    break;
  }

  return contextValue;
  // return {
  //   id,
  //   title,
  //   blurb,
  //   image,
  //   plainDescription,
  //   richDescription,
  //   items,
  //   orderedItems,
  // };

  //   case 'BlogPost Entry':
  //     contextValue = {
  //       sys     : data?.en?.sys?.id ?? '',
  //       title   : data?.en?.title ?? '',
  //       blurb   : data?.en?.blurb ?? '',
  //       richDescription : data?.en?.description
  //     };
  //   break;

    
  //   case 'scopeOfExp Parent Entry Collection':
  //   case 'scopeOfExp Entry Collection':
  //   case 'AboutInfo Entry Collection':
  //   case 'BlogPost Entry Collection':
  //   case 'CaseStudy Entry Collection':
  //   case 'FooterLinks Entry Collection':
  //   case 'Quotes Entry Collection':
  //     contextValue = { 
  //       orderedItems: sortByOrderProp(items)
  //     }
  //   break;
}

export default getFormatedDataForContext;
