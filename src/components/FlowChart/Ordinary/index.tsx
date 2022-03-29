import { memo, useContext } from "react";
import styles from "./index.less";
import { Handle } from "react-flow-renderer";
import { RootContext } from "@/store";
import { tvmap } from "@/constants";
import cn from "classnames";
import { rank, select, sum, dmT } from "@/assets";

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
  const title = (isIncluded ? (tvmap as any)[T] : T.split(" ")[0]) as string;

  const getImg = () => {
    const titleLowerCase = title.toLowerCase();
    switch (titleLowerCase) {
      case "rank": {
        return rank;
      }
      case "select": {
        return select;
      }
      case "sum": {
        return sum;
      }
      default: {
        return dmT;
      }
    }
  };

  return (
    <>
      <Handle
        type="target"
        /*@ts-ignore*/
        position={targetPosition}
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
      <div
        className={cn({
          [styles.ordinary]: true,
          [styles.root]: isRoot,
        })}
      >
        {isRoot ? (
          "Source Table"
        ) : (
          <>
            <div className={styles.title}>
              <img src={getImg()} alt="icon" className={styles.icon} />
              <span>{title}</span>
            </div>
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
