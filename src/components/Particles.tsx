import { AppContext } from 'App/AppContext';
import { options } from 'appearance';
import { useContext } from 'react';
import ReactParticles from 'react-tsparticles';
import styled from 'styled-components';
import { Theme } from 'types';

const P = {
  Container: styled.div<{ $theme: Theme }>`
    transition: background-color 0.5s linear;
    position: absolute;
    background-color: ${({ $theme }) => $theme.background};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    z-index: 0;
  `,
};

export const Particles = () => {
  const { theme } = useContext(AppContext);

  return (
    <P.Container $theme={theme} data-v2="particles">
      <ReactParticles height="100vh" options={options} width="100vw" />
    </P.Container>
  );
};
