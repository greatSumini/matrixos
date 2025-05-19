import { useTaskStore } from "../../../../domain/task/store";
import { TaskList } from "../components/TaskList";
import "./TasksPage.css";

export const TasksPage = () => {
  const view = useTaskStore((state) => state.view);
  const setView = useTaskStore((state) => state.setView);

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <h1>할 일</h1>
        <div className="view-toggle">
          <button
            className={view === "list" ? "active" : ""}
            onClick={() => setView("list")}
          >
            리스트
          </button>
          <button
            className={view === "matrix" ? "active" : ""}
            onClick={() => setView("matrix")}
          >
            매트릭스
          </button>
        </div>
      </div>

      <div className="tasks-content">
        {view === "list" ? (
          <TaskList />
        ) : (
          <div className="matrix-view">
            <p>매트릭스 뷰 (구현 예정)</p>
          </div>
        )}
      </div>
    </div>
  );
};
