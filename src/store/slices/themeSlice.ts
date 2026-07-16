import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '../../constants';

interface ThemeState {
  theme: 'light' | 'dark';
}

const getInitialTheme = (): 'light' | 'dark' => {
  const saved = localStorage.getItem(STORAGE_KEYS.THEME);
  if (saved === 'light' || saved === 'dark') return saved;
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
};

const initialState: ThemeState = {
  theme: getInitialTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem(STORAGE_KEYS.THEME, state.theme);
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      localStorage.setItem(STORAGE_KEYS.THEME, state.theme);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
