import { Themes } from 'types';

// Enhance contrast by using white and black text with reduced opacity over
// colored backgrounds instead of gray.
// https://m2.material.io/design/color/text-legibility.html#text-backgrounds
export const themes: Themes = {
  dark: {
    background: '#000',
    key: 'dark',
    primaryTextColor: '#fff',
    secondaryTextColor: '#ffffffdd',
    shadowColor: '#0000007f',
    tertiaryTextColor: '#ffffff99',
  },
  light: {
    background: '#fff',
    key: 'light',
    primaryTextColor: '#000',
    secondaryTextColor: '#000000dd',
    shadowColor: '#ffffff7f',
    tertiaryTextColor: '#00000099',
  },
};
