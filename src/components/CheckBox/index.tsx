import styles from "./index.less";
import { Checkbox } from "antd";

const { Group } = Checkbox;

export interface ICheckBoxProps {
  options: any[];
  value: any[];
  onChange: (checkedValue: any[]) => void;
}

const CheckBox: React.FC<ICheckBoxProps> = (props) => {
  const { options, value, onChange } = props;

  return (
    <div className={styles.checkbox}>
      <Group options={options} value={value} onChange={onChange} />
    </div>
  );
};

export default CheckBox;
