import { useState } from "react";
import { RiCalendarLine, RiArrowDownSLine } from "react-icons/ri";
import { useTaskStore } from "../../../../domain/task/store";

export const DateFilter = () => {
  const { dateFilter, setDateFilter } = useTaskStore();
  const [isOpen, setIsOpen] = useState(false);

  const getFilterLabel = () => {
    switch (dateFilter) {
      case "today":
        return "오늘";
      case "week":
        return "이번 주";
      case "month":
        return "이번 달";
      case "custom":
        return "커스텀";
      default:
        return "오늘";
    }
  };

  const handleFilterChange = (
    filter: "today" | "week" | "month" | "custom"
  ) => {
    setDateFilter(filter);
    setIsOpen(false);
  };

  return (
    <div className="date-filter-container">
      <button
        className="date-filter-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <RiCalendarLine />
        <span>{getFilterLabel()}</span>
        <RiArrowDownSLine className={`arrow-icon ${isOpen ? "open" : ""}`} />
      </button>

      {isOpen && (
        <div className="date-filter-dropdown">
          <ul>
            <li>
              <button onClick={() => handleFilterChange("today")}>오늘</button>
            </li>
            <li>
              <button onClick={() => handleFilterChange("week")}>
                이번 주
              </button>
            </li>
            <li>
              <button onClick={() => handleFilterChange("month")}>
                이번 달
              </button>
            </li>
            <li>
              <button onClick={() => handleFilterChange("custom")}>
                커스텀...
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
