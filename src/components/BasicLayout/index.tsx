import styles from "./index.less";
import FileUploadTable from "@/components/FileUploadTable";
import FlowChart from "@/components/FlowChart";
import Clusters from "@/components/Clusters";
import { useState } from "react";
import ChartContainer from "../ChartContainer";

const BasicLayout = () => {
  const [clusters, setClusters] = useState<string[][]>([]);
  const [graphData, setGraphData] = useState<any>(null);
  const [visList, setVisList] = useState<any[]>([]);
  return (
    <div className={styles.layout}>
      <div className={styles.item} style={{ width: 340, maxWidth: 340 }}>
        <FileUploadTable clusters={clusters} setClusters={setClusters} />
        <Clusters
          clusters={clusters}
          setGraphData={setGraphData}
          setVisList={setVisList}
          setClusters={setClusters}
        />
      </div>
      <div className={styles.right}>
        <div className={styles.charts}>
          <ChartContainer
            visList={visList}
            graphData={graphData}
            setGraphData={setGraphData}
          />
        </div>
        <div className={styles.item}>
          <FlowChart graphData={graphData} setGraphData={setGraphData} />
        </div>
      </div>
    </div>
  );
};

export default BasicLayout;
