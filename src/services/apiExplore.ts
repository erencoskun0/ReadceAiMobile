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
