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

  const positions = paths.map((path: any[]) => {
    return path.slice(1, -1).map((node_id: string) => {
      const rowIndex = paths.findIndex((path) => path.includes(node_id));
      const path = paths[rowIndex];
      const colIndex = path.indexOf(node_id);
      const position = {
        x:
          (colIndex * (endPos.x - startPos.x)) / (path.length - 1) + startPos.x,
        y: len === 1 ? 100 : rowIndex === 0 ? 40 : 220,
      };
      return position;
    });
  });

  // 中间的headers节点的一半高度
  const HALF_HEIGHT = 75;
  const NODE_WIDTH = 240;

  // startNode的转折点
  const MIN_X =
    len === 0
      ? 0
      : len === 1
      ? positions[0][0].x
      : Math.min(positions[0][0].x, positions[1][0].x);
  // endNode的转折点
  const MAX_X =
    len === 0
      ? 0
      : len === 1
      ? positions[0][positions[0].length - 1].x
      : Math.max(
          positions[0][positions[0].length - 1].x,
          positions[1][positions[1].length - 1].x
        );

  // 起始转折点
  const startTuringX =
    startPos.x + NODE_WIDTH + Math.floor((MIN_X - startPos.x - NODE_WIDTH) / 2);

  const lastFirstPosition =
    positions.length !== 0
      ? positions[0][positions[0].length - 1]
      : { x: 0, y: 0 };
  const lastSecondPosition =
    positions.length >= 2
      ? positions[1][positions[1].length - 1]
      : { x: 0, y: 0 };

  // 终止转折点
  const endTurningX =
    endPos.x - Math.floor((endPos.x - MAX_X - NODE_WIDTH) / 2);

  return (
    <Card
      title={
        <span style={{ fontSize: 25 }}>Transformation Path</span>
      }
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
                <div
                  className={styles.start}
                  style={{
                    display: positions.length === 0 ? "none" : "block",
                  }}
                >
                  {drawNode(startNode, true)}
                </div>
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
                <div
                  className={styles.end}
                  style={{
                    display: positions.length === 0 ? "none" : "block",
                  }}
                >
                  {drawNode(endNode, true)}
                </div>
              </div>
            </foreignObject>
          </g>
          <g className={styles.edges}>
            {positions.map((position: any[], rowIndex: number) => {
              return position.map((cord: any, cordIndex: number) => {
                // start -> 第一行的第一个节点的线
                if (cordIndex === 0 && rowIndex === 0) {
                  return (
                    <path
                      d={`M ${NODE_WIDTH} 175 L ${startTuringX} 175 L ${startTuringX} ${
                        positions[0][0].y + HALF_HEIGHT
                      } L ${positions[0][0].x} ${
                        positions[0][0].y + HALF_HEIGHT
                      }`}
                      key={"0_0"}
                      stroke="black"
                      strokeWidth={1}
                      fill="none"
                    />
                  );
                }
                // start -> 第二行的第一个节点的线
                if (rowIndex === 1 && cordIndex === 0) {
                  return (
                    <path
                      d={`M ${NODE_WIDTH} 175 L ${startTuringX} 175 L ${startTuringX} ${
                        positions[1][0].y + HALF_HEIGHT
                      } L ${positions[1][0].x} ${
                        positions[1][0].y + HALF_HEIGHT
                      }`}
                      key={"1_0"}
                      stroke="black"
                      strokeWidth={1}
                      fill="none"
                    />
                  );
                }
                const prevPosition = positions[rowIndex][cordIndex - 1];
                return (
                  <path
                    key={`${rowIndex}_${cordIndex}`}
                    stroke="black"
                    strokeWidth={1}
                    fill="none"
                    d={`M ${prevPosition.x + NODE_WIDTH} ${
                      prevPosition.y + HALF_HEIGHT
                    } L ${cord.x} ${prevPosition.y + HALF_HEIGHT}`}
                  />
                );
              });
            })}
            {positions.length !== 0 && (
              <path
                key={`0_${positions[0].length - 1}`}
                stroke="black"
                strokeWidth={1}
                fill="none"
                d={`M ${lastFirstPosition.x + NODE_WIDTH} ${
                  lastFirstPosition.y + HALF_HEIGHT
                } L ${endTurningX} ${lastFirstPosition.y + HALF_HEIGHT}
                L ${endTurningX} 175 L ${endPos.x} 175`}
              />
            )}
            {positions.length === 2 && (
              <path
                key={`1_${positions[1].length - 1}`}
                stroke="black"
                strokeWidth={1}
                fill="none"
                d={`M ${lastSecondPosition.x + NODE_WIDTH} ${
                  lastSecondPosition.y + HALF_HEIGHT
                } L ${endTurningX} ${lastSecondPosition.y + HALF_HEIGHT}
                L ${endTurningX} 175 L ${endPos.x} 175`}
              />
            )}
          </g>
        </svg>
      </div>
    </Card>
  );
};

export default CustomFlowChart;
