import styles from "./index.less";
import { Button, List } from "antd";
import { httpRequest } from "@/services";
import { NODE_NAME_CARD } from "@/constants";
import { useMemo } from "react";
export interface IClustersProps {
  clusters: string[][];
  setClusters: (clusters: string[][]) => void;
  setGraphData: (graphData: any) => void;
  setVisList: (visList: any[]) => void;
}

const Clusters: React.FC<IClustersProps> = (props) => {
  const { clusters, setClusters, setGraphData, setVisList } = props;

  // fetch search
  const fetchSearch = () => {
    httpRequest
      .post("/search", {
        dim_clusters: clusters
      })
      .then((res: any) => {
        const data = res?.data ?? {};
        const nodes = ((data?.nodes ?? []) as any[]).map((node) => ({
          ...node,
          type: NODE_NAME_CARD,
        }));
        const edges = ((data?.edges ?? []) as any[]).map((edge) => ({
          source: edge.from,
          target: edge.to,
        }));
        const graphData = {
          nodes,
          edges,
        };
        setGraphData(graphData);
        const visList = data?.vis_list ?? [];
        setVisList(visList);
      })
      .catch((err) => {
        console.error("err: ", err);
      });
  };

  const handleClick = () => {
    fetchSearch();
  };

  const dataSource = useMemo(() => clusters.map((cluster, id: number) => {
    const newCluster = [...cluster] as any;
    newCluster.id = id;
    return newCluster;
  }), [clusters]);

  const handleDelete = (id: number) => {
    const newClusters = dataSource.filter((cluster: any) => cluster.id !== id);
    setClusters(newClusters);
  };

  return (
    <div className={styles.clusters}>
      <List
        itemLayout="horizontal"
        pagination={{
          pageSize: 5,
        }}
        dataSource={dataSource}
        renderItem={(cluster: string[]) => (
          <div className={styles.cluster}>
            <div className={styles.item}>
              {cluster.map((item: string, index: number) => (
                <div key={index} className={styles.cell}>
                  {item}
                </div>
              ))}
            </div>
            <Button type="primary" onClick={() => handleDelete((cluster as any).id)}>
              Delete
            </Button>
          </div>
        )}
      />
      <Button onClick={handleClick} className={styles.btn}>
        查询
      </Button>
    </div>
  );
};

export default Clusters;
