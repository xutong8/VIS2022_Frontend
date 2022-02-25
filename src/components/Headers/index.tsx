import styles from "./index.less";
import React, { memo } from "react";
import Ellipsis from "../Ellipsis";
import { Handle } from "react-flow-renderer";

export interface IHeadersProps {
  headers: string[];
}

const Headers = ({
  data,
  isConnectable,
}: {
  data: any;
  isConnectable: any;
}) => {
  console.log("data: ", data);
  return (
    <>
      <Handle
        type="target"
        /*@ts-ignore*/
        position="left"
        style={{ background: "#555" }}
        onConnect={(params: any) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div className={styles.headers}>
        {data?.data?.headers?.map((header: string) => (
          <div key={header} className={styles.header}>
            <Ellipsis text={header} />
          </div>
        ))}
      </div>
      <Handle
        type="source"
        /*@ts-ignore*/
        position="right"
        style={{ top: 10, background: "#555" }}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default memo(Headers);
