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
        name: xlabel,
      },
      yAxis: {
        type: "value",
        name: ylabel,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
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
