import React from "react";
import styles from "./index.less";
import { Tooltip } from "antd";

export interface IEllipsisProps {
  text: string;
  max_len?: number;
}

const Ellipsis: React.FC<IEllipsisProps> = (props) => {
  const text = String(props.text);
  const { max_len = 5 } = props;

  return (
    <div style={{ whiteSpace: "nowrap" }}>
      {text.length < max_len ? (
        text
      ) : (
        <Tooltip title={text}>
          <span style={{ margin: "0 2px" }}>{text.slice(0, max_len)}</span>
          ...
        </Tooltip>
      )}
    </div>
  );
};

export default Ellipsis;
