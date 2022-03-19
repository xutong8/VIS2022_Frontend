import styles from "./index.less";
import { useRef, useEffect } from "react";
import * as echarts from "echarts";
import cn from "classnames";
import { isSameArray } from "@/utils";
export interface IScatterChartProps {
  dataSource: any[];
  legend: any;
  className?: string;
  xlabel?: string;
  ylabel?: string;
  symbolSize?: number;
}

const ScatterChart: React.FC<IScatterChartProps> = (props) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const {
    dataSource,
    className = "",
    xlabel = "",
    ylabel = "",
    legend,
    symbolSize = 20,
  } = props;

  const keys = Object.keys(legend);
  const toColor = (colors: number[]) =>
    `rgb(${+colors[0] * 255}, ${+colors[1] * 255}, ${+colors[2] * 255})`;

  const series =
    legend && legend.hasOwnProperty("__Max")
      ? [
          {
            symbolSize,
            data: dataSource.map((item: any) => [
              item.x,
              item.y,
              item.color,
              item.text,
            ]),
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
        ]
      : keys.map((key: any) => {
          const color = legend[key];
          const data = dataSource
            .map((item: any) => [item.x, item.y, item.color, item.text])
            .filter((item) => isSameArray(item[2], color));
          return {
            name: key,
            symbolSize,
            data,
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
          };
        });

  useEffect(() => {
    if (dataSource.length === 0) return;
    const chartDom = chartRef.current as HTMLDivElement;
    const scatter = echarts.init(chartDom);
    const options = {
      xAxis: {
        name: xlabel,
      },
      yAxis: {
        name: ylabel,
      },
      tooltip: {
        position: "top",
        formatter: (param: any) => param.data[3],
      },
      legend:
        legend && legend.hasOwnProperty("__Max")
          ? { show: false }
          : {
              show: true,
              formatter: (text: string) => {
                const max_len = 6;
                return text.length < max_len
                  ? text
                  : text.slice(0, max_len - 3) + "...";
              },
            },
      color: keys.map((key: any) => {
        const colors = legend[key] as any[];
        return `rgb(${255 * colors[0]}, ${255 * colors[1]}, ${
          255 * colors[2]
        })`;
      }),
      series,
    };
    chartDom.removeAttribute("_echarts_instance_");
    scatter.setOption(options);
  }, [dataSource]);

  return (
    <div className={styles.container}>
      <div
        ref={chartRef}
        className={cn({
          [styles.chart]: true,
          [className]: true,
        })}
      />
      {legend && legend.hasOwnProperty("__Max") ? (
        <div
          className={styles.visualMap}
          style={{
            backgroundImage: `linear-gradient(${toColor(legend["__Max"])}, ${toColor(legend["__Min"])})`,
          }}
        ></div>
      ) : null}
    </div>
  );
};

export default ScatterChart;
