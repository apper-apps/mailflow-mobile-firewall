import { useState } from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ onMenuClick, title, children }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <ApperIcon name="Menu" className="h-5 w-5" />
          </Button>
          {title && (
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {children}
          
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <ApperIcon name="Bell" className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </Button>
          
          {/* User Menu */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
              <ApperIcon name="User" className="h-4 w-4 text-white" />
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;