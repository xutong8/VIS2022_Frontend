import FileUploadTable from "./components/FileUploadTable";
import FlowChart from "./components/FlowChart";
import "@/styles/index.less";
import { useState } from "react";
import Clusters from "./components/Clusters";
import styles from "./App.less";

function App() {
  const [clusters, setClusters] = useState<string[][]>([]);

  return (
    <div className={styles.app}>
      <div className={styles.item}>
        <FileUploadTable setClusters={setClusters} />
        <Clusters clusters={clusters} />
      </div>
      <div className={styles.item}>
        <FlowChart />
      </div>
    </div>
  );
}

export default App;
