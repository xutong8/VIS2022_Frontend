import styles from "./index.less";
import React, { memo, useState } from "react";
import Ellipsis from "../../Ellipsis";
import { Handle } from "react-flow-renderer";
import {
  actions,
  default_action,
  default_i_type,
  default_o_type,
  initial_list,
  i_types,
  o_types,
  tlist,
} from "@/constants";
import Modal from "antd/lib/modal/Modal";
import { InputNumber, Select, Radio, RadioChangeEvent, Checkbox } from "antd";

const { Option } = Select;
const { Group } = Radio;
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
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // reset states
  const reset = () => {
    setAction(default_action);
    setVal1(0);
    setVal2(0);
    setItype(default_i_type);
    setHeaders(initialHeaders);
    setLikeTypes(intitalLikeTypes);
    setOtype(default_o_type);
  };

  const handleOk = () => {
    setModalVisible(false);
    reset();
  };

  const handleCancel = () => {
    setModalVisible(false);
    reset();
  };

  const handleDoubleClick = () => {
    setModalVisible(true);
  };

  const [action, setAction] = useState<string>(default_action);

  const handleActionChange = (action: string) => {
    setAction(action);
  };

  // key1
  const [val1, setVal1] = useState<number>(0);
  // key2
  const [val2, setVal2] = useState<number>(0);
  // val1 change
  const handleVal1Change = (val1: number) => {
    setVal1(val1);
  };
  // val2 change
  const handleVal2Change = (val2: number) => {
    setVal2(val2);
  };

  // i_type
  const [itype, setItype] = useState<string>(default_i_type);

  const handeItypeChange = (e: RadioChangeEvent) => {
    setItype(e.target.value);
  };

  const handleHeadersChange = (headers: any[]) => {
    setHeaders(headers);
  };

  const handleLikeTypesChange = (likeTypes: any[]) => {
    setLikeTypes(likeTypes);
  };

  const renderParaI = () => {
    switch (itype) {
      case "==": {
        return (
          <div className={styles.paraItem}>
            <div className={styles.desc} style={{ flexShrink: 0 }}>
              I:{" "}
            </div>
            <div className={styles.content}>
              <Checkbox.Group
                options={initialHeaders}
                value={headers}
                onChange={handleHeadersChange}
              />
            </div>
          </div>
        );
      }
      case "like": {
        return (
          <div className={styles.paraItem}>
            <div className={styles.desc} style={{ flexShrink: 0 }}>
              I:{" "}
            </div>
            <div className={styles.content}>
              <Checkbox.Group
                options={intitalLikeTypes}
                value={likeTypes}
                onChange={handleLikeTypesChange}
              />
            </div>
          </div>
        );
      }
      default:
        return null;
    }
  };

  const initialHeaders = data?.data?.["headers"] ?? [];
  const [headers, setHeaders] = useState<any[]>(initialHeaders);
  const intitalLikeTypes = ["int", "float"];
  const [likeTypes, setLikeTypes] = useState<any[]>(intitalLikeTypes);

  // o_type
  const [otype, setOtype] = useState<string>(default_o_type);

  // o_type change
  const handleOtypeChange = (e: RadioChangeEvent) => {
    setOtype(e.target.value);
  };

  return (
    <>
      <Handle
        type="target"
        /*@ts-ignore*/
        position="left"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
      <Modal
        title="Add an action"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={styles.modal}>
          <div className={styles.actionlist}>
            <div className={styles.desc}>Actions: </div>
            <Select
              value={action}
              onChange={handleActionChange}
              className={styles.select}
            >
              {actions.map((action: string) => (
                <Option value={action} key={action}>
                  {action}
                </Option>
              ))}
            </Select>
          </div>
          <div className={styles.para}>
            {tlist.includes(action) ? (
              <>
                <div className={styles.paraItem}>
                  <div className={styles.desc}>Key1: </div>
                  <InputNumber value={val1} onChange={handleVal1Change} />
                </div>
                <div className={styles.paraItem}>
                  <div className={styles.desc}>Key2: </div>
                  <InputNumber value={val2} onChange={handleVal2Change} />
                </div>
              </>
            ) : (
              <>
                <div className={styles.paraItem}>
                  <div className={styles.desc}>i_type: </div>
                  <Group value={itype} onChange={handeItypeChange}>
                    {i_types.map((item: string) => (
                      <Radio value={item} key={item}>
                        {item}
                      </Radio>
                    ))}
                  </Group>
                </div>
                {renderParaI()}
                <div className={styles.paraItem}>
                  <div className={styles.desc}>o_type: </div>
                  <Group value={otype} onChange={handleOtypeChange}>
                    {o_types.map((item: string) => (
                      <Radio value={item} key={item}>
                        {item}
                      </Radio>
                    ))}
                  </Group>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
      <div className={styles.content} onDoubleClick={handleDoubleClick}>
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
