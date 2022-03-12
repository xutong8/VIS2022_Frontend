import styles from "./index.less";
import { Table, Upload } from "antd";
import { useState } from "react";
import cn from "classnames";
import { UploadChangeParam } from "antd/lib/upload";
import { clustersMerge } from "@/utils";
import Ellipsis from "../Ellipsis";
import { BASE_URL } from "@/services";

export interface IDataSource {
  headers: string[];
  body: string[][];
}

export interface IFileUploadTableProps {
  setClusters: (clusters: string[][]) => void;
}

const FileUploadTable: React.FC<IFileUploadTableProps> = (props) => {
  const { setClusters } = props;
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
    if (headers && headers.length === 0) return [];
    return body.map((record) => {
      const newRecord = record.reduce(
        (prev, cur, columnIndex) => ({ ...prev, [headers[columnIndex]]: cur }),
        {}
      );
      return newRecord;
    });
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
            dataSource={mapBodyToRows(
              dataSource?.headers ?? [],
              dataSource?.body ?? []
            )}
            pagination={{
              pageSize: 5,
            }}
            scroll={{
              x: 1600,
            }}
            rowKey={(record: any, index: any) => index}
          />
        )}
        {!dataSource && "请上传数据"}
      </div>
    </div>
  );
};

export default FileUploadTable;
