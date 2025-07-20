import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const navigationItems = [
    { name: "Dashboard", href: "/", icon: "LayoutDashboard" },
    { name: "Campaigns", href: "/campaigns", icon: "Mail" },
    { name: "Contacts", href: "/contacts", icon: "Users" },
    { name: "Providers", href: "/providers", icon: "Server" },
    { name: "Analytics", href: "/analytics", icon: "BarChart3" },
    { name: "Settings", href: "/settings", icon: "Settings" }
  ];

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-primary-600 to-secondary-600 p-2 rounded-lg">
            <ApperIcon name="Mail" className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">MailFlow Pro</h1>
            <p className="text-xs text-gray-500">Cold Email Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            onClick={onClose}
            className={({ isActive }) => cn(
              "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
              isActive
                ? "bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 border-l-4 border-primary-600"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <ApperIcon name={item.icon} className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Usage Meter */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Email Usage</span>
            <span className="text-xs text-gray-500">Free Plan</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 h-2 rounded-full w-[65%]"></div>
          </div>
          <p className="text-xs text-gray-600">325 of 500 emails used</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className={cn(
        "fixed inset-0 z-50 lg:hidden",
        isOpen ? "block" : "hidden"
      )}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col transform transition-transform duration-300 ease-in-out">
          <SidebarContent />
        </div>
      </div>
    </>
  );
};

export default Sidebar;