"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import { Provider } from "react-redux";
import profilesReducer from "./slices/profilesSlice";
import likedReducer from "./slices/likedSlice";
import { PersistGate } from "redux-persist/integration/react";
import React from "react";

// Persist config for ONLY profiles (not liked)
const persistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["profiles"], // Only persist profiles, not liked
};

const rootReducer = combineReducers({
  profiles: profilesReducer,
  liked: likedReducer, // Not persisted
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) => getDefault({ serializableCheck: false }),
});

const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  );
}
