import { useEffect, useState } from "react";
import styles from "./index.less";
import { ChartType, NodeType } from "@/constants";
import ReactFlow, { isNode } from "react-flow-renderer";
import dagre from "dagre";
import Headers from "./Headers";
import Scatter from "./Scatter";
import Line from "./Line";
import Bar from "./Bar";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Card, Popover } from "antd";
import { ChartTypeContext } from "@/store/chartType";
import { httpRequest } from "@/services";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeTypes = {
  headersNode: Headers,
  scatterNode: Scatter,
  lineNode: Line,
  barNode: Bar,
};

const nodeBoundingRect = {
  [NodeType.D]: {
    width: 550,
    height: 400,
  },
  [NodeType.V]: {
    width: 550,
    height: 450,
  },
} as {
  [key: string]: any;
};

const getLayoutedElements = (elements: any[], direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction, ranksep: 400, nodesep: 400 });

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
  setGraphData: (graphData: any) => void;
}

const FlowChart: React.FC<IFlowChartProps> = (props) => {
  const { graphData, setGraphData } = props;

  const layoutGraph = () => {
    const nodes = (graphData?.nodes ?? []) as any[];
    const getNodeType = (node: any) => {
      const node_type = node?.data?.chart_type ?? ChartType.SCATTER;
      switch (node_type) {
        case ChartType.SCATTER:
          return "scatterNode";
        case ChartType.LINE:
          return "lineNode";
        case ChartType.BAR:
          return "barNode";
        case ChartType.CAT_LINE:
          return "lineNode";
        default:
          return "scatterNode";
      }
    };

    const newNodes = nodes.map((node, index: number) => ({
      id: node.id,
      position: [0, 0],
      data: {
        label: `node_${index}`,
        ...node,
        setGraphData,
      },
      className:
        node?.stress ?? false
          ? styles["stressed-node"]
          : styles["ordinary-node"],
      type: node.node_type === NodeType.D ? "headersNode" : getNodeType(node),
      ...(node.node_type === NodeType.D ? { targetPosition: "left" } : {}),
    }));
    const edges = (graphData?.edges ?? []) as any[];
    const newEdges = edges
      .map((edge, index: number) => ({
        id: `edge_${index}`,
        source: edge.source,
        target: edge.target,
        animated: true,
        className: edge?.stress ?? false ? styles["stressed-edge"] : "",
      }));
    setElements([...newNodes, ...newEdges]);
  };

  useEffect(() => {
    if (graphData?.nodes && graphData?.edges) {
      layoutGraph();
    }
  }, [graphData]);

  const [elements, setElements] = useState<any[]>([]);

  const [chartType, setChartType] = useState<any>("");
  const [popVisible, setPopVisible] = useState<boolean>(false);

  const popoverContent = (
    <div className={styles.popoverContent}>
      <Button
        type="primary"
        className={styles.btn}
        onClick={() => {
          setChartType("scatter");
          setPopVisible(false);
        }}
      >
        Scatter
      </Button>
      <Button
        type="primary"
        style={{ background: "red", borderColor: "red" }}
        className={styles.btn}
        onClick={() => {
          setChartType("bar");
          setPopVisible(false);
        }}
      >
        Bar
      </Button>
      <Button
        type="primary"
        style={{ background: "orange", borderColor: "orange" }}
        className={styles.btn}
        onClick={() => {
          setChartType("line");
          setPopVisible(false);
        }}
      >
        Line
      </Button>
    </div>
  );

  const handleConfirm = () => {
    if (chartType === "scatter") {
      if (!para.xy) return;
    }

    if (chartType === "line") {
      if (!para.y) return;
    }

    if (chartType === "bar") {
      if (!para.x || !para.y) return;
    }

    httpRequest
      .post("/addV", {
        vtype: chartType,
        channels: para,
      })
      .then((res: any) => {
        const graphData = res?.data?.result ?? {};
        const highlight = res?.data?.highlight ?? '';
        const nodes = graphData?.nodes ?? [];
        const newNodes = nodes.map((node: any) => ({...node, stress: node.id === highlight}));
        graphData.nodes = newNodes;
        setGraphData(graphData);
      })
      .finally(() => {
        // 确定之后需要清空状态
        setChartType("");
        setPara({});
      });
  };

  const [para, setPara] = useState<any>({});

  const disabled = () => {
    if (chartType === "") return true;

    if (chartType === "scatter") {
      if (!para.xy) return true;
    }

    if (chartType === "line") {
      if (!para.y) return true;
    }

    if (chartType === "bar") {
      if (!para.x || !para.y) return true;
    }

    return false;
  };

  return (
    <Card
      title="FlowChart"
      className={styles.card}
      extra={
        <div className={styles.title}>
          <Popover
            visible={popVisible}
            title={
              <div className={styles.popoverTitle}>
                <div>Please choose a chart type</div>
                <CloseOutlined
                  className={styles.close}
                  onClick={() => setPopVisible(false)}
                />
              </div>
            }
            content={popoverContent}
          >
            <PlusOutlined
              className={styles.plus}
              onMouseEnter={() => setPopVisible(true)}
            />
          </Popover>
          <Button
            onClick={handleConfirm}
            type="primary"
            size="small"
            disabled={disabled()}
          >
            Confirm
          </Button>
        </div>
      }
    >
      <ChartTypeContext.Provider
        value={{
          chartType,
          setChartType,
          para,
          setPara,
        }}
      >
        <div id={styles.container}>
          <ReactFlow
            elements={getLayoutedElements(elements, "LR")}
            nodeTypes={nodeTypes}
            minZoom={0.2}
            className={styles.flowchart}
          />
        </div>
      </ChartTypeContext.Provider>
    </Card>
  );
};

export default FlowChart;
