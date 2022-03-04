import styles from "./index.less";
import { useRef, useEffect } from "react";
import * as echarts from "echarts";
import cn from "classnames";

export interface ILineChartProps {
  xTicks: any[];
  dataSource: any[];
  className?: string;
  formatter?: boolean;
  yaxis?: any;
  xlabel?: string;
  ylabel?: string;
}

const LineChart: React.FC<ILineChartProps> = (props) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const {
    dataSource,
    className = "",
    xTicks,
    formatter = false,
    yaxis = {},
    xlabel = "",
    ylabel = "",
  } = props;

  useEffect(() => {
    if (dataSource.length === 0) return;
    const chartDom = chartRef.current as HTMLDivElement;
    const line = echarts.init(chartDom, undefined);
    const options = {
      grid: {
        top: 50,
        bottom: 30,
        left: 50,
        right: 20,
      },
      legend: {
        show: true,
        formatter: (text: string) => {
          const max_len = 6;
          return text.length < max_len
            ? text
            : text.slice(0, max_len - 3) + "...";
        },
      },
      xAxis: {
        name: xlabel,
        type: "category",
        data: xTicks.map((xTick) => xTick.text),
        axisLabel: {
          formatter: (text: any) => {
            const tick = xTicks.find((xTick) => text === xTick.text);
            return tick.x;
          },
        },
      },
      tooltip: {
        trigger: "axis",
        show: true,
      },
      yAxis: {
        name: ylabel,
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
