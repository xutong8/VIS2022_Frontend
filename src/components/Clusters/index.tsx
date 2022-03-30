import styles from "./index.less";
import { Button, Card, Collapse } from "antd";
import cn from "classnames";
import { useMemo } from "react";
import { CloseOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
export interface IClustersProps {
  clusters: string[][];
  setClusters: (clusters: string[][]) => void;
  editing: boolean;
  setEditing: (editing: boolean) => void;
  selectedRowKeys: any[];
  tableBody: any[];
}

const Clusters: React.FC<IClustersProps> = (props) => {
  const {
    clusters,
    setClusters,
    editing,
    setEditing,
    selectedRowKeys,
    tableBody,
  } = props;

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

  const handleEdit = () => {
    setEditing(!editing);
  };

  const maxLen = Math.max(...dataSource.map((cluster) => cluster.length));
  const maxIdx = dataSource.findIndex((cluster) => cluster.length === maxLen);

  const getLargestCommonStr = (cluster: string[]) => {
    const items = cluster.map((cluster) => cluster.split(" "));
    const str = [];
    const len = items[0].length;
    for (let i = 0; i < len; i++) {
      let flag = true;
      for (let j = 0; j < items.length - 1; j++) {
        if (items[j][i] !== items[j + 1][i]) flag = false;
      }
      if (flag) str.push(items[0][i]);
    }
    return str.join(",");
  };

  const handleAdd = () => {
    const newClusters = [
      ...clusters,
      tableBody
        .filter((item: any) => selectedRowKeys.includes(item.id))
        .map((item: any) => item.attribute),
    ];
    setClusters(newClusters);
  };

  return (
    <Card
      title={
        <div className={styles.title}>
          <span style={{ fontSize: 25 }}>Attribute Group</span>
        </div>
      }
      className={styles.card}
    >
      <div className={styles.top}>
        <span className={styles.right}>count: {dataSource.length}</span>
        <div className={styles.btns}>
          <Button type="default" onClick={handleAdd}>
            Add
          </Button>
          <Button
            type={!editing ? "primary" : "default"}
            onClick={handleEdit}
            className={styles.edit}
          >
            {!editing ? "Edit Groups" : "Cancel Edit"}
          </Button>
        </div>
      </div>
      <div className={styles.clusters}>
        {dataSource.length !== 0 && (
          <Collapse>
            {dataSource.map((cluster: any, index: number) => (
              <Panel
                key={index}
                header={
                  <div>
                    <span style={{ marginRight: 4 }}>Group{index}</span>
                    <span
                      style={{
                        marginRight: 4,
                        fontStyle:
                          maxLen === cluster.length && maxIdx === index
                            ? "italic"
                            : "normal",
                      }}
                    >
                      {maxLen === cluster.length && maxIdx === index
                        ? "Dimension Matching"
                        : getLargestCommonStr(cluster)}
                    </span>
                    <span>Containing {cluster.length} attributes</span>
                  </div>
                }
                extra={
                  editing ? (
                    <CloseOutlined
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDelete((cluster as any).id);
                      }}
                    />
                  ) : null
                }
              >
                <div className={styles.cluster}>
                  <div className={styles.item}>
                    {cluster.map((item: string, index: number) => (
                      <div key={index} className={styles.cell}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>
            ))}
          </Collapse>
        )}
      </div>
    </Card>
  );
};

export default Clusters;
