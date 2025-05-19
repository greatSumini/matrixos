import { NavLink } from "react-router-dom";
import {
  RiDashboardLine,
  RiTaskLine,
  RiTimerLine,
  RiFlag2Line,
  RiFileListLine,
  RiSettings5Line,
} from "react-icons/ri";

export const SidebarNav = () => {
  const navItems = [
    { path: "/dashboard", label: "대시보드", icon: <RiDashboardLine /> },
    { path: "/tasks", label: "할 일", icon: <RiTaskLine /> },
    { path: "/focus", label: "포커스 모드", icon: <RiTimerLine /> },
    { path: "/goals", label: "목표 관리", icon: <RiFlag2Line /> },
    { path: "/review", label: "주간 회고", icon: <RiFileListLine /> },
    { path: "/settings", label: "설정", icon: <RiSettings5Line /> },
  ];

  return (
    <nav className="sidebar-nav" role="navigation">
      <div className="app-logo">MatrixOS</div>
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
