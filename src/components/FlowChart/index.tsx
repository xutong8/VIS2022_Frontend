import { useEffect, useState } from "react";
import styles from "./index.less";
import { NodeType } from "@/constants";
import ReactFlow, { isNode } from "react-flow-renderer";
import dagre from "dagre";
import Headers from "../Headers";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeTypes = {
  headersNode: Headers,
};

const nodeBoundingRect = {
  [NodeType.D]: {
    width: 240,
    height: 200,
  },
  [NodeType.V]: {
    width: 450,
    height: 450,
  },
} as {
  [key: string]: any;
};

const getLayoutedElements = (elements: any[], direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  elements.forEach((el) => {
    if (isNode(el)) {
      const node_type = el.data.node_type as string;
      const layout = nodeBoundingRect[node_type];
      dagreGraph.setNode(el.id, { width: layout.width, height: layout.height });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      /*@ts-ignore */
      el.targetPosition = isHorizontal ? "left" : "top";
      /*@ts-ignore */
      el.sourcePosition = isHorizontal ? "right" : "bottom";
      const node_type = el.data.node_type as string;
      const layout = nodeBoundingRect[node_type];
      const nodeWidth = layout.width;
      const nodeHeight = layout.height;

      el.position = {
        x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
    }

    return el;
  });
};
export interface IFlowChartProps {
  graphData: any;
}

const FlowChart: React.FC<IFlowChartProps> = (props) => {
  const { graphData } = props;

  const layoutGraph = () => {
    const nodes = (graphData?.nodes ?? []) as any[];
    const newNodes = nodes.map((node, index: number) => ({
      id: node.id,
      position: [0, 0],
      data: {
        label: `node_${index}`,
        ...node,
      },
      type: node.node_type === NodeType.D ? "headersNode" : undefined,
      ...(node.node_type === NodeType.D ? { targetPosition: "left" } : {}),
    }));
    const edges = (graphData?.edges ?? []) as any[];
    const newEdges = edges.map((edge, index: number) => ({
      id: `edge_${index}`,
      source: edge.source,
      target: edge.target,
      animated: true,
    }));
    setElements([...newNodes, ...newEdges]);
  };

  useEffect(() => {
    if (graphData?.nodes && graphData?.edges) {
      layoutGraph();
    }
  }, [graphData]);

  const [elements, setElements] = useState<any[]>([]);

  return (
    <div id={styles.container}>
      <ReactFlow
        elements={getLayoutedElements(elements, "LR")}
        nodeTypes={nodeTypes}
        defaultZoom={0.5}
      />
    </div>
  );
};

export default FlowChart;
