import styles from "./index.less";
import { Button, List } from "antd";
import { httpRequest } from "@/services";
import { NODE_NAME_CARD } from "@/constants";
export interface IClustersProps {
  clusters: string[][];
  setGraphData: (graphData: any) => void;
}

const Clusters: React.FC<IClustersProps> = (props) => {
  const { clusters, setGraphData } = props;

  // fetch search
  const fetchSearch = () => {
    httpRequest
      .post("/search")
      .then((res: any) => {
        const data = res?.data ?? {};
        const nodes = ((data?.nodes ?? []) as any[]).map(node => ({...node, type: NODE_NAME_CARD}));
        const edges = ((data?.edges ?? []) as any[]).map(edge => ({source: edge.from, target: edge.to}));
        const graphData = {
          nodes,
          edges
        };
        setGraphData(graphData);
      })
      .catch((err) => {
        console.error("err: ", err);
      });
  };

  const handleClick = () => {
    fetchSearch();
  };

  return (
    <div className={styles.clusters}>
      <List
        itemLayout="vertical"
        pagination={{
          pageSize: 5,
        }}
        dataSource={clusters}
        renderItem={(cluster: string[]) => (
          <div className={styles.cluster}>
            {cluster.map((item: string, index: number) => (
              <div key={index} className={styles.cell}>
                {item}
              </div>
            ))}
          </div>
        )}
      />
      <Button onClick={handleClick} className={styles.btn}>查询</Button>
    </div>
  );
};

export default Clusters;
