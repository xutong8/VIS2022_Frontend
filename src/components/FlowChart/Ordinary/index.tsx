import { memo } from "react";
import styles from "./index.less";
import { Handle } from "react-flow-renderer";

const Ordinary = (props: {
  data: any;
  isConnectable: any;
  sourcePosition: string;
  targetPosition: string;
}) => {
  const { data, isConnectable, sourcePosition, targetPosition } = props;
  const isRoot = data?.isRoot ?? false;
  const title = data?.title ?? "";
  const newAttributes = data?.newAttributes ?? 0;

  return (
    <>
      <Handle
        type="target"
        /*@ts-ignore*/
        position={targetPosition}
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
        position={sourcePosition}
        style={{ top: 10, background: "#555" }}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default memo(Ordinary);
