import styles from "./index.less";
import React, { useState } from "react";
import { ChartType } from "@/constants";
import ScatterChart from "@/components/ScatterChart";
import LineChart from "../LineChart";
import { generateBarChartProps, generateLineChartProps } from "@/utils";
import BarChart from "../BarChart";
import { Card } from "antd";
import cn from "classnames";
export interface IChartContainerProps {
  visList: any[];
  graphData: any;
  setGraphData: (graphData: any) => void;
}

const ChartContainer: React.FC<IChartContainerProps> = (props) => {
  const { visList, graphData, setGraphData } = props;
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleDBClick = (paths: any, index: number) => {
    const stressEdges = (paths?.edges ?? []) as any[];
    const edges = ((graphData?.edges ?? []) as any[]).map((edge) => ({
      ...edge,
      stress: false,
    }));
    const stressNodes = (paths?.nodes ?? []) as any[];
    const nodes = ((graphData?.nodes ?? []) as any[]).map((node) => ({
      ...node,
      stress: false,
    }));

    let newEdges = edges.slice();
    let newNodes = nodes.slice();

    if (index !== selectedIndex) {
      newEdges = edges.map((edge) => {
        const item = stressEdges.find(
          (item) => item.source === edge.source && item.target === edge.target
        );
        if (item) {
          return {
            ...edge,
            stress: true,
          };
        }
        return edge;
      });
      newNodes = nodes.map((node) => {
        const item = stressNodes.find((id) => id === node.id);
        if (item) {
          return {
            ...node,
            stress: true,
          };
        }
        return node;
      });
      setSelectedIndex(index);
    } else {
      setSelectedIndex(-1);
    }

    setGraphData({
      ...graphData,
      nodes: newNodes,
      edges: newEdges,
    });
  };

  return (
    <Card
      title={<span style={{ fontSize: 25 }}>Visualization Navigation</span>}
      className={styles.card}
    >
      <div className={styles.chartContainer}>
        {visList.map((item, index: number) => {
          if (item.chart_type === ChartType.SCATTER) {
            return (
              <div
                key={index}
                onDoubleClick={() => handleDBClick(item.paths, index)}
                className={cn({
                  [styles.selected]: index === selectedIndex,
                  [styles.border]: true
                })}
              >
                <ScatterChart
                  dataSource={item.data}
                  xlabel={item.xlabel}
                  ylabel={item.ylabel}
                  legend={item.legend}
                  symbolSize={4}
                />
              </div>
            );
          } else if (item.chart_type === ChartType.LINE) {
            const lineProps = generateLineChartProps(item.data, item.legend);
            return (
              <div
                key={index}
                onDoubleClick={() => handleDBClick(item.paths, index)}
                className={cn({
                  [styles.selected]: index === selectedIndex,
                  [styles.border]: true
                })}
              >
                <LineChart
                  dataSource={lineProps.series}
                  xTicks={lineProps.xTicks}
                  xlabel={item.xlabel}
                  ylabel={item.ylabel}
                />
              </div>
            );
          } else if (item.chart_type === ChartType.CAT_LINE) {
            const lineProps = generateLineChartProps(
              item.data,
              item.legend,
              true
            );
            const yaxis = item.yaxis;
            return (
              <div
                key={index}
                onDoubleClick={() => handleDBClick(item.paths, index)}
                className={cn({
                  [styles.selected]: index === selectedIndex,
                  [styles.border]: true
                })}
              >
                <LineChart
                  yaxis={yaxis}
                  formatter={true}
                  dataSource={lineProps.series}
                  xTicks={lineProps.xTicks}
                />
              </div>
            );
          } else if (item.chart_type === ChartType.BAR) {
            const barProps = generateBarChartProps(item.data, item.legend);
            return (
              <div
                key={index}
                onDoubleClick={() => handleDBClick(item.paths, index)}
                className={cn({
                  [styles.selected]: index === selectedIndex,
                  [styles.border]: true
                })}
              >
                <BarChart
                  xTicks={barProps.xTicks}
                  dataSource={barProps.series}
                  legend={item.legend}
                  xlabel={item.xlabel}
                  ylabel={item.ylabel}
                />
              </div>
            );
          } else return null
        })}
      </div>
    </Card>
  );
};

export default ChartContainer;
