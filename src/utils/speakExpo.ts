import * as Speech from 'expo-speech';
export const speak = (text: string) => {
  Speech.speak(text, {
    language: 'en-UK',
    pitch: 1.3,
    rate: 1.0,
  });
};
