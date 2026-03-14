// Site configuration — your name, title, and social links. This is the main
// file to edit when personalizing the template. Look for "CHANGE THIS" comments.
import { Email, GitHub, LinkedIn, Resume } from 'icons';
import { Config } from 'types';

import { CONTACT } from '../constants/contact';

export const config: Config = {
  buttons: [
    {
      ariaLabel: 'GitHub profile (opens in new window)',
      display: 'GitHub',
      href: 'https://github.com/ndg8743/', // CHANGE THIS: Your GitHub URL
      icon: <GitHub />,
      name: 'github',
    },
    {
      ariaLabel: 'LinkedIn profile (opens in new window)',
      display: 'LinkedIn',
      href: 'https://linkedin.com/in/nathangopee/', // CHANGE THIS: Your LinkedIn URL
      icon: <LinkedIn />,
      name: 'linked-in',
    },
    {
      ariaLabel: 'Resume (opens in new window)',
      display: 'Resume',
      href: '#',
      icon: <Resume />,
      name: 'resume',
    },
    {
      ariaLabel: 'Email contact (opens in new window)',
      display: 'Email',
      href: `mailto:${CONTACT.EMAIL}`,
      icon: <Email />,
      name: 'email',
    },
  ],
  name: {
    display: 'Nathan Gopee', // CHANGE THIS: Your name
  },
  title: {
    display: 'Software Engineer', // CHANGE THIS: Your title
  },
};
