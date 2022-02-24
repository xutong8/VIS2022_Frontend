import styles from "./index.less";
import FileUploadTable from "@/components/FileUploadTable";
import FlowChart from "@/components/FlowChart";
import Clusters from "@/components/Clusters";
import { useEffect, useState } from "react";
import ChartContainer from "../ChartContainer";
import { httpRequest } from "@/services";

const BasicLayout = () => {
  const [clusters, setClusters] = useState<string[][]>([]);

  // fetch search
  const fetchSearch = () => {
    httpRequest
      .post("/search")
      .then((res: any) => {
        console.log("res: ", res);
      })
      .catch((err) => {
        console.error("err: ", err);
      });
  };

  useEffect(() => {
    fetchSearch();
  }, []);

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
        <div className={styles.item}>
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
