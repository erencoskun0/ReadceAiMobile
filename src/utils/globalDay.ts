import dayjs from 'dayjs';
import 'dayjs/locale/tr'; // Türkçe dil desteğini ekle
import advancedFormat from 'dayjs/plugin/advancedFormat'; // gelişmiş formatlama için
import relativeTime from 'dayjs/plugin/relativeTime'; // göreceli zaman için

dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

dayjs.locale('tr');
export const formatLongDate = (date: dayjs.ConfigType): string => {
  return dayjs(date).format('D MMMM YYYY');
};
export const formatShortDate = (date: dayjs.ConfigType): string => {
  return dayjs(date).format('DD/MM/YYYY');
};

export const getRelativeTime = (date: dayjs.ConfigType): string => {
  return dayjs(date).fromNow();
};

export const formatTime = (date: dayjs.ConfigType): string => {
  return dayjs(date).format('HH:mm:ss');
};

export const formatCustom = (date: dayjs.ConfigType, formatString: string): string => {
  return dayjs(date).format(formatString);
};
export const getDaysBetween = (startDate: dayjs.ConfigType, endDate: dayjs.ConfigType): number => {
  return dayjs(endDate).diff(dayjs(startDate), 'day');
};
