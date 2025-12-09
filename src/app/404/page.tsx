import { NotFoundPage } from '@/components/NotFoundPage/NotFoundPage';
import { getMetadata } from '@/libs/metadata';


// Todo: 1) Move this constant to contentfulContentIds
// Todo: 2) Ask chatGPT what would be a proper way to organize and rename contentfulContentIds
const NOT_FOUND_PAGE_ID = '5JsVGp57j9wV3jiJw08uEq';

/**
 * Metadata title and description route update
 * @returns 
 */
export async function generateMetadata() {
  const data = await getMetadata(NOT_FOUND_PAGE_ID);
  return {
    title: data.title,
    description: data.description,
  };
}

export default function Page() {
  return <NotFoundPage />;
}
