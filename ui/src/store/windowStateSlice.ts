import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { WINDOW_STATE_SLICE } from "./types";

interface WindowState {
  maximized: boolean;
}

const initialWindowState: WindowState = {
  maximized: false,
};

export { WINDOW_STATE_SLICE } from "./types";

export const windowsStateSlice = createSlice({
  name: WINDOW_STATE_SLICE,
  initialState: initialWindowState,
  reducers: {
    setMaximized: (state, action: PayloadAction<boolean>) => {
      state.maximized = action.payload;
    },
  },
});

const selectWindowMaximized = (state: RootState): boolean => {
  return state[WINDOW_STATE_SLICE].maximized;
};

export const WindowStateSelectors = {
  selectWindowMaximized,
};
