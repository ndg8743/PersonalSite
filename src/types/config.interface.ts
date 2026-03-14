// TypeScript interfaces for the site config — defines the shape of buttons,
// content (name/title), and the overall Config object used in config.tsx.
import type { JSX } from 'react';

export interface Button extends Content {
  ariaLabel: string;
  href: string;
  icon: JSX.Element;
  name: string;
}

export interface Config {
  buttons: Button[];
  name: Content;
  title: Content;
}

export interface Content {
  display: string;
}
