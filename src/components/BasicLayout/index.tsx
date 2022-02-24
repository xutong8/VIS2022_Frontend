import styles from "./index.less";
import FileUploadTable from "@/components/FileUploadTable";
import FlowChart from "@/components/FlowChart";
import Clusters from "@/components/Clusters";
import { useState } from "react";
import ChartContainer from "../ChartContainer";

const BasicLayout = () => {
  const [clusters, setClusters] = useState<string[][]>([]);

  return (
    <div className={styles.layout}>
      <div className={styles.item}>
        <FileUploadTable setClusters={setClusters} />
        <Clusters clusters={clusters} />
      </div>
      <div
        className={styles.item}
        style={{ flexDirection: "row", flex: "2 0 0" }}
      >
        <div className={styles.charts}>
          <ChartContainer />
        </div>
        <div className={styles.item}>
          <FlowChart />
        </div>
      </div>
    </div>
  );
};

export default BasicLayout;
