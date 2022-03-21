import styles from "./index.less";
import { Button, Card, List, Drawer, Collapse } from "antd";
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
  vlist,
  tlist,
} from "@/constants";
import cn from "classnames";
import { useContext, useMemo, useState } from "react";
import { RootContext } from "@/store";
import CheckBox from "../CheckBox";
import { CloseOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
export interface IClustersProps {
  clusters: string[][];
  setClusters: (clusters: string[][]) => void;
  setGraphData: (graphData: any) => void;
  setVisList: (visList: any[]) => void;
  editing: boolean;
  setEditing: (editing: boolean) => void;
}

const Clusters: React.FC<IClustersProps> = (props) => {
  const {
    clusters,
    setClusters,
    setGraphData,
    setVisList,
    editing,
    setEditing,
  } = props;

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

  const handleEdit = () => {
    setEditing(!editing);
  };

  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  const openDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <Card
      title="Attribute Groups"
      className={styles.card}
      extra={
        <Button type={!editing ? "primary" : "default"} onClick={handleEdit}>
          {!editing ? "Edit Groups" : "Cancel Edit"}
        </Button>
      }
    >
      <Drawer
        title="Menu Checkbox"
        placement="left"
        onClose={closeDrawer}
        visible={drawerVisible}
        size="large"
      >
        <div className={styles.drawer}>
          <CheckBox
            className={cn({
              [styles.vislist]: true,
              [styles.baselist]: true,
            })}
            desc="VIS"
            options={vlist}
            value={store?.rootState?.vlist ?? []}
            onChange={(checkedValue: string[]) => {
              store?.setRootState({
                ...(store?.rootState ?? {}),
                vlist: checkedValue,
              });
            }}
          />
          <CheckBox
            className={cn({
              [styles.tlist]: true,
              [styles.baselist]: true,
            })}
            desc="transformation"
            options={tlist}
            value={store?.rootState?.tlist ?? []}
            onChange={(checkedValue: string[]) => {
              store?.setRootState({
                ...(store?.rootState ?? {}),
                tlist: checkedValue,
              });
            }}
          />
          <div
            className={cn({
              [styles.score]: true,
              [styles.baselist]: true,
            })}
          >
            <p className={styles.desc}>Score: </p>
            <div className={styles.main}>
              <CheckBox
                className={cn({
                  [styles.tdlist]: true,
                  [styles.baselist]: true,
                })}
                desc="2-dimension"
                options={tdlist}
                value={store?.rootState?.tdlist ?? []}
                onChange={(checkedValue: string[]) => {
                  store?.setRootState({
                    ...(store?.rootState ?? {}),
                    tdlist: checkedValue,
                  });
                }}
              />
              <CheckBox
                className={cn({
                  [styles.fdlist]: true,
                  [styles.baselist]: true,
                })}
                desc="1-dimension"
                options={fdlist}
                value={store?.rootState?.fdlist ?? []}
                onChange={(checkedValue: string[]) => {
                  store?.setRootState({
                    ...(store?.rootState ?? {}),
                    fdlist: checkedValue,
                  });
                }}
              />
              <CheckBox
                className={cn({
                  [styles.stat]: true,
                  [styles.baselist]: true,
                })}
                desc="statistics"
                options={statlist}
                value={store?.rootState?.statlist ?? []}
                onChange={(checkedValue: string[]) => {
                  store?.setRootState({
                    ...(store?.rootState ?? {}),
                    statlist: checkedValue,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </Drawer>
      <div className={styles.clusters}>
        {/* <List
          itemLayout="horizontal"
          pagination={false}
          dataSource={dataSource}
          renderItem={(cluster: string[]) => (
            
          )}
        /> */}
        <Collapse>
          {dataSource.map((cluster: any, index: number) => (
            <Panel
              key={index}
              header={"Group" + index}
              extra={
                editing ? (
                  <CloseOutlined
                    onClick={() => handleDelete((cluster as any).id)}
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
      </div>
      <div className={styles.btns}>
        <Button onClick={openDrawer} type="primary" className={styles.btn}>
          Config
        </Button>
        <Button
          onClick={handleClick}
          type="primary"
          danger
          className={styles.btn}
        >
          Query
        </Button>
      </div>
    </Card>
  );
};

export default Clusters;
