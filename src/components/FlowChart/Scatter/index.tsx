import styles from "./index.less";
import { memo } from "react";
import { Handle } from "react-flow-renderer";
import ScatterChart from "@/components/ScatterChart";

const Scatter = (props: {
  data: any;
  isConnectable: any;
  sourcePosition: string;
  targetPosition: string;
}) => {
  const { data, isConnectable, sourcePosition, targetPosition } = props;
  return (
    <>
      <Handle
        type="target"
        /*@ts-ignore*/
        position={targetPosition}
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
        position={sourcePosition}
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default memo(Scatter);
