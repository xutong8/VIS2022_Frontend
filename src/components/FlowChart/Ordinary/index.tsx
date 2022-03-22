import { memo } from "react";
import styles from "./index.less";
import { Handle } from "react-flow-renderer";

const Ordinary = ({
  data,
  isConnectable,
}: {
  data: any;
  isConnectable: any;
}) => {
  const isRoot = data?.isRoot ?? false;
  const title = data?.title ?? "";
  const newAttributes = data?.newAttributes ?? 0;

  return (
    <>
      <Handle
        type="target"
        /*@ts-ignore*/
        position="left"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
      <div className={styles.ordinary}>
        {isRoot ? (
          "Source Table"
        ) : (
          <>
            <div>{title}</div>
            <div>
              <span>new attributes: </span>
              <span>{newAttributes}</span>
            </div>
          </>
        )}
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

export default memo(Ordinary);
