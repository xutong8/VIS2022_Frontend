import styles from "./index.less";
import { memo } from "react";
import { Handle } from "react-flow-renderer";
import LineChart from "@/components/LineChart";
import { generateLineChartProps } from "@/utils";

const Line = (props: { data: any; isConnectable: any, sourcePosition: string, targetPosition: string }) => {
  const { data, isConnectable, sourcePosition, targetPosition } = props;
  const isCatLine = (data?.data?.chart_type ?? 'line') === 'cat_line';
  const lineChartProps = generateLineChartProps(data.data.data, data.data.legend, isCatLine);
  return (
    <>
      <Handle
        type="target"
        /*@ts-ignore*/
        position={targetPosition}
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
        position={sourcePosition}
        style={{ top: 10, background: "#555" }}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default memo(Line);
