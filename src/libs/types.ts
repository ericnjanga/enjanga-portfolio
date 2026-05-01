export type DynamicPageClient = {
  params: {
    contentId: string;
  };
}

export type DynamicPageServer = {
  params: Promise<{ contentId: string }>
};
export type DynamicPageServerSlug = {
  params: Promise<{ slug: string }>;
};