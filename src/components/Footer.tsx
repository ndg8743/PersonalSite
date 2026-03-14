// Footer — shows "Designed and built by [name]" with a link to the source repo.
// On mobile, the source link is hidden to save space.
import { AppContext } from 'App/AppContext';
import { useContext } from 'react';
import styled from 'styled-components';
import { Theme } from 'types';

const F = {
  Container: styled.footer<{ $isMobile: boolean }>`
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 0.75rem;
    padding-right: ${({ $isMobile }) => ($isMobile ? '1.5rem' : '1rem')};
    z-index: 1;
  `,
  Link: styled.a<{ $theme: Theme }>`
    transition: color 0.5s linear;
    color: ${({ $theme }) => $theme.secondaryTextColor};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  `,
  Text: styled.p<{ $theme: Theme }>`
    transition: color 0.5s linear;
    color: ${({ $theme }) => $theme.tertiaryTextColor};
  `,
};

export const Footer = () => {
  const { isMobile, theme } = useContext(AppContext);

  return (
    <F.Container $isMobile={isMobile}>
      <F.Text $theme={theme} data-v2="footer">
        {'Designed and built by '}
        <F.Link
          $theme={theme}
          aria-label="Nathan Gopee's personal website (opens in new window)"
          data-v2="creator"
          href="https://www.gopee.dev/"
          rel="noopener noreferrer"
          target="_blank"
        >
          {'Nathan Gopee'}
          {/* CHANGE THIS: Your name and URL */}
        </F.Link>
        {!isMobile && (
          <>
            {' | '}
            <F.Link
              $theme={theme}
              aria-label="Source code for this website (opens in new window)"
              data-v2="source"
              href="https://github.com/ndg8743/PersonalSite"
              rel="noopener noreferrer"
              target="_blank"
            >
              {'Source'}
            </F.Link>
          </>
        )}
      </F.Text>
    </F.Container>
  );
};
