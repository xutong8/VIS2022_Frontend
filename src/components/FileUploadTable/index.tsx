import styles from "./index.less";
import { Table, Upload } from "antd";
import { useState } from "react";
import cn from "classnames";
import { UploadChangeParam } from "antd/lib/upload";

export interface IDataSource {
  headers: string[];
  body: string[][];
}

const FileUploadTable = () => {
  const [dataSource, setDataSource] = useState<IDataSource>();
  const handleChange = (info: UploadChangeParam) => {
    // TODO: 考虑上传的状态，分为uploading、done和error
    if (info.file.status === "done") {
      // const mockData = {
      //   headers: ["id", "name", "age", "address"],
      //   body: [
      //     ["22051100", "zhangsan1", "21", "Hang Zhou"],
      //     ["22051101", "zhangsan2", "22", "Shang Hai"],
      //     ["22051102", "zhangsan3", "23", "Bei Jing"],
      //     ["22051103", "zhangsan4", "24", "Su Zhou"],
      //   ],
      // };
      // setDataSource(mockData);
      const res = info.file.response ?? {};
      const columns = res?.columns ?? {};
      setDataSource(columns);
    }
  };

  const mapHeadersToColumns = (headers: string[]) => {
    return headers.map((header) => ({
      title: header,
      dataIndex: header,
      key: header,
      render(text: string) {
        return (
          <div>{text.length < 8 ? text : String(text).slice(0, 8)}</div>
        )
      }
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
          action="http://127.0.0.1:8000/gateway/upload"
          onChange={handleChange}
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
            className={styles.content}
            columns={mapHeadersToColumns(dataSource?.headers ?? [])}
            dataSource={mapBodyToRows(
              dataSource?.headers ?? [],
              dataSource?.body ?? []
            )}
            rowKey={(record: any, index: any) => index}
          />
        )}
        {!dataSource && "请上传数据"}
      </div>
    </div>
  );
};

export default FileUploadTable;
