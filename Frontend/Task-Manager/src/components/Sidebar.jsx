import { NavLink } from "react-router-dom";
import { LayoutGrid, ListTodo, Clock, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col gap-8 h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
          T
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-800">
          TaskFlow
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        <NavItem to="/" icon={<LayoutGrid size={20} />} label="Overview" />
        <NavItem to="/Tasks" icon={<ListTodo size={20} />} label="My Tasks" />
        <NavItem to="/Timeline" icon={<Clock size={20} />} label="Timeline" />
        <NavItem
          to="/Settings"
          icon={<Settings size={20} />}
          label="Settings"
        />
      </nav>
    </aside>
  );
};

// Helper component for the links
const NavItem = ({ icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium ${
        isActive
          ? "bg-indigo-50 text-indigo-600 shadow-sm"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;
