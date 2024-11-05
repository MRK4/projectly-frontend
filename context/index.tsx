"use client";

import { createContext, useContext, useState } from "react";

type Context = {
  hello: string;
};

const AppContext = createContext<Context>({
  hello: "world",
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  let [state, setState] = useState({
    hello: "world",
  });

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
