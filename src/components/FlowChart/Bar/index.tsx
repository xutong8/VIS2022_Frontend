import styles from "./index.less";
import { memo } from "react";
import { Handle } from "react-flow-renderer";
import BarChart from "@/components/BarChart";
import { generateBarChartProps } from "@/utils";

const Bar = (props: { data: any; isConnectable: any, sourcePosition: string, targetPosition: string }) => {
  const { data, isConnectable, sourcePosition, targetPosition } = props;
  const barChartProps = generateBarChartProps(data.data.data, data.data.legend);
  const legend = data.data.legend;
  return (
    <>
      <Handle
        type="target"
        /*@ts-ignore*/
        position={targetPosition}
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
      <BarChart
        xTicks={barChartProps.xTicks}
        dataSource={barChartProps.series}
        legend={legend}
        className={styles.chart}
      />
      <Handle
        type="source"
        /*@ts-ignore*/
        position={sourcePosition}
        style={{ top: 10, background: "#555" }}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default memo(Bar);
