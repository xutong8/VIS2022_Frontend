import { vlist, tlist, tdlist, fdlist, statlist, tvlist } from "@/constants";
import { createContext } from "react";

const store = {
  vlist,
  tlist,
  tdlist,
  fdlist,
  statlist,
  tvlist
};

export type ContextType = {
  rootState: typeof store,
  setRootState: (rootState: typeof store) => void
} | null;

const RootContext = createContext<ContextType>(null);

export { RootContext, store };
