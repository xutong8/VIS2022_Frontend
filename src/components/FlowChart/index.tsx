import { useEffect, useRef } from "react";
import styles from "./index.less";
import G6 from "@antv/g6";

const FlowChart = () => {
  const data = {
    nodes: [
      {
        id: "0",
        label: "0",
      },
      {
        id: "1",
        label: "1",
      },
      {
        id: "2",
        label: "2",
      },
      {
        id: "3",
        label: "3",
      },
      {
        id: "4",
        label: "4",
      },
      {
        id: "5",
        label: "5",
      },
      {
        id: "6",
        label: "6",
      },
      {
        id: "7",
        label: "7",
      },
      {
        id: "8",
        label: "8",
      },
      {
        id: "9",
        label: "9",
      },
    ],
    edges: [
      {
        source: "0",
        target: "1",
      },
      {
        source: "0",
        target: "2",
      },
      {
        source: "1",
        target: "4",
      },
      {
        source: "0",
        target: "3",
      },
      {
        source: "3",
        target: "4",
      },
      {
        source: "4",
        target: "5",
      },
      {
        source: "4",
        target: "6",
      },
      {
        source: "5",
        target: "7",
      },
      {
        source: "5",
        target: "8",
      },
      {
        source: "8",
        target: "9",
      },
      {
        source: "2",
        target: "9",
      },
      {
        source: "3",
        target: "9",
      },
    ],
  };

  const containerRef = useRef<HTMLDivElement>(null);

  // 第一步，实例化graph
  useEffect(() => {
    const container = containerRef.current;
    const width = container?.clientWidth ?? 0;
    const height = container?.clientHeight ?? 0;

    const graph = new G6.Graph({
      container: styles.container,
      width,
      height,
      layout: {
        type: "dagre",
        rankdir: "LR",
        align: "UL",
        controlPoints: true,
        nodesepFunc: () => 1,
        ranksepFunc: () => 1,
      },
      defaultNode: {
        size: [20, 10],
        type: "rect",
        style: {
          lineWidth: 2,
          stroke: "#5B8FF9",
          fill: "#C6E5FF",
        },
      },
      defaultEdge: {
        type: "polyline",
        size: 1,
        color: "#e2e2e2",
        style: {
          endArrow: {
            path: "M 0,0 L 8,4 L 8,-4 Z",
            fill: "#e2e2e2",
          },
          radius: 10,
        },
      },
    });
    graph.data(data);
    graph.render();
  }, []);

  return <div id={styles.container} ref={containerRef}></div>;
};

export default FlowChart;
