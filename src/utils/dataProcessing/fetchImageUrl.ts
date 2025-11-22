export const fetchImageUrl = async (imageId: string): Promise<string | null> => {
  let imgUrl = null;
  try {
    const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
    const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

    const res = await fetch(
      `https://cdn.contentful.com/spaces/${SPACE_ID}/assets/${imageId}?access_token=${ACCESS_TOKEN}`
    );
    const data = await res.json();
    imgUrl = data?.fields?.file?.url ? `https:${data.fields.file.url}` : null;
  } catch (err) {
    console.error('Error fetching Contentful image:', (err instanceof Error ? err.message : String(err)));
  }

  return imgUrl;
};
