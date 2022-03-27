import { useEffect, useState } from "react";
import styles from "./index.less";
import { ChartType, NodeType } from "@/constants";
import ReactFlow, {
  isEdge,
  isNode,
  ReactFlowProvider,
} from "react-flow-renderer";
import dagre from "dagre";
import Headers from "./Headers";
import Scatter from "./Scatter";
import Line from "./Line";
import Bar from "./Bar";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Card, Popover } from "antd";
import { ChartTypeContext } from "@/store/chartType";
import { httpRequest } from "@/services";
import Ordinary from "./Ordinary";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeTypes = {
  headersNode: Headers,
  scatterNode: Scatter,
  lineNode: Line,
  barNode: Bar,
  ordinaryNode: Ordinary,
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

const isStart = (el: any, edges: any[]) => {
  return !edges.find((edge) => edge.target === el.id);
};

const isEnd = (el: any, edges: any[]) => {
  return !edges.find((edge) => edge.source === el.id);
};

const getLayoutedElements = (
  elements: any[],
  direction = "TB",
  customLayout = false
) => {
  if (customLayout) {
    if (elements.length === 0) return [];
    const edges = elements.filter((el) => isEdge(el));
    const startNode = elements.find((el) => isStart(el, edges));
    const endNode = elements.find((el) => isEnd(el, edges));
    const startPos = {
      x: -1800,
      y: 0,
    };
    const endPos = {
      x: 1800,
      y: 0,
    };
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
    return elements.map((el) => {
      if (isNode(el)) {
        const isHorizontal = direction === "LR";
        /*@ts-ignore */
        el.targetPosition = isHorizontal ? "left" : "top";
        /*@ts-ignore */
        el.sourcePosition = isHorizontal ? "right" : "bottom";
        if (isStart(el, edges)) {
          el.position = startPos;
        } else if (isEnd(el, edges)) {
          el.position = endPos;
        } else {
          const rowIndex = paths.findIndex((path) => path.includes(el.id));
          const path = paths[rowIndex];
          const colIndex = path.indexOf(el.id);
          el.position = {
            x:
              (colIndex * (endPos.x - startPos.x)) / (path.length - 1) +
              startPos.x,
            y: rowIndex === 0 ? -300 : 300,
          };
        }
      }
      return el;
    });
  } else {
    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction, ranksep: 100, nodesep: 80 });
    elements.forEach((el) => {
      if (isNode(el)) {
        const node_type = el.data.node_type as string;
        const layout = nodeBoundingRect[node_type];
        dagreGraph.setNode(el.id, {
          width: layout.width,
          height: layout.height,
        });
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
  }
};
export interface IFlowChartProps {
  graphData: any;
  setGraphData?: (graphData: any) => void;
  title: string;
  extra?: boolean;
  direction?: string;
  isSmooth?: boolean;
  preventZoom?: boolean;
  preventTranslate?: boolean;
  customLayout?: boolean;
}

const FlowChart: React.FC<IFlowChartProps> = (props) => {
  const {
    graphData,
    setGraphData = () => {},
    title,
    extra = false,
    direction = "LR",
    isSmooth = false,
    preventZoom = false,
    preventTranslate = false,
    customLayout = false,
  } = props;

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
      type:
        node.node_type === NodeType.D && !node.isSimple
          ? "headersNode"
          : node.node_type === NodeType.V
          ? getNodeType(node)
          : "ordinaryNode",
    }));
    const edges = (graphData?.edges ?? []) as any[];
    const newEdges = edges.map((edge, index: number) => ({
      id: `edge_${index}`,
      source: edge.source,
      target: edge.target,
      animated: true,
      type: isSmooth ? "smoothstep" : undefined,
      className:
        edge?.stress ?? false
          ? styles["stressed-edge"]
          : styles["ordinary-edge"],
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
        const highlight = res?.data?.highlight ?? "";
        const nodes = graphData?.nodes ?? [];
        const newNodes = nodes.map((node: any) => ({
          ...node,
          stress: node.id === highlight,
        }));
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
      title={title}
      className={styles.card}
      extra={
        extra ? (
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
              <span style={{ marginRight: 8 }}>New Visualization</span>
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
        ) : (
          <Button type="primary" className={styles.extra}>
            Export
          </Button>
        )
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
          <ReactFlowProvider>
            <ReactFlow
              elements={getLayoutedElements(elements, direction, customLayout)}
              nodeTypes={nodeTypes}
              minZoom={preventZoom ? 0.2 : 0.15}
              maxZoom={preventZoom ? 0.2 : 2}
              className={styles.flowchart}
              translateExtent={
                preventTranslate
                  ? [
                      [0, 0],
                      [0, 0],
                    ]
                  : [
                      [-Infinity, -Infinity],
                      [Infinity, Infinity],
                    ]
              }
            />
          </ReactFlowProvider>
        </div>
      </ChartTypeContext.Provider>
    </Card>
  );
};

export default FlowChart;
