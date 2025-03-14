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

export const AddWordUserProgress = async (
  userId: string,
  wordId: string,
  wordMeaningId: string,
  nativeLanguage: string,
  learningLanguage: string
) => {
  try {
    const res = await customRequest.post('/api/Word/AddWordUserProgress', {
      wordId: wordId,
      userId: userId,
      wordMeaningId: wordMeaningId,
      nativeLanguage: nativeLanguage,
      learningLanguage: learningLanguage,
    });
    return res.data;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const GetAllWordUserProgress = async (userId: string): Promise<GetTextMeanByTextType> => {
  try {
    const res = await customRequest.get(
      `/api/Word/GetAllWordUserProgress?userId=${userId}&LearningLangId=E831E529-7ACF-433A-BD4F-19707BDAE98C`
    );

    return res.data;
  } catch (err) {
    throw new Error(err as string);
  }
};
