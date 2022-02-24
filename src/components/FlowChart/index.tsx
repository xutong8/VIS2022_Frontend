import { useEffect, useRef } from "react";
import styles from "./index.less";
import * as dagre from "dagre";
export interface IFlowChartProps {
  graphData: any;
}

const FlowChart: React.FC<IFlowChartProps> = (props) => {
  const { graphData } = props;

  const layoutGraph = () => {
    const g = new dagre.graphlib.Graph();
    g.setGraph({});
    g.setDefaultEdgeLabel(function () {
      return {};
    });
    g.setNode("kspacey", { label: "Kevin Spacey", width: 144, height: 100 });
    g.setNode("swilliams", { label: "Saul Williams", width: 160, height: 100 });
    g.setNode("bpitt", { label: "Brad Pitt", width: 108, height: 100 });
    g.setNode("hford", { label: "Harrison Ford", width: 168, height: 100 });
    g.setNode("lwilson", { label: "Luke Wilson", width: 144, height: 100 });
    g.setNode("kbacon", { label: "Kevin Bacon", width: 121, height: 100 });
    g.setEdge("kspacey", "swilliams");
    g.setEdge("swilliams", "kbacon");
    g.setEdge("bpitt", "kbacon");
    g.setEdge("hford", "lwilson");
    g.setEdge("lwilson", "kbacon");
    dagre.layout(g);
    g.nodes().forEach(function (v: any) {
      console.log("Node " + v + ": ", g.node(v));
    });
    // const nodes = (graphData.nodes as any[]).map((node) => ({
    //   ...node,
    //   width: 200,
    //   height: 100,
    // }));
    // console.log(nodes);
    // nodes.forEach((node) => {
    //   graph.setNode(node.id, node);
    // });
    // const edges = graphData.edges as any[];
    // edges.forEach((edge) => {
    //   graph.setEdge(edge.from, edge.to);
    // });
  };

  useEffect(() => {
    if (graphData?.nodes && graphData?.edges) {
      layoutGraph();
    }
  }, [graphData]);

  return <div id={styles.container}></div>;
};

export default FlowChart;
