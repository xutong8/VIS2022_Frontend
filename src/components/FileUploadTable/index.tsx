import styles from "./index.less";
import { Table, Upload, Button, Drawer, Card } from "antd";
import { useContext, useMemo, useState } from "react";
import cn from "classnames";
import { UploadChangeParam } from "antd/lib/upload";
import Ellipsis from "../Ellipsis";
import { BASE_URL } from "@/services";
import { RootContext } from "@/store";
import CheckBox from "../CheckBox";
import { vlist, tlist, tdlist, fdlist, statlist } from "@/constants";
import { MenuOutlined, UploadOutlined } from "@ant-design/icons";

export interface IDataSource {
  headers: string[];
  body: string[][];
}

export interface IFileUploadTableProps {
  setClusters: (clusters: string[][]) => void;
  clusters: string[][];
}

const FileUploadTable: React.FC<IFileUploadTableProps> = (props) => {
  const { setClusters, clusters } = props;
  const [dataSource, setDataSource] = useState<IDataSource>();
  const handleChange = (info: UploadChangeParam) => {
    // TODO: 考虑上传的状态，分为uploading、done和error
    if (info.file.status === "done") {
      const res = info.file.response ?? {};
      const columns = res?.columns ?? {};
      setDataSource(columns);
      const dim_clusters = res?.dim_clusters ?? [];
      const sem_clusters = res?.sem_clusters ?? [];
      const clusters = [...dim_clusters, ...sem_clusters];
      setClusters(clusters);
    }
  };

  const mapHeadersToColumns = (headers: string[]) => {
    if (!headers) return [];
    if (headers && headers.length === 0) return [];
    const MAX_STR_LEN = 20;
    return headers.map((header) => ({
      title: header,
      dataIndex: header,
      key: header,
      width: 80,
      render(text: string) {
        return <Ellipsis text={text} max_len={MAX_STR_LEN} />;
      },
    }));
  };

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

  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const handleSelectionChange = (selectedRowKeys: any[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const tableBody = useMemo(
    () => mapBodyToRows(dataSource?.headers ?? [], dataSource?.body ?? []),
    [dataSource]
  );

  const hasSelected = selectedRowKeys.length > 0;

  const handleAdd = () => {
    const newClusters = [
      ...clusters,
      tableBody
        .filter((item: any) => selectedRowKeys.includes(item.id))
        .map((item: any) => item.attribute),
    ];
    setClusters(newClusters);
  };

  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  const openDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const store = useContext(RootContext);

  return (
    <>
      <div className={styles.menu}>
        <MenuOutlined onClick={openDrawer} />
      </div>
      <Card
        title="Data Table"
        extra={
          <div className={styles.fileupload}>
            <Upload
              showUploadList={false}
              action={`${BASE_URL}/upload`}
              onChange={handleChange}
              className={styles.btn}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </div>
        }
      >
        <div className={styles.container}>
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
                <div className={styles.content}>
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
          <div
            className={cn({
              [styles.content]: true,
              [styles.bordered]: !dataSource,
            })}
          >
            {dataSource && (
              <Table
                className={styles.table}
                columns={mapHeadersToColumns(dataSource?.headers ?? [])}
                dataSource={tableBody}
                rowSelection={{
                  selectedRowKeys,
                  onChange: handleSelectionChange,
                }}
                size="small"
                pagination={{
                  pageSize: 5,
                }}
                scroll={{
                  x: 1000,
                }}
                rowKey={(record: any) => record.id}
              />
            )}
            {!dataSource && "请上传数据"}
          </div>
          <div className={styles.add}>
            <Button type="primary" onClick={handleAdd} disabled={!hasSelected}>
              Add
            </Button>
            <span className={styles.desc}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
            </span>
          </div>
        </div>
      </Card>
    </>
  );
};

export default FileUploadTable;
