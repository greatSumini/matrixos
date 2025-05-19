import { useLocation } from "react-router-dom";
import { RiSearchLine, RiAddLine } from "react-icons/ri";
import { DateFilter } from "../features/tasks/components/DateFilter";
import { ViewToggle } from "../features/tasks/components/ViewToggle";
import { useTaskStore } from "../../domain/task/store";

export const Topbar = () => {
  const location = useLocation();
  const isTasksPage = location.pathname === "/tasks";
  const { view, setView } = useTaskStore();

  return (
    <div className="topbar">
      <div className="topbar-left">
        {isTasksPage && (
          <>
            <DateFilter />
            <ViewToggle value={view} onChange={setView} />
          </>
        )}
      </div>
      <div className="topbar-right">
        <button className="search-button" aria-label="전역 검색">
          <RiSearchLine />
          <span className="keyboard-shortcut">⌘K</span>
        </button>
        <button className="add-button" aria-label="새 항목 추가">
          <RiAddLine />
        </button>
      </div>
    </div>
  );
};
