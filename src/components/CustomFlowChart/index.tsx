import { ChartType, NodeType } from "@/constants";
import { useSVGSize } from "@/hooks/useSVGSize";
import { generateBarChartProps, generateLineChartProps } from "@/utils";
import { Button, Card } from "antd";
import { Fragment, useRef } from "react";
import BarChart from "../BarChart";
import Headers from "../Headers";
import LineChart from "../LineChart";
import ScatterChart from "../ScatterChart";
import styles from "./index.less";

export interface ICustomFlowChartProps {
  graphData: any;
}

const isStart = (node: any, edges: any[]) => {
  return !edges.find((edge) => edge.target === node.id);
};

const isEnd = (node: any, edges: any[]) => {
  return !edges.find((edge) => edge.source === node.id);
};

const CustomFlowChart: React.FC<ICustomFlowChartProps> = (props) => {
  const { graphData } = props;
  const { nodes, edges } = graphData;
  const startNode = nodes.find((node: any) => isStart(node, edges));
  const endNode = nodes.find((node: any) => isEnd(node, edges));
  const contentRef = useRef<HTMLDivElement>(null);

  const drawNode = (node: any, side: boolean) => {
    if (!node) return null;
    const node_type = node?.node_type ?? "D";
    if (node_type === NodeType.D) {
      return <Headers data={node} className={side ? styles.headers : ""} />;
    } else {
      const chart_type = node?.data?.chart_type ?? "line";
      if (chart_type === ChartType.BAR) {
        const barChartProps = generateBarChartProps(
          node.data.data,
          node.data.legend
        );
        const legend = node.data.legend;
        return (
          <BarChart
            xTicks={barChartProps.xTicks}
            dataSource={barChartProps.series}
            legend={legend}
            className={styles.chart}
          />
        );
      } else if (
        chart_type === ChartType.LINE ||
        chart_type === ChartType.CAT_LINE
      ) {
        const isCatLine = (node?.data?.chart_type ?? "line") === "cat_line";
        const lineChartProps = generateLineChartProps(
          node?.data?.data ?? [],
          node?.data?.legend ?? [],
          isCatLine,
          9
        );
        return (
          <LineChart
            xTicks={lineChartProps.xTicks}
            dataSource={lineChartProps.series}
            className={styles.chart}
          />
        );
      } else {
        return (
          <ScatterChart
            dataSource={node?.data?.data ?? []}
            className={styles.chart}
            visualMapClassName={styles.visualMap}
            legend={node?.data?.legend}
          />
        );
      }
    }
  };

  const getPaths = () => {
    if (!startNode) return [];
    if (!endNode) return [];
    const paths = [] as any[];
    const queue = [] as string[];
    queue.push(startNode.id);
    // 寻找邻接点
    const dfs = (node: any, edges: any[], path: any[]) => {
      if (node === endNode.id) {
        paths.push(path);
        return;
      }
      for (const edge of edges) {
        if (edge.source === node) {
          dfs(edge.target, edges, [...path, edge.target]);
        }
      }
    };
    for (const edge of edges) {
      if (edge.source === startNode.id) {
        const path = [startNode.id, edge.target] as any[];
        dfs(edge.target, edges, path);
      }
    }
    return paths;
  };

  const paths = getPaths();
  const len = paths.length;
  const [contentWidth, contentHeight] = useSVGSize(contentRef);
  const startPos = {
    x: 0,
    y: 49,
  };
  const endPos = {
    x: 1286,
    y: 49,
  };

  return (
    <Card
      title="Transformation Path"
      className={styles.card}
      extra={
        <Button type="primary" className={styles.extra}>
          Export
        </Button>
      }
    >
      <div className={styles.content} ref={contentRef}>
        <svg width={contentWidth} height={contentHeight}>
          <g className={styles.nodes}>
            <foreignObject width="100%" height="100%">
              <div
                className={styles.nodeContainer}
                style={{ width: contentWidth, height: contentHeight }}
              >
                <div className={styles.start}>{drawNode(startNode, true)}</div>
                {paths.map((path: any[], pathIndex: number) => {
                  return (
                    <Fragment key={pathIndex}>
                      {path.slice(1, -1).map((node_id: any) => {
                        const rowIndex = paths.findIndex((path) =>
                          path.includes(node_id)
                        );
                        const path = paths[rowIndex];
                        const colIndex = path.indexOf(node_id);
                        const position = {
                          x:
                            (colIndex * (endPos.x - startPos.x)) /
                              (path.length - 1) +
                            startPos.x,
                          y: len === 1 ? 100 : rowIndex === 0 ? 40 : 220,
                        };
                        return (
                          <div
                            className={styles.basicNode}
                            style={{
                              left: position.x,
                              top: position.y,
                            }}
                          >
                            {drawNode(
                              nodes.find((node: any) => node.id === node_id),
                              false
                            )}
                          </div>
                        );
                      })}
                    </Fragment>
                  );
                })}
                <div className={styles.end}>{drawNode(endNode, true)}</div>
              </div>
            </foreignObject>
          </g>
          <g className={styles.edges}></g>
        </svg>
      </div>
    </Card>
  );
};

export default CustomFlowChart;
