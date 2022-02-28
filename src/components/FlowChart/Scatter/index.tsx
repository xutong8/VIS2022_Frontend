import styles from "./index.less";
import { memo, useEffect, useRef } from "react";
import { Handle } from "react-flow-renderer";
import * as echarts from "echarts";

const Scatter = ({
  data,
  isConnectable,
}: {
  data: any;
  isConnectable: any;
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chartDom = chartRef.current as HTMLDivElement;
    const scatter = echarts.init(chartDom);
    const options = {
      xAxis: {},
      yAxis: {},
      series: [
        {
          symbolSize: 20,
          data: [...data.data.data.map((item: any) => [item.x, item.y, item.color])],
          type: "scatter",
          itemStyle: {
            normal: {
              color: function (arg: any) {
                const colors = arg.data[2] as number[];
                return `rgb(${255 * colors[0]}, ${255 * colors[1]}, ${255 * colors[2]})`;
              },
            },
          },
        },
      ],
    };
    scatter.setOption(options);
  }, [data]);

  return (
    <>
      <Handle
        type="target"
        /*@ts-ignore*/
        position="left"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
      <div ref={chartRef} className={styles.chart}></div>
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
