export type DynamicPageClient = {
  params: {
    contentId: string;
  };
}

export type DynamicPageServer = {
  params: Promise<{ contentId: string }>
};