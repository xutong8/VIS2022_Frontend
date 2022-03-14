import styles from "./index.less";
import React, { memo } from "react";
import Ellipsis from "../../Ellipsis";
import { Handle } from "react-flow-renderer";
import { initial_list } from "@/constants";

export interface IListProps {
  data: any[];
  desc: string;
}

const List: React.FC<IListProps> = (props) => {
  const { data, desc } = props;
  return (
    <>
      <span>{desc}: </span>
      <div className={styles.list}>
        {data.map((item: string) => (
          <div key={item} className={styles.column}>
            <Ellipsis text={item} />
          </div>
        ))}
      </div>
    </>
  );
};

export interface ITextProps {
  text: string;
  desc: string;
}

const Text: React.FC<ITextProps> = (props) => {
  const { text, desc } = props;
  return (
    <>
      <span>{desc}: </span>
      <span>{text}</span>
    </>
  );
};

export interface IObjProps {
  data: any;
  desc: string;
}

const Obj: React.FC<IObjProps> = (props) => {
  const { desc, data } = props;
  const keys = Object.keys(data);
  return (
    <>
      <span>{desc}: </span>
      <div className={styles.list}>
        {keys.map((key: string) => (
          <div key={key} className={styles.column}>
            <div>{key}-</div>
            <Ellipsis text={data[key]} />
          </div>
        ))}
      </div>
    </>
  );
};

const Headers = ({
  data,
  isConnectable,
}: {
  data: any;
  isConnectable: any;
}) => {
  return (
    <>
      <Handle
        type="target"
        /*@ts-ignore*/
        position="left"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
      <div className={styles.content}>
        {initial_list.map((key) => {
          const item = data?.data?.[key];
          if (!item) return null;
          if (typeof item === "undefined") return null;
          if (Array.isArray(item) && item.length === 0) return null;
          if (typeof item === "object" && Object.keys(item).length === 0)
            return null;
          return (
            <div className={styles.item} key={key}>
              {typeof item === "string" && <Text desc={key} text={item} />}
              {Array.isArray(item) && <List desc={key} data={item} />}
              {typeof item === "object" && !Array.isArray(item) && (
                <Obj desc={key} data={item} />
              )}
            </div>
          );
        })}
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
