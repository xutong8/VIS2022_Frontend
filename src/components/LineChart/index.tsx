import styles from "./index.less";
import { useRef, useEffect } from "react";
import * as echarts from "echarts";
import cn from "classnames";
import { Tooltip } from "antd";
import Ellipsis from "../Ellipsis";

export interface ILineChartProps {
  xTicks: any[];
  dataSource: any[];
  className?: string;
  formatter?: boolean;
  yaxis?: any;
}

const LineChart: React.FC<ILineChartProps> = (props) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const {
    dataSource,
    className = "",
    xTicks,
    formatter = false,
    yaxis = {},
  } = props;

  useEffect(() => {
    if (dataSource.length === 0) return;
    const chartDom = chartRef.current as HTMLDivElement;
    const line = echarts.init(chartDom, undefined);
    const options = {
      grid: {
        top: 20,
        bottom: 40,
        left: 50,
        right: 20,
      },
      xAxis: {
        type: "category",
        data: xTicks,
      },
      yAxis: {
        type: !formatter ? "value" : "category",
        axisLabel: {
          ...(!formatter
            ? {}
            : {
                formatter: (value: string) => {
                  value = value + "";
                  const text = yaxis[value];
                  const max_len = 5;
                  return text.length < max_len
                    ? text
                    : `${text.slice(0, max_len)}...`;
                },
              }),
        },
      },
      series: [...dataSource],
    };
    line.setOption(options);
  }, [dataSource, xTicks]);

  return (
    <div
      ref={chartRef}
      className={cn({
        [styles.chart]: true,
        [className]: true,
      })}
    ></div>
  );
};

export default LineChart;
