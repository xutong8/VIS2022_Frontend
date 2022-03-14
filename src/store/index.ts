import { vlist, tlist, tdlist, fdlist, statlist } from "@/constants";
import { createContext } from "react";

const store = {
  vlist,
  tlist,
  tdlist,
  fdlist,
  statlist
};

export type ContextType = {
  rootState: typeof store,
  setRootState: (rootState: typeof store) => void
} | null;

const RootContext = createContext<ContextType>(null);

export { RootContext, store };
