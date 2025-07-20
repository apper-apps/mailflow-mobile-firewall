import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { providerService } from "@/services/api/providerService";
import { toast } from "react-toastify";

const ProviderGrid = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadProviders = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await providerService.getAll();
      setProviders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProviders();
  }, []);

  const handleTestConnection = async (providerId) => {
    toast.info("Testing connection...");
    // Simulate connection test
    setTimeout(() => {
      toast.success("Connection test successful!");
    }, 1500);
  };

  const handleToggleProvider = async (providerId, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "paused" : "active";
      await providerService.update(providerId, { status: newStatus });
      setProviders(providers.map(p => 
        p.Id === providerId ? { ...p, status: newStatus } : p
      ));
      toast.success(`Provider ${newStatus === "active" ? "activated" : "paused"}`);
    } catch (err) {
      toast.error("Failed to update provider status");
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProviders} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Email Providers</h2>
          <p className="text-gray-600">Manage your email service connections</p>
        </div>
        <Button variant="primary">
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          Add Provider
        </Button>
      </div>

      {providers.length === 0 ? (
        <Empty
          title="No providers configured"
          message="Connect your first email provider to start sending campaigns."
          actionLabel="Add Provider"
          onAction={() => toast.info("Add provider feature coming soon")}
          icon="Server"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <Card key={provider.Id} className="hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      provider.type === "smtp" ? "bg-blue-100" :
                      provider.type === "ses" ? "bg-orange-100" : "bg-green-100"
                    }`}>
                      <ApperIcon 
                        name="Server" 
                        className={`h-6 w-6 ${
                          provider.type === "smtp" ? "text-blue-600" :
                          provider.type === "ses" ? "text-orange-600" : "text-green-600"
                        }`} 
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{provider.name}</CardTitle>
                      <p className="text-sm text-gray-600 uppercase">{provider.type}</p>
                    </div>
                  </div>
                  <Badge variant={provider.status}>{provider.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Daily Limit</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {provider.dailyLimit.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Sent Today</p>
                      <p className="text-lg font-semibold text-primary-600">
                        {provider.sentToday.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  {/* Usage Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Usage</span>
                      <span className="text-gray-900">
                        {Math.round((provider.sentToday / provider.dailyLimit) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary-600 to-secondary-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((provider.sentToday / provider.dailyLimit) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleTestConnection(provider.Id)}
                    >
                      <ApperIcon name="Zap" className="h-4 w-4 mr-1" />
                      Test
                    </Button>
                    <Button 
                      variant={provider.status === "active" ? "secondary" : "success"} 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleToggleProvider(provider.Id, provider.status)}
                    >
                      <ApperIcon 
                        name={provider.status === "active" ? "Pause" : "Play"} 
                        className="h-4 w-4 mr-1" 
                      />
                      {provider.status === "active" ? "Pause" : "Activate"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderGrid;