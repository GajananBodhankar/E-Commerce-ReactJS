import { configureStore } from "@reduxjs/toolkit";
import { ReduxReducer, ValidateReducer, cartreducer } from "./Redux";

const STore = configureStore({
  reducer: {
    ReduxReducer,
    ValidateReducer,
    cartreducer,
  },
});
export default STore;
// export type RootState = ReturnType<typeof STore.getState>;
// export type AppDispatch = typeof STore.dispatch;
