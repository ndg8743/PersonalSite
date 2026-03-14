// TypeScript interfaces for themes - defines the color properties each theme
// must provide (background, text colors, shadow) and the Themes record type.
export interface Theme {
  background: string;
  key: string;
  primaryTextColor: string;
  secondaryTextColor: string;
  shadowColor: string;
  tertiaryTextColor: string;
}

export type Themes = Record<string, Theme>;
