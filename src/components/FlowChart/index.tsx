import { useEffect } from "react";
import styles from "./index.less";
import * as dagre from "dagre";
import { select } from "d3";
import { NodeType } from "@/constants";
export interface IFlowChartProps {
  graphData: any;
}

const FlowChart: React.FC<IFlowChartProps> = (props) => {
  const { graphData } = props;

  const layoutGraph = () => {
    const graph = new dagre.graphlib.Graph();
    graph.setGraph({});
    graph.setDefaultEdgeLabel(function () {
      return {};
    });

    console.log("graphData: ", graphData);

    const nodes = graphData.nodes as any[];
    const nodesRef = select(`.${styles.nodes}`);

    // 创建node节点
    nodesRef
      .selectAll("div")
      .data(nodes)
      .join(
        (enter) =>
          enter
            .append("div")
            .attr("id", (_, index: number) => `node_${index}`)
            .attr("class", styles.node),
        (update) => update,
        (exit) => exit.remove()
      );

    // 类型为D的节点添加header
    nodesRef
      .selectAll("div")
      .filter((d: any) => d.node_type === NodeType.D)
      .selectAll("div")
      .data((d: any) => d?.data?.headers ?? [])
      .join("div")
      .attr("class", styles.header)
      .text((d: any) => d);

    // 类型为V的节点添加散点图
    // nodesRef
    //   .selectAll("div")
    //   .filter((d: any) => d.node_type === NodeType.V)
    //   .selectAll("div");

    // 计算宽度和高度
    const nodeAllDom = nodesRef.selectAll("g").nodes() as HTMLElement[];
    nodeAllDom.forEach((nodeDom: HTMLElement, index: number) => {
      const bounding = nodeDom.getBoundingClientRect();
      const width = bounding.width;
      const height = bounding.height;
      const node = nodes[index];
      const newNode = {
        ...node,
        width,
        height,
        label: "",
      };
      nodes[index] = newNode;
      graph.setNode(newNode.id, newNode);
    });

    const edges = graphData.edges as any[];
    edges.forEach((edge) => {
      graph.setEdge(edge.from, edge.to);
    });

    dagre.layout(graph);

    graph.nodes().forEach(function (v: any) {
      console.log("Node " + v + ": ", graph.node(v));
    });
    graph.edges().forEach(function (e: any) {
      console.log("Edge " + e.v + " -> " + e.w + ": ", graph.edge(e));
    });
  };

  useEffect(() => {
    if (graphData?.nodes && graphData?.edges) {
      layoutGraph();
    }
  }, [graphData]);

  return (
    <div id={styles.container}>
      <svg className={styles.graph}>
        <foreignObject width="100%" height="100%">
          <div className={styles.nodes}></div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default FlowChart;
