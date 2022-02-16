import { useEffect, useRef } from "react";
import styles from "./index.less";
import G6 from "@antv/g6";
import { NODE_NAME_CARD } from '@/constants';

const FlowChart = () => {
  const data = {
    nodes: [
      {
        id: "0",
        label: "0",
        type: NODE_NAME_CARD,
        data: [
          {
            name: 'name0_0',
            value: 'value0_0'
          },
          {
            name: 'name0_1',
            value: 'value0_1'
          },
        ]
      },
      {
        id: "1",
        label: "1",
        type: NODE_NAME_CARD,
        data: [
          {
            name: 'name1_0',
            value: 'value1_0'
          },
          {
            name: 'name1_1',
            value: 'value1_1'
          },
        ]
      },
      {
        id: "2",
        label: "2",
        type: NODE_NAME_CARD,
        data: [
          {
            name: 'name2_0',
            value: 'value2_0',
          },
          {
            name: 'name2_1',
            value: 'value2_1'
          },
        ]
      },
      {
        id: "3",
        label: "3",
        type: NODE_NAME_CARD,
        data: [
          {
            name: 'name3_0',
            value: 'value3_0'
          },
          {
            name: 'name3_1',
            value: 'value3_1'
          },
        ]
      }
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
        target: "3"
      }
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
        ranksepFunc: () => 50,
      },
      defaultNode: {
        size: [120, 120],
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
          radius: 15,
        },
      },
    });
    graph.data(data);
    graph.render();
  }, []);

  return <div id={styles.container} ref={containerRef}></div>;
};

export default FlowChart;
