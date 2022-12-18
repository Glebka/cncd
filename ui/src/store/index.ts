import { configureStore } from "@reduxjs/toolkit";

import { machineStateSlice, MACHINE_STATE_SLICE } from "./machineStateSlice";
import { JOB_STATE_SLICE, jobStateSlice } from "./jobStateSlice";
import { windowsStateSlice, WINDOW_STATE_SLICE } from "./windowStateSlice";

export const store = configureStore({
  reducer: {
    [MACHINE_STATE_SLICE]: machineStateSlice.reducer,
    [JOB_STATE_SLICE]: jobStateSlice.reducer,
    [WINDOW_STATE_SLICE]: windowsStateSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const MachineStateActions = machineStateSlice.actions;
export const JobActions = jobStateSlice.actions;
export const WindowActions = windowsStateSlice.actions;

export { MachineStateSelectors } from "./machineStateSlice";
export { JobStateSelectors } from "./jobStateSlice";
