import styles from "./index.less";
import { Checkbox } from "antd";
import cn from "classnames";

const { Group } = Checkbox;

export interface ICheckBoxProps {
  options: any[];
  value: any[];
  onChange: (checkedValue: any[]) => void;
  desc: string;
  className?: string;
}

const CheckBox: React.FC<ICheckBoxProps> = (props) => {
  const { options, value, onChange, className = "", desc } = props;

  return (
    <div
      className={cn({
        [styles.checkbox]: true,
        [className]: true,
      })}
    >
      <div className={styles.desc}>{desc}: </div>
      <Group options={options} value={value} onChange={onChange} />
    </div>
  );
};

export default CheckBox;
