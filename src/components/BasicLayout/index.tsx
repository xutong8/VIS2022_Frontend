import styles from "./index.less";
import FileUploadTable from "@/components/FileUploadTable";
import FlowChart from "@/components/FlowChart";
import Clusters from "@/components/Clusters";
import { useState } from "react";
import ChartContainer from "../ChartContainer";
import cn from "classnames";

const BasicLayout = () => {
  const [clusters, setClusters] = useState<string[][]>([]);
  const [graphData, setGraphData] = useState<any>(null);
  const [visList, setVisList] = useState<any[]>([]);
  const [editing, setEditing] = useState<boolean>(false);

  const getSimpleGraphData = () => {
    const getParentId = (target: string) => {
      return edges.find((edge: any) => edge.target === target).source;
    };

    const nodes = graphData?.nodes ?? [];
    const edges = graphData?.edges ?? [];
    // 对nodes进行修改
    const newNodes = nodes.map((node: any, index: number) => {
      const id = node?.id ?? "";
      if (id === "r") {
        return {
          ...node,
          isRoot: true,
        };
      }
      const outputMode = node?.data["output mode"];
      const parent = nodes.find((node: any) => node.id === getParentId(id));
      const curLen = node?.data.headers?.length ?? 0;
      const parLen = parent?.data?.headers?.length ?? 0;
      return {
        ...node,
        title: `Table${index}`,
        newAttributes:
          outputMode && outputMode === "append" ? curLen - parLen : curLen,
      };
    });

    return {
      nodes: newNodes,
      edges,
    };
  };
  // 缩略图
  const simpleGraphData = getSimpleGraphData();

  return (
    <div className={styles.layout}>
      <div
        className={cn({
          [styles.item]: true,
          [styles.left]: true,
        })}
      >
        <FileUploadTable
          editing={editing}
          clusters={clusters}
          setClusters={setClusters}
        />
        <Clusters
          clusters={clusters}
          setGraphData={setGraphData}
          setVisList={setVisList}
          setClusters={setClusters}
          editing={editing}
          setEditing={setEditing}
        />
      </div>
      <div className={styles.right}>
        <div className={styles.charts}>
          <ChartContainer
            visList={visList}
            graphData={graphData}
            setGraphData={setGraphData}
          />
        </div>
        <div className={styles.item}>
          <div className={styles.top}>
            <FlowChart
              graphData={{
                nodes: (simpleGraphData?.nodes ?? []).map((node: any) => {
                  if (node.node_type === "D") {
                    return {
                      ...node,
                      isSimple: true,
                    };
                  }
                  return node;
                }),
                edges: simpleGraphData?.edges ?? [],
              }}
              setGraphData={setGraphData}
              title="Simple Flow Chart"
              extra={true}
            />
          </div>
          <div className={styles.bot}>
            <FlowChart
              graphData={{
                nodes:
                  graphData?.nodes.filter((node: any) => node.stress) ?? [],
                edges:
                  graphData?.edges.filter((edge: any) => edge.stress) ?? [],
              }}
              title="Transformation Paths"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicLayout;
