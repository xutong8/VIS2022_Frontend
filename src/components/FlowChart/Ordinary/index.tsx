import { memo, useContext } from "react";
import styles from "./index.less";
import { Handle } from "react-flow-renderer";
import { RootContext } from "@/store";
import { tvmap } from "@/constants";
import cn from 'classnames';

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
      <div className={cn({
        [styles.ordinary]: true,
        [styles.root]: isRoot
      })}>
        {isRoot ? (
          "Source Table"
        ) : (
          <>
            <div>{isIncluded ? (tvmap as any)[T] : T.split(" ")[0]}</div>
            <div>
              <span>{newAttributes}</span>
              <span style={{ fontSize: 56 }}>new</span>
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
