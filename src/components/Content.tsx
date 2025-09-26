import { AppContext } from 'App/AppContext';
import { useContext } from 'react';
import styled, { css } from 'styled-components';
import { Theme } from 'types';

const sharedStyles = css`
  transition: color 0.5s linear;
  font-weight: normal;
  position: relative;
  z-index: 1;
`;

const C = {
  Name: styled.h1<{ $theme: Theme }>`
    ${sharedStyles};
    font-size: 6rem;
    margin: 0;
    color: ${({ $theme }) => $theme.primaryTextColor};
    @media only screen and (max-device-width: 820px) and (-webkit-min-device-pixel-ratio: 2) {
      font-size: 4.5rem;
    }
  `,
  Title: styled.h2<{ $theme: Theme }>`
    ${sharedStyles};
    font-size: 3.5rem;
    margin: 4rem 0;
    color: ${({ $theme }) => $theme.secondaryTextColor};
    @media only screen and (max-device-width: 820px) and (-webkit-min-device-pixel-ratio: 2) {
      font-size: 2.5rem;
    }
  `,
};

export const Content = () => {
  const { config, theme } = useContext(AppContext);

  return (
    <>
      <C.Name $theme={theme} data-v2="name">
        {config.name.display}
      </C.Name>
      <C.Title $theme={theme} data-v2="title">
        {config.title.display}
      </C.Title>
    </>
  );
};
