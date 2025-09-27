import { Email, GitHub, LinkedIn, Resume } from 'icons';
import { Config } from 'types';

import { CONTACT } from '../constants/contact';

export const config: Config = {
  buttons: [
    {
      ariaLabel: 'GitHub profile (opens in new window)',
      display: 'GitHub',
      href: 'https://github.com/ndg8743/',
      icon: <GitHub />,
      name: 'github',
    },
    {
      ariaLabel: 'LinkedIn profile (opens in new window)',
      display: 'LinkedIn',
      href: 'https://linkedin.com/in/nathangopee/',
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
    display: 'Nathan Gopee',
  },
  title: {
    display: 'Software Engineer',
  },
};
