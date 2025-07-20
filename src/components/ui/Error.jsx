import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  title = "Something went wrong", 
  message = "We encountered an error while loading this content. Please try again.", 
  onRetry,
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-[300px] text-center p-8 ${className}`}>
      <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-full mb-6">
        <ApperIcon name="AlertTriangle" className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;