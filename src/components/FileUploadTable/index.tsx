import styles from "./index.less";
import { Table, Upload, Button } from "antd";
import { useMemo, useState } from "react";
import cn from "classnames";
import { UploadChangeParam } from "antd/lib/upload";
import Ellipsis from "../Ellipsis";
import { BASE_URL } from "@/services";

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
    const newClusters = [...clusters, tableBody.filter((item: any) => selectedRowKeys.includes(item.id)).map((item: any) => item.attribute)];
    setClusters(newClusters);
  };

  return (
    <div className={styles.container}>
      <div className={styles.fileupload}>
        <Upload
          listType="picture-card"
          showUploadList={false}
          action={`${BASE_URL}/upload`}
          onChange={handleChange}
          className={styles.btn}
        >
          Upload
        </Upload>
      </div>
      <div className={styles.add}>
        <Button type="primary" onClick={handleAdd} disabled={!hasSelected}>
          Add
        </Button>
        <span className={styles.desc}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
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
            columns={mapHeadersToColumns(dataSource?.headers ?? [])}
            dataSource={tableBody}
            rowSelection={{
              selectedRowKeys,
              onChange: handleSelectionChange,
            }}
            pagination={{
              pageSize: 5,
            }}
            scroll={{
              x: 1600,
            }}
            rowKey={(record: any) => record.id}
          />
        )}
        {!dataSource && "请上传数据"}
      </div>
    </div>
  );
};

export default FileUploadTable;
