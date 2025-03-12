export type GetAllArticlesIsPublicType = {
  id: string;
  articleTitle: string;
  articleSummary: string;
  articleContent: string;
  articlePuan: number;
  articleImage: string;
  language: {
    langId: string;
    lang: string;
    langName: string;
  };
  langLevel: {
    id: string;
    langLevelName: string;
  };
  articleType: {
    id: string;
    articleTypeName: string;
  };
  categories: {
    id: string;
    name: string;
    image: string;
  };
};
