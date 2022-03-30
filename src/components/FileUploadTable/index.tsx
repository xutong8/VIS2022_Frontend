import styles from "./index.less";
import { Table, Upload, Button, Card, Empty } from "antd";
import cn from "classnames";
import { UploadChangeParam } from "antd/lib/upload";
import Ellipsis from "../Ellipsis";
import { BASE_URL } from "@/services";
import { UploadOutlined } from "@ant-design/icons";
import { IDataSource } from "../BasicLayout";

export interface IFileUploadTableProps {
  setClusters: (clusters: string[][]) => void;
  clusters: string[][];
  editing: boolean;
  selectedRowKeys: any[];
  handleSelectionChange: (selectedRowKeys: any[]) => void;
  dataSource?: IDataSource;
  setDataSource: (dataSource: IDataSource) => void;
  tableBody: any[];
}

const FileUploadTable: React.FC<IFileUploadTableProps> = (props) => {
  const {
    setClusters,
    clusters,
    editing,
    selectedRowKeys,
    handleSelectionChange,
    dataSource = {} as IDataSource,
    setDataSource,
    tableBody,
  } = props;

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

  const hasSelected = selectedRowKeys.length > 0;
  const columns = mapHeadersToColumns(dataSource?.headers ?? []);

  return (
    <>
      <Card
        className={styles.card}
        title={
          <div className={styles.title}>
            <span style={{ fontSize: 25 }}>Data Table</span>
          </div>
        }
      >
        <div className={styles.container}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <p className={styles.right}>
              <span>rows: {tableBody.length}</span>
              <span style={{ marginLeft: 8 }}>columns: {columns.length}</span>
            </p>
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
          </div>
          <div
            className={cn({
              [styles.content]: true,
              [styles.bordered]: !dataSource,
            })}
          >
            {dataSource && (
              <Table
                className={styles.table}
                columns={columns}
                dataSource={tableBody}
                rowSelection={
                  editing
                    ? {
                        selectedRowKeys,
                        onChange: handleSelectionChange,
                      }
                    : undefined
                }
                size="small"
                pagination={false}
                scroll={{
                  x: 1000,
                }}
                rowKey={(record: any) => record.id}
              />
            )}
            {!dataSource && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          </div>
          <div className={styles.add}>
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
