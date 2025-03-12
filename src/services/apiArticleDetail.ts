import { articlePuanInfoType } from '../types/apiArticleDetailType';
import customRequest from '../utils/customRequest';

export const GetArticlePuanInfo = async (
  userId: string | null,
  articleId: string
): Promise<articlePuanInfoType> => {
  try {
    const res = await customRequest.get(
      `/api/Article/GetArticlePuanInfo?UserId=${userId}&ArticleId=${articleId}`
    );

    return res.data;
  } catch (err) {
    throw new Error(err as string);
  }
};
export const AddRemoveArticlePuan = async (userId: string, articleId: string) => {
 
  try {
    const res = await customRequest.post('/api/Article/AddRemoveArticlePuan', {
      userId: userId,
      articleId: articleId,
    });
    return res.data;
  } catch (err) {
    throw new Error(err as string);
  }
};
