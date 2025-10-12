import { sortByOrderProp } from '@utils/helpers'; 
import type { 
  dataFor1, dataFor2, dataFor3,
  CDP_context1,
  CDP_context2,
  CDP_context3
} from "../types";




// import { CQ_quote_propsType } from 'enjanga-components-library';
function getFormatedDataForContext(data: any[], dataFor: dataFor1): CDP_context1;
function getFormatedDataForContext(data: any[], dataFor: dataFor2): CDP_context2;
function getFormatedDataForContext(data: any[], dataFor: dataFor3): CDP_context3;


function getFormatedDataForContext(data: any[], dataFor: dataFor1 | dataFor2 | dataFor3): CDP_context1 | CDP_context2 | CDP_context3 { 
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

    case 'Quotes Entry Collection':
      contextValue = {
        items: data,
        __isNormalized: true
      } as CDP_context3;
    break;

    case 'scopeOfExp Parent Entry Collection':
    case 'scopeOfExp Entry Collection':
    case 'AboutInfo Entry Collection':
      contextValue = {
        items: sortByOrderProp(data),
        __isNormalized: true
      } as CDP_context2;

    console.log('++++++++>>>>>>>>>>>>+++++++++++++++++');
    console.log('????? data = ', data );
    // console.log('????? contextValue = ', contextValue, value);
    console.log('++++++++>>>>>>>>>>>>+++++++++++++++++');
    break;
  }

  return contextValue;
}

export default getFormatedDataForContext;
