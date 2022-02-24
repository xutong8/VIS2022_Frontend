import styles from "./index.less";
import { Button, List } from "antd";
import { httpRequest } from "@/services";
export interface IClustersProps {
  clusters: string[][];
}

const Clusters: React.FC<IClustersProps> = (props) => {
  const { clusters } = props;

  // fetch search
  const fetchSearch = () => {
    httpRequest
      .post("/search")
      .then((res: any) => {
        console.log("res: ", res);
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
