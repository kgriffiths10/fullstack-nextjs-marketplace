import { useRef } from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  Provider,
} from "react-redux";
import globalReducer from "@/state";
import { api } from "@/state/api";
import { setupListeners } from "@reduxjs/toolkit/query";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

/* REDUX PERSISTENCE */
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["global"],
};
const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* REDUX STORE */
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware),
  });
};

/* REDUX TYPES */
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/* PROVIDER */
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
  }
  const persistor = persistStore(storeRef.current);

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

/* Learning Notes

-   Boiler plate code that can be used for any next.js project that uses redux for state management.
-   Redux is a state management library that allows you to manage the state of your application in a predictable way, 
    enhanced with persistence (via redux-persist) and API caching (viareduxjs/toolkit/query).
-   This allows for maintaining global state across your app, even after page reloads or navigations, and persisting 
    part of the state (like global) in localStorage or sessionStorage.
-   Ex. if dark mode was set, it will persist even after the user closes the browser and reopens it.

*/