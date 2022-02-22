import styles from "./index.less";

export interface IClustersProps {
  clusters: string[][];
}

const Clusters: React.FC<IClustersProps> = (props) => {
  const { clusters } = props;
  return (
    <div className={styles.clusters}>
      {clusters.map((cluster: string[], clusterIndex: number) => (
        <div className={styles.cluster} key={clusterIndex}>
          {cluster.map((item: string, index: number) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Clusters;
