import { useVirtualizer } from "@tanstack/react-virtual";
import { useTaskStore } from "../../../../domain/task/store";
import { useMemo, useRef } from "react";
import "./TaskList.css";

export const TaskList = () => {
  const _tasks = useTaskStore((state) => state.tasks);
  const parentRef = useRef<HTMLDivElement>(null);
  const isLoading = useTaskStore((state) => state.isLoading);
  const toggleComplete = useTaskStore((state) => state.toggleComplete);

  const tasks = useMemo(() => {
    return Object.values(_tasks);
  }, [_tasks]);

  const rowVirtualizer = useVirtualizer({
    count: tasks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60, // 각 항목 예상 높이 (px)
    overscan: 5,
  });

  if (isLoading) {
    return <div className="task-list-loading">로딩 중...</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>태스크가 없습니다. 새 태스크를 추가해 보세요!</p>
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      className="task-list-container"
      style={{ height: "100%", overflow: "auto" }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const task = tasks[virtualRow.index];
          return (
            <div
              key={task.id}
              className="task-item"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="task-checkbox">
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => toggleComplete(task.id)}
                  aria-label={`태스크 완료 상태: ${task.title}`}
                />
              </div>
              <div className="task-content">
                <div
                  className={`task-title ${
                    task.isCompleted ? "completed" : ""
                  }`}
                >
                  {task.title}
                </div>
                <div className="task-details">
                  {task.dueDate && (
                    <span className="task-due-date">
                      {task.dueDate.toLocaleDateString()}
                    </span>
                  )}
                  {task.priority && (
                    <span className={`task-priority priority-${task.priority}`}>
                      {task.priority}
                    </span>
                  )}
                  {task.tags.map((tag) => (
                    <span key={tag} className="task-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
