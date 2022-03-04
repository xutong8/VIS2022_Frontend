import styles from "./index.less";
import * as echarts from "echarts";
import { useRef, useEffect } from "react";
import cn from "classnames";

export interface IBarChartProps {
  xTicks: any[];
  dataSource: any[];
  legend: string[];
  className?: string;
  xlabel?: string;
  ylabel?: string;
}

const BarChart: React.FC<IBarChartProps> = (props) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const {
    dataSource,
    className = "",
    xTicks,
    legend,
    xlabel = "",
    ylabel = "",
  } = props;

  useEffect(() => {
    if (dataSource.length === 0) return;
    const chartDom = chartRef.current as HTMLDivElement;
    const bar = echarts.init(chartDom, undefined);
    const options = {
      grid: {
        top: 50,
        bottom: 30,
        left: 50,
        right: 20,
      },
      legend: {
        show: true,
        data: legend,
        formatter: (text: string) => {
          const max_len = 6;
          return text.length < max_len
            ? text
            : text.slice(0, max_len - 3) + "...";
        },
      },
      xAxis: {
        type: "category",
        data: xTicks,
        name: xlabel
      },
      yAxis: {
        type: "value",
        name: ylabel
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      series: [...dataSource],
    };
    bar.setOption(options);
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

export default BarChart;
