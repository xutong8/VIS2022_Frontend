import styles from "./index.less";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
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
  tmap,
} from "@/constants";
import Modal from "antd/lib/modal/Modal";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  InputNumber,
  Select,
  Radio,
  RadioChangeEvent,
  Checkbox,
  Form,
  Input,
  Button,
  Space,
  Popover,
} from "antd";
import cn from "classnames";
import { httpRequest } from "@/services";
import { CloseOutlined } from "@ant-design/icons";
import { ChartTypeContext } from "@/store/chartType";

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
            <Ellipsis text={data[key]} max_len={100} />
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
    setArgs([]);
  };

  const handleOk = () => {
    const getPara = () => {
      if (tlist.includes(action)) {
        if (action.toUpperCase() === "DBSCAN") {
          return {
            eps: val1,
            min_samples: val2,
          };
        } else {
          return {
            n_components: val1,
          };
        }
      } else {
        const kwargs = (kwargsRef.current?.getFieldsValue(true)?.kwargs ??
          []) as any[];

        return {
          i_type: itype,
          i: headers,
          o_type: otype,
          args,
          kwargs: kwargs.reduce(
            (prev, cur) => ({ ...prev, [cur.key]: cur.value }),
            {}
          ),
        };
      }
    };

    httpRequest
      .post("/addT", {
        pid: data?.id ?? "",
        t: tlist.includes(action) ? (tmap as any)[action] : action,
        para: getPara(),
      })
      .then((res: any) => {
        const setGraphData = data.setGraphData;
        const graphData = res?.data?.result ?? {};
        const highlight = res?.data?.highlight ?? "";
        const nodes = graphData?.nodes ?? [];
        const newNodes = nodes.map((node: any) => ({
          ...node,
          stress: node.id === highlight,
        }));
        graphData.nodes = newNodes;
        setGraphData(graphData);
      })
      .finally(() => {
        setModalVisible(false);
        reset();
      });
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

  const [args, setArgs] = useState<any[]>([]);
  const handleArgsFinish = (args: string[]) => {
    setArgs(args);
  };

  const kwargsRef = useRef<any>(null);

  const [popVisible, setPopVisible] = useState<boolean>(false);

  const store = useContext(ChartTypeContext);
  const chartType = store?.chartType ?? "";
  const para = store?.para ?? {};
  const setPara = store?.setPara ?? (() => {});

  const renderChannel = () => {
    switch (chartType) {
      case "scatter":
        return (
          <>
            <Button
              type="primary"
              className={styles.btn}
              onClick={() => {
                setPara({
                  ...para,
                  xy: data?.id ?? "",
                });
                setPopVisible(false);
              }}
            >
              xy
            </Button>
            <Button
              type="ghost"
              className={styles.btn}
              onClick={() => {
                setPara({
                  ...para,
                  color: data?.id ?? "",
                });
                setPopVisible(false);
              }}
            >
              color
            </Button>
          </>
        );
      case "line":
        return (
          <>
            <Button
              type="ghost"
              className={styles.btn}
              onClick={() => {
                setPara({
                  ...para,
                  x: data?.id ?? "",
                });
                setPopVisible(false);
              }}
            >
              x
            </Button>
            <Button
              type="primary"
              className={styles.btn}
              onClick={() => {
                setPara({
                  ...para,
                  y: data?.id ?? "",
                });
                setPopVisible(false);
              }}
            >
              y
            </Button>
          </>
        );
      case "bar":
        return (
          <>
            <Button
              type="primary"
              className={styles.btn}
              onClick={() => {
                setPara({
                  ...para,
                  x: data?.id ?? "",
                });
                setPopVisible(false);
              }}
            >
              x
            </Button>
            <Button
              type="primary"
              className={styles.btn}
              onClick={() => {
                setPara({
                  ...para,
                  y: data?.id ?? "",
                });
                setPopVisible(false);
              }}
            >
              y
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  const popoverContent = (
    <div className={styles.popoverContent}>{renderChannel()}</div>
  );

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
                {action === "DBSCAN" ? (
                  <>
                    <div className={styles.paraItem}>
                      <div className={styles.desc}>eps: </div>
                      <InputNumber value={val1} onChange={handleVal1Change} />
                    </div>
                    <div className={styles.paraItem}>
                      <div className={styles.desc}>min_samples: </div>
                      <InputNumber value={val2} onChange={handleVal2Change} />
                    </div>
                  </>
                ) : (
                  <div className={styles.paraItem}>
                    <div className={styles.desc}>n_components: </div>
                    <InputNumber value={val1} onChange={handleVal1Change} />
                  </div>
                )}
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
                <div
                  className={styles.paraItem}
                  style={{ flexDirection: "column", alignItems: "normal" }}
                >
                  <div className={styles.desc} style={{ margin: "12px 0" }}>
                    args:{" "}
                  </div>
                  <Form name="args_form" onValuesChange={handleArgsFinish}>
                    <Form.List
                      name="args"
                      rules={[
                        {
                          validator: async (_, args) => {
                            if (!args || args.length < 1) {
                              return Promise.reject(
                                new Error("At least 1 args")
                              );
                            }
                          },
                        },
                      ]}
                    >
                      {(fields, { add, remove }, { errors }) => (
                        <>
                          {fields.map((field, index) => (
                            <Form.Item required={false} key={field.key}>
                              <Form.Item
                                {...field}
                                validateTrigger={["onChange", "onBlur"]}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message: "Please input an arg",
                                  },
                                ]}
                                noStyle
                              >
                                <Input
                                  placeholder="arg value"
                                  style={{ width: "60%" }}
                                />
                              </Form.Item>
                              {fields.length > 1 ? (
                                <MinusCircleOutlined
                                  onClick={() => remove(field.name)}
                                />
                              ) : null}
                            </Form.Item>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              style={{ width: "60%" }}
                              icon={<PlusOutlined />}
                            >
                              Add field
                            </Button>
                            <Form.ErrorList errors={errors} />
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </Form>
                </div>
                <div
                  className={styles.paraItem}
                  style={{ flexDirection: "column", alignItems: "normal" }}
                >
                  <div className={styles.desc} style={{ margin: "12px 0" }}>
                    kwargs:{" "}
                  </div>
                  <Form name="kwargs_form" ref={kwargsRef} autoComplete="off">
                    <Form.List name="kwargs">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <Space
                              key={key}
                              style={{ display: "flex", marginBottom: 8 }}
                              align="baseline"
                            >
                              <Form.Item
                                {...restField}
                                name={[name, "key"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing key",
                                  },
                                ]}
                              >
                                <Input placeholder="key" />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, "value"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing value",
                                  },
                                ]}
                              >
                                <Input placeholder="value" />
                              </Form.Item>
                              <MinusCircleOutlined
                                onClick={() => remove(name)}
                              />
                            </Space>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Add field
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </Form>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
      <Popover
        visible={popVisible}
        title={
          <div className={styles.popoverTitle}>
            <div>Please choose a channel</div>
            <CloseOutlined
              className={styles.close}
              onClick={() => setPopVisible(false)}
            />
          </div>
        }
        content={popoverContent}
      >
        <div
          className={cn({
            [styles.content]: true,
            nowheel: true,
          })}
          ref={contentRef}
          onDoubleClick={handleDoubleClick}
          onContextMenu={(event) => {
            setPopVisible(true);
          }}
        >
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
      </Popover>
      <Handle
        type="source"
        /*@ts-ignore*/
        position="right"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default memo(Headers);
