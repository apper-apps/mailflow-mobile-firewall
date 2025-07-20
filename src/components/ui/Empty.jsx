import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title, 
  message, 
  actionLabel, 
  onAction, 
  icon = "Inbox",
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-[300px] text-center p-8 ${className}`}>
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-full mb-6">
        <ApperIcon name={icon} className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default Empty;