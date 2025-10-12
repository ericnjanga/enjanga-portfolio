import { sortByOrderProp } from '@utils/helpers'; 
import type { 
  DataFor, dataFor1, dataFor2,
  CDP_context1,
  CDP_context2
} from "../types";




// import { CQ_quote_propsType } from 'enjanga-components-library';
function getFormatedDataForContext(data: any[], dataFor: dataFor1): CDP_context1;
function getFormatedDataForContext(data: any[], dataFor: dataFor2): CDP_context2;


function getFormatedDataForContext(data: any[], dataFor: dataFor1 | dataFor2): CDP_context1 | CDP_context2 { 
  let contextValue;   

  switch (dataFor) {
    case 'BannerHomePage Entry':
    case 'BannerBlogPage Entry':
    case 'FooterCopyright Entry':
    case 'CaseStudy Entry': 
      const value = data?.shift();
      contextValue = {
        item: {
          title: value?.title,
          description: value?.description,
        },
        __isNormalized: true
      } as CDP_context1;
    break;



    case 'scopeOfExp Parent Entry Collection':
      contextValue = {
        items: data,
        __isNormalized: true
      } as CDP_context2;
      // const value1 = data?.shift();

    console.log('++++++++>>>>>>>>>>>>+++++++++++++++++');
    console.log('????? data = ', data );
    // console.log('????? contextValue = ', contextValue, value);
    console.log('++++++++>>>>>>>>>>>>+++++++++++++++++');
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
