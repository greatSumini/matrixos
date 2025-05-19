import { useId } from "react";

interface SegmentedControlOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  name?: string;
  ariaLabel?: string;
}

export const SegmentedControl = ({
  options,
  value,
  onChange,
  name,
  ariaLabel = "뷰 옵션",
}: SegmentedControlProps) => {
  const id = useId();

  return (
    <div role="tablist" aria-label={ariaLabel} className="segmented-control">
      {options.map((option) => {
        const isSelected = option.value === value;
        const optionId = `${id}-${option.value}`;

        return (
          <button
            key={option.value}
            id={optionId}
            role="tab"
            aria-selected={isSelected}
            aria-controls={`${option.value}-panel`}
            tabIndex={isSelected ? 0 : -1}
            className={`segment-button ${isSelected ? "selected" : ""}`}
            onClick={() => onChange(option.value)}
            name={name}
            value={option.value}
          >
            {option.icon && <span className="segment-icon">{option.icon}</span>}
            <span className="segment-label">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};
