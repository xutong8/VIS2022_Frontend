import styles from "./index.less";
import { List } from "antd";
export interface IClustersProps {
  clusters: string[][];
}

const Clusters: React.FC<IClustersProps> = (props) => {
  const { clusters } = props;
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
              <div key={index} className={styles.cell}>{item}</div>
            ))}
          </div>
        )}
      />
    </div>
  );
};

export default Clusters;
