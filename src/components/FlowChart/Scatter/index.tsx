import styles from "./index.less";
import { memo } from "react";
import { Handle } from "react-flow-renderer";
import ScatterChart from "@/components/ScatterChart";

const Scatter = ({
  data,
  isConnectable,
}: {
  data: any;
  isConnectable: any;
}) => {
  return (
    <>
      <Handle
        type="target"
        /*@ts-ignore*/
        position="left"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
      <ScatterChart
        dataSource={data.data.data}
        className={styles.chart}
        visualMapClassName={styles.visualMap}
        legend={data.data.legend}
      />
      <Handle
        type="source"
        /*@ts-ignore*/
        position="right"
        style={{ top: 10, background: "#555" }}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default memo(Scatter);
