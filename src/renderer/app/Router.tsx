import { createHashRouter, RouterProvider } from "react-router-dom";
import { AppShell } from "./AppShell";
import { DashboardPage } from "../features/dashboard/pages/DashboardPage";
import { TasksPage } from "../features/tasks/pages/TasksPage";
import { FocusPage } from "../features/focus/pages/FocusPage";
import { GoalsPage } from "../features/goals/pages/GoalsPage";
import { ReviewPage } from "../features/review/pages/ReviewPage";
import { SettingsPage } from "../features/settings/pages/SettingsPage";

const router = createHashRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/tasks",
        element: <TasksPage />,
      },
      {
        path: "/focus",
        element: <FocusPage />,
      },
      {
        path: "/focus/:taskId",
        element: <FocusPage />,
      },
      {
        path: "/goals",
        element: <GoalsPage />,
      },
      {
        path: "/goals/:goalId",
        element: <GoalsPage />,
      },
      {
        path: "/review",
        element: <ReviewPage />,
      },
      {
        path: "/review/:week",
        element: <ReviewPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
