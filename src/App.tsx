import "@/styles/index.less";
import { useState } from "react";
import styles from "./App.less";
import BasicLayout from "./components/BasicLayout";
import { RootContext, store } from "./store";

function App() {
  const [rootState, setRootState] = useState<any>(store);

  return (
    <RootContext.Provider
      value={{
        rootState,
        setRootState,
      }}
    >
      <div className={styles.app}>
        <BasicLayout />
      </div>
    </RootContext.Provider>
  );
}

export default App;
