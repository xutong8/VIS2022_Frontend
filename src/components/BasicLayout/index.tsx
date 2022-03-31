import styles from "./index.less";
import FileUploadTable from "@/components/FileUploadTable";
import FlowChart from "@/components/FlowChart";
import Clusters from "@/components/Clusters";
import { useContext, useMemo, useState } from "react";
import ChartContainer from "../ChartContainer";
import cn from "classnames";
import CustomFlowChart from "../CustomFlowChart";
import { Button, Drawer } from "antd";
import { RootContext } from "@/store";
import { DoubleLeftOutlined } from '@ant-design/icons';
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
  configuration,
} from "@/constants";
import { httpRequest } from "@/services";
import CheckBox from "../CheckBox";
export interface IDataSource {
  headers: string[];
  body: string[][];
}

const BasicLayout = () => {
  const [clusters, setClusters] = useState<string[][]>([]);
  const [graphData, setGraphData] = useState<any>(null);
  const [visList, setVisList] = useState<any[]>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<IDataSource>();

  const mapBodyToRows = (headers: string[], body: string[][]) => {
    if (!headers) return [];
    if (headers && headers.length === 0) return [];
    return body.map((record, id) => {
      const newRecord = record.reduce(
        (prev, cur, columnIndex) => ({ ...prev, [headers[columnIndex]]: cur }),
        { id }
      );
      return newRecord;
    });
  };

  const tableBody = useMemo(
    () => mapBodyToRows(dataSource?.headers ?? [], dataSource?.body ?? []),
    [dataSource]
  );

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
  const [customCase, setCustomCase] = useState<number>(0);

  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const handleSelectionChange = (selectedRowKeys: any[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  const openDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

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
        setCustomCase(0);
      })
      .catch((err) => {
        console.error("err: ", err);
      });
  };

  const handleClick = () => {
    fetchSearch();
  };

  const store = useContext(RootContext);

  return (
    <div className={styles.layout}>
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
              {/* Configuration */}
              <CheckBox
                className={cn({
                  [styles.stat]: true,
                  [styles.baselist]: true,
                })}
                desc="configuration"
                options={configuration}
                value={store?.rootState?.configuration ?? []}
                onChange={(checkedValue: string[]) => {
                  store?.setRootState({
                    ...(store?.rootState ?? {}),
                    configuration: checkedValue,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </Drawer>
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
          selectedRowKeys={selectedRowKeys}
          handleSelectionChange={handleSelectionChange}
          dataSource={dataSource}
          setDataSource={setDataSource}
          tableBody={tableBody}
        />
        <Clusters
          clusters={clusters}
          setClusters={setClusters}
          editing={editing}
          setEditing={setEditing}
          selectedRowKeys={selectedRowKeys}
          tableBody={tableBody}
        />
        <Button onClick={openDrawer} icon={<DoubleLeftOutlined />} type="default" className={styles.btn}>
          Configure
        </Button>
        <Button
          onClick={handleClick}
          type="default"
          className={styles.btn}
        >
          Query
        </Button>
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
              customCase={customCase}
              setCustomCase={setCustomCase}
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
              title={
                <span style={{ fontSize: 25 }}>Transformation Overview</span>
              }
              extra={true}
              direction="TB"
            />
          </div>
          <div className={styles.bot}>
            {/* <FlowChart
              graphData={{
                nodes:
                  graphData?.nodes.filter((node: any) => node.stress).map((node: any) => ({...node, stress: false})) ?? [],
                edges:
                  graphData?.edges.filter((edge: any) => edge.stress).map((edge: any) => ({...edge, stress: false})) ?? [],
              }}
              title={<span style={{ fontSize: 25 }}>Transformation Path</span>}
              isSmooth={true}
              customLayout={true}
            /> */}

            <CustomFlowChart
              graphData={{
                nodes:
                  graphData?.nodes
                    .filter((node: any) => node.stress)
                    .map((node: any) => ({ ...node, stress: false })) ?? [],
                edges:
                  graphData?.edges
                    .filter((edge: any) => edge.stress)
                    .map((edge: any) => ({ ...edge, stress: false })) ?? [],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicLayout;
