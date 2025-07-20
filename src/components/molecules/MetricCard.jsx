import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const MetricCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  className,
  gradient = false 
}) => {
  return (
    <Card className={cn("hover:shadow-lg transition-all duration-200", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className={cn(
              "text-3xl font-bold",
              gradient ? "gradient-text" : "text-gray-900"
            )}>
              {value}
            </p>
            {trend && (
              <div className="flex items-center mt-2">
                <ApperIcon 
                  name={trend === "up" ? "TrendingUp" : "TrendingDown"} 
                  className={cn(
                    "h-4 w-4 mr-1",
                    trend === "up" ? "text-green-500" : "text-red-500"
                  )} 
                />
                <span className={cn(
                  "text-sm font-medium",
                  trend === "up" ? "text-green-500" : "text-red-500"
                )}>
                  {trendValue}
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-3 rounded-lg">
              <ApperIcon name={icon} className="h-6 w-6 text-white" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;