import React from "react";
import styles from "./index.less";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

export interface IEllipsisProps {
  text: string;
}

const Ellipsis: React.FC<IEllipsisProps> = (props) => {
  const text = String(props.text);

  return (
    <div style={{ whiteSpace: "nowrap" }}>
      {text.length < 5 ? (
        text
      ) : (
        <Tooltip title={text}>
          <span style={{ margin: "0 2px" }}>{text.slice(0, 5)}</span>
          <QuestionCircleOutlined />
        </Tooltip>
      )}
    </div>
  );
};

export default Ellipsis;
