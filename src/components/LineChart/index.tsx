import styles from "./index.less";
import { useRef, useEffect } from "react";
import * as echarts from "echarts";
import cn from "classnames";

export interface ILineChartProps {
  xTicks: any[];
  dataSource: any[];
  className?: string;
}

const LineChart: React.FC<ILineChartProps> = (props) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { dataSource, className = "", xTicks } = props;

  useEffect(() => {
    if (dataSource.length === 0) return;
    const chartDom = chartRef.current as HTMLDivElement;
    const line = echarts.init(chartDom);
    const options = {
      xAxis: {
        type: "category",
        data: xTicks,
      },
      yAxis: {
        type: "value",
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
