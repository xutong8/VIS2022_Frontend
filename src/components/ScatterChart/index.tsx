import styles from "./index.less";
import { useRef, useEffect } from "react";
import * as echarts from "echarts";
import cn from 'classnames';
export interface IScatterChartProps {
  dataSource: any[];
  className?: string;
}

const ScatterChart: React.FC<IScatterChartProps> = (props) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { dataSource, className = "" } = props;

  useEffect(() => {
    if (dataSource.length === 0) return;
    const chartDom = chartRef.current as HTMLDivElement;
    const scatter = echarts.init(chartDom);
    const options = {
      xAxis: {},
      yAxis: {},
      series: [
        {
          symbolSize: 20,
          data: [
            ...dataSource.map((item: any) => [item.x, item.y, item.color]),
          ],
          type: "scatter",
          itemStyle: {
            normal: {
              color: function (arg: any) {
                const colors = arg.data[2] as number[];
                return `rgb(${255 * colors[0]}, ${255 * colors[1]}, ${
                  255 * colors[2]
                })`;
              },
            },
          },
        },
      ],
    };
    scatter.setOption(options);
  }, [dataSource]);

  return <div ref={chartRef} className={cn({
    [styles.chart]: true,
    [className]: true
  })}></div>;
};

export default ScatterChart;
