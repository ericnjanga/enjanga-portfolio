import { sortByOrderProp } from '@utils/helpers';
import type {
  DataFor1,
  DataFor2,
  DataFor3,
  DataFor4,
  DataFor5,
  ContextType1,
  ContextType2,
  ContextType3,
  ContextType4,
  ContextType5,
  ContentModel1,
  ContentModel2,
  ContentModel3,
  ContentModel4,
} from '../types';

function getFormatedDataForContext(
  data: any[],
  dataFor: DataFor1
): ContextType1;
function getFormatedDataForContext(
  data: any[],
  dataFor: DataFor2
): ContextType2;
function getFormatedDataForContext(
  data: any[],
  dataFor: DataFor3
): ContextType3;
function getFormatedDataForContext(
  data: any[],
  dataFor: DataFor4
): ContextType4;
function getFormatedDataForContext(
  data: any[],
  dataFor: DataFor5
): ContextType5;

function getFormatedDataForContext(
  data: any[],
  dataFor: DataFor1 | DataFor2 | DataFor3 | DataFor4 | DataFor5
): ContextType1 | ContextType2 | ContextType3 | ContextType4 | ContextType5 {
  let contextValue;

  switch (dataFor) {
    case 'BannerHomePage Entry':
    case 'BannerBlogPage Entry':
    case 'FooterCopyright Entry':
    case 'CaseStudy Entry':
    case 'BlogPost Entry':
      const value = data?.shift();
      contextValue = {
        item: {
          title: value?.title,
          description: value?.description,
        } as ContentModel1,
        __isNormalized: true,
      } as ContextType1;
      break;

    case 'scopeOfExp Parent Entry Collection':
    case 'scopeOfExp Entry Collection':
    case 'AboutInfo Entry Collection':
      contextValue = {
        items: sortByOrderProp(data) as ContentModel2[],
        __isNormalized: true,
      } as ContextType2;
      break;

    case 'Quotes Entry Collection':
      contextValue = {
        items: data as ContentModel1[],
        __isNormalized: true,
      } as ContextType3;
      break;

    case 'CaseStudy Entry Collection':
    case 'BlogPost Entry Collection':
      contextValue = {
        items: data as ContentModel3[],
        __isNormalized: true,
      } as ContextType4;
      break;

    case 'FooterLinks Entry Collection':
      contextValue = {
        items: sortByOrderProp(data) as ContentModel4[],
        __isNormalized: true,
      } as ContextType5;
      break;
  }
  return contextValue;
}

export default getFormatedDataForContext;
