export const getEmbedId = (url: string) => {
  const idPattern = /(?:instagram.com\/(?:p|tv|reel)\/([A-Za-z0-9_-]{11}))/i;
  const matches = idPattern.exec(url);
  return matches && matches[1];
};
