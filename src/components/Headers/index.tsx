import styles from "./index.less";
import React, { memo, useEffect, useRef, useState } from "react";
import Ellipsis from "@/components/Ellipsis";
import { initial_list } from "@/constants";
import { Table } from "antd";
import cn from "classnames";
export interface IListProps {
  data: any[];
  desc: string;
}

const List: React.FC<IListProps> = (props) => {
  const { data, desc } = props;
  return (
    <>
      <div style={{ flexShrink: 0 }} className={styles.itemDesc}>
        {desc}
      </div>
      <div className={styles.list}>
        {data.map((item: string) => (
          <div key={item} className={styles.column}>
            <Ellipsis text={item} max_len={100} />
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
      <div className={styles.itemDesc}>{desc}</div>
      <div style={{ overflowX: "auto" }}>{text}</div>
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
      <div className={styles.itemDesc}>{desc}</div>
      <div className={styles.list}>
        {keys.map((key: string) => (
          <div key={key} className={styles.column}>
            <div>{key}-</div>
            <Ellipsis text={data[key]} max_len={100} />
          </div>
        ))}
      </div>
    </>
  );
};

export interface IHeadersProps {
  data: any;
  className?: string;
}

const Headers: React.FC<IHeadersProps> = (props) => {
  const { data, className = '' } = props;

  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const dom = contentRef.current as HTMLDivElement;
    const callback = function (event: Event) {
      event.preventDefault();
      return false;
    };
    dom.addEventListener("contextmenu", callback);

    return () => {
      dom.removeEventListener("contextmenu", callback);
    };
  }, []);

  const headerList = data?.data["headers"] ?? [];
  const T = data?.data["T"] ?? "";

  return (
    <div
      className={cn({
        [styles.content]: true,
        nowheel: true,
      })}
      ref={contentRef}
    >
      <div className={cn({
        [styles.headers]: true,
        [className]: true
      })}>
        <Table
          className={styles.table}
          rowClassName={styles.row}
          rowKey={(record: any) => record.index}
          columns={[
            {
              title: "Attribute",
              dataIndex: "Attribute",
              key: "Attribute",
              className: styles.attribute,
              render: (item: any) => {
                return <span className={styles.row}>{item}</span>;
              },
            },
          ]}
          dataSource={headerList.map((item: string, index: number) => ({
            Attribute: item,
            index,
          }))}
          pagination={false}
        />
      </div>
      <div className={styles.T}>{T}</div>
      <div className={styles.args}>
        {initial_list
          .filter((item) => !(item === "headers" || item === "T"))
          .map((key) => {
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
    </div>
  );
};

export default memo(Headers);
