import { Outlet } from "react-router-dom";
import { SidebarNav } from "./SidebarNav";
import { Topbar } from "./Topbar";
import { useEffect } from "react";
import { useTaskStore } from "../../domain/task/store";

export const AppShell = () => {
  const loadTasks = useTaskStore((state) => state.loadTasks);

  useEffect(() => {
    // 앱 초기화 시 태스크 데이터 로드
    loadTasks().catch((error) => {
      console.error("태스크 로드 중 오류 발생:", error);
    });
  }, [loadTasks]);

  return (
    <div className="app-shell">
      <SidebarNav />
      <div className="main-content">
        <Topbar />
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
