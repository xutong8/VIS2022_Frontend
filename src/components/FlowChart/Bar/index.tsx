import styles from "./index.less";
import { memo } from "react";
import { Handle } from "react-flow-renderer";
import BarChart from "@/components/BarChart";
import { generateBarChartProps } from "@/utils";

const Bar = ({ data, isConnectable }: { data: any; isConnectable: any }) => {
  const barChartProps = generateBarChartProps(data.data.data, data.data.legend);
  const legend = data.data.legend;
  return (
    <>
      <Handle
        type="target"
        /*@ts-ignore*/
        position="left"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
      <BarChart
        xTicks={barChartProps.xTicks}
        dataSource={barChartProps.series}
        legend={legend}
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

export default memo(Bar);
