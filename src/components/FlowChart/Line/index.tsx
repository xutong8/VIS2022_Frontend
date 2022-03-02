import styles from "./index.less";
import { memo } from "react";
import { Handle } from "react-flow-renderer";
import LineChart from "@/components/LineChart";
import { generateLineChartProps } from "@/utils";

const Line = ({ data, isConnectable }: { data: any; isConnectable: any }) => {
  const lineChartProps = generateLineChartProps(data.data.data, data.data.legend);
  return (
    <>
      <Handle
        type="target"
        /*@ts-ignore*/
        position="left"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
      <LineChart
        xTicks={lineChartProps.xTicks}
        dataSource={lineChartProps.series}
        className={styles.chart}
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

export default memo(Line);
