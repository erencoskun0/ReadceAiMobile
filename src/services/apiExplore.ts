import { GetAllArticlesIsPublicType } from '../types/apiExploreType';
import customRequest from '../utils/customRequest';

export const GetAllArticlesIsPublic = async (): Promise<GetAllArticlesIsPublicType[]> => {
  try {
    const res = await customRequest.get(`/api/Article/GetAllArticlesIsPublic`);

    return res.data;
  } catch (err) {
    throw new Error(err as string);
  }
};
export const GetAllArticlesByLangLevel = async (
  langLevelId: string,
  langId: string
): Promise<GetAllArticlesIsPublicType[]> => {
  try {
    const res = await customRequest.get(
      `/api/Article/GetArticlesByLangLevel?LangLevelId=${langLevelId}&LangId=${langId}`
    );

    return res.data;
  } catch (err) {
    throw new Error(err as string);
  }
};
export const GetAllArticlesByLangId = async (
  langId: string
): Promise<GetAllArticlesIsPublicType[]> => {
  try {
    const res = await customRequest.get(`/api/Article/GetArticlesByLanguage?LangId=${langId}`);

    return res.data;
  } catch (err) {
    throw new Error(err as string);
  }
};
export const GetAllArticlesByTypeId = async (
  typeId: string
): Promise<GetAllArticlesIsPublicType[]> => {
  try {
    const res = await customRequest.get(`/api/Article/GetArticlesByType?TypeId=${typeId}`);

    return res.data;
  } catch (err) {
    throw new Error(err as string);
  }
};
export const GetAllArticlesByCategoryId = async (
  categoryId: string
): Promise<GetAllArticlesIsPublicType[]> => {
  try {
    const res = await customRequest.get(`/api/Article/GetArticlesByCategory?CategoryId=${categoryId}`);

    return res.data;
  } catch (err) {
    throw new Error(err as string);
  }
};
