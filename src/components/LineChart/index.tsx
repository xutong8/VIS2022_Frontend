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
        position: function (
          point: number[],
          params: any,
          dom: any,
          rect: any,
          size: any
        ) {
          // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
          // 提示框位置
          var x = 0; // x坐标位置
          var y = 0; // y坐标位置 // 当前鼠标位置

          var pointX = point[0];
          var pointY = point[1]; // 外层div大小 // var viewWidth = size.viewSize[0]; // var viewHeight = size.viewSize[1]; // 提示框大小

          var boxWidth = size.contentSize[0];
          var boxHeight = size.contentSize[1]; // boxWidth > pointX 说明鼠标左边放不下提示框

          if (boxWidth > pointX) {
            x = pointX + 10;
          } else {
            // 左边放的下
            x = pointX - boxWidth - 10;
          } // boxHeight > pointY 说明鼠标上边放不下提示框

          if (boxHeight > pointY) {
            y = 5;
          } else {
            // 上边放得下
            y = pointY - boxHeight;
          }

          return [x, y];
        },
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
                  const text = String(yaxis?.[value] ?? "");
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
    chartDom.removeAttribute("_echarts_instance_");
    line.setOption(options);
  }, [dataSource, xTicks, formatter, xlabel, ylabel, yaxis]);

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
