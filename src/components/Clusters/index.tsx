import styles from "./index.less";
import { Button, Card, List } from "antd";
import { httpRequest } from "@/services";
import {
  fdlist,
  fdmap,
  NODE_NAME_CARD,
  statlist,
  statmap,
  tdlist,
  tdmap,
  tmap,
} from "@/constants";
import { useContext, useMemo } from "react";
import { RootContext } from "@/store";
import { CloseOutlined } from "@ant-design/icons";
export interface IClustersProps {
  clusters: string[][];
  setClusters: (clusters: string[][]) => void;
  setGraphData: (graphData: any) => void;
  setVisList: (visList: any[]) => void;
}

const Clusters: React.FC<IClustersProps> = (props) => {
  const { clusters, setClusters, setGraphData, setVisList } = props;

  const store = useContext(RootContext);

  // fetch search
  const fetchSearch = () => {
    httpRequest
      .post("/search", {
        dim_clusters: clusters,
        vlist: store?.rootState?.vlist ?? [],
        tlist: (store?.rootState?.tlist ?? []).map(
          (titem) => (tmap as any)[titem]
        ),
        slist: {
          ...tdlist.reduce(
            (prev, cur) => ({
              ...prev,
              [(tdmap as any)[cur]]: store?.rootState?.tdlist.includes(cur),
            }),
            {}
          ),
          ...fdlist.reduce(
            (prev, cur) => ({
              ...prev,
              [(fdmap as any)[cur]]: store?.rootState?.fdlist.includes(cur),
            }),
            {}
          ),
          ...statlist.reduce(
            (prev, cur) => ({
              ...prev,
              [(statmap as any)[cur]]: store?.rootState?.statlist.includes(cur),
            }),
            {}
          ),
        },
      })
      .then((res: any) => {
        const data = res?.data ?? {};
        const nodes = ((data?.nodes ?? []) as any[]).map((node) => ({
          ...node,
          type: NODE_NAME_CARD,
        }));
        const edges = (data?.edges ?? []) as any[];
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

  const dataSource = useMemo(
    () =>
      clusters.map((cluster, id: number) => {
        const newCluster = [...cluster] as any;
        newCluster.id = id;
        return newCluster;
      }),
    [clusters]
  );

  const handleDelete = (id: number) => {
    const newClusters = dataSource.filter((cluster: any) => cluster.id !== id);
    setClusters(newClusters);
  };

  return (
    <Card title="Attribute Groups" className={styles.card}>
      <div className={styles.clusters}>
        <List
          itemLayout="horizontal"
          pagination={{
            pageSize: 5,
            size: 'small'
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
              <CloseOutlined
                  onClick={() => handleDelete((cluster as any).id)}
                />
            </div>
          )}
        />
        <Button onClick={handleClick} className={styles.btn}>
          Query
        </Button>
      </div>
    </Card>
  );
};

export default Clusters;
