import { RiListCheck, RiLayoutGridLine } from "react-icons/ri";
import { SegmentedControl } from "../../../ui/SegmentedControl";

interface ViewToggleProps {
  value: "list" | "matrix";
  onChange: (value: "list" | "matrix") => void;
}

export const ViewToggle = ({ value, onChange }: ViewToggleProps) => {
  const options = [
    { value: "list", label: "리스트", icon: <RiListCheck /> },
    { value: "matrix", label: "매트릭스", icon: <RiLayoutGridLine /> },
  ];

  return (
    <SegmentedControl
      options={options}
      value={value}
      onChange={(val) => onChange(val as "list" | "matrix")}
      ariaLabel="할 일 보기 방식"
    />
  );
};
