import { themes } from 'appearance';
import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { Config, Theme } from 'types';

interface AppContextInterface extends AppProviderInterface {
  setTheme: Dispatch<string>;
  theme: Theme;
}

interface AppProviderInterface {
  config: Config;
  isMobile: boolean;
}

const actions = { SET_THEME: 'SET_THEME' } as const;

interface AppAction {
  type: typeof actions.SET_THEME;
  value: string;
}

type AppState = AppContextInterface;

const initialState: AppState = {
  config: {} as Config,
  isMobile: false,
  setTheme: () => undefined,
  theme: themes.dark,
};

export const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case actions.SET_THEME:
      return { ...state, theme: themes[action.value] };
  }
};

export const AppContext = createContext(initialState);

export const AppProvider = ({
  children,
  config,
  isMobile,
}: AppProviderInterface & { children: ReactNode }) => {
  initialState.config = config;
  initialState.isMobile = isMobile;

  const supportedThemes = Object.keys(themes);
  const localStorageTheme = localStorage.getItem('theme');
  if (localStorageTheme && supportedThemes.includes(localStorageTheme)) {
    initialState.theme = themes[localStorageTheme];
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const value: AppContextInterface = {
    config: state.config,
    isMobile: state.isMobile,
    setTheme: (value) => {
      dispatch({ type: actions.SET_THEME, value });
    },
    theme: state.theme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
