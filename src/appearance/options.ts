import type { ISourceOptions } from 'tsparticles';

// https://github.com/matteobruni/tsparticles/issues/2771
export const options: ISourceOptions = {
  fpsLimit: 90,
  fullScreen: {
    enable: false,
  },
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onclick: {
        enable: true,
        mode: 'push',
      },
      onhover: {
        enable: true,
        mode: 'repulse',
      },
      resize: true,
    },
    modes: {
      attract: {
        distance: 100,
        duration: 1,
        speed: 5,
      },
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 8,
        size: 40,
      },
      grab: {
        distance: 400,
        links: {
          opacity: 1,
        },
      },
      push: {
        quantity: 3,
      },
      remove: {
        quantity: 2,
      },
      repulse: {
        distance: 100,
        duration: 1,
      },
    },
  },
  key: '3m@62^K^88745%',
  particles: {
    color: {
      value: [
        'ff2600', // Red
        'ff8000', // Orange
        'ffd500', // Yellow
        '22dd22', // Green
        '00bfff', // Blue
        'c912ed', // Violet (Purple)
      ],
    },
    links: {
      blink: false,
      color: '999',
      consent: false,
      distance: 75,
      enable: true,
      opacity: 0.9,
      width: 1,
    },
    move: {
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
      bounce: false,
      direction: 'none',
      enable: true,
      outMode: 'bounce',
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        area: 800,
        enable: true,
      },
      value: 100,
    },
    opacity: {
      anim: {
        enable: false,
        minimumValue: 0.5,
        speed: 1,
        sync: false,
      },
      random: false,
      value: 0.9,
    },
    shape: {
      image: {
        height: 100,
        src: 'img/github.svg',
        width: 100,
      },
      polygon: {
        sides: 5,
      },
      stroke: {
        color: '000',
        width: 0,
      },
      type: 'circle',
    },
    size: {
      anim: {
        enable: false,
        minimumValue: 0.1,
        speed: 30,
        sync: true,
      },
      random: {
        enable: true,
        minimumValue: 2,
      },
      value: 4,
    },
  },
  retinaDetect: true,
};
