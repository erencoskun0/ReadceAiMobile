import { GetTextMeanByTextType } from '../types/apiWordType';
import customRequest from '../utils/customRequest';

export const GetTextMeanByText = async (word: string): Promise<GetTextMeanByTextType> => {
  try {
    const res = await customRequest.get(
      `/api/Word/GetWordMeaningByText?Word=${word}&NativeLangId=BAF9C8D5-7C65-4BEF-B444-75691C41973C`
    );
 
    return res.data;
  } catch (err) {
    throw new Error(err as string);
  }
};
