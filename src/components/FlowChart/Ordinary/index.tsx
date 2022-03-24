import { memo, useContext } from "react";
import styles from "./index.less";
import { Handle } from "react-flow-renderer";
import { RootContext } from "@/store";
import { tvmap } from "@/constants";

const Ordinary = (props: {
  data: any;
  isConnectable: any;
  sourcePosition: string;
  targetPosition: string;
}) => {
  const { data, isConnectable, sourcePosition, targetPosition } = props;
  const isRoot = data?.isRoot ?? false;
  const newAttributes = data?.newAttributes ?? 0;
  const T = data?.data?.T ?? "";
  const store = useContext(RootContext);
  const tvlist = store?.rootState?.tvlist ?? [];
  const isIncluded = tvlist.includes(T);
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
            <div>{isIncluded ? (tvmap as any)[T] : T}</div>
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
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default memo(Ordinary);
