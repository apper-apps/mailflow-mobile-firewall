import { useState, useEffect } from "react";
import MetricCard from "@/components/molecules/MetricCard";
import ProgressRing from "@/components/molecules/ProgressRing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { dashboardService } from "@/services/api/dashboardService";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");
      const dashboardData = await dashboardService.getDashboardData();
      setData(dashboardData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadDashboard} />;
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back to MailFlow Pro</h1>
            <p className="text-primary-100">Monitor your cold email campaigns and track performance</p>
          </div>
          <div className="text-center">
            <ProgressRing progress={data.usagePercentage} size={100} />
            <p className="text-sm text-primary-100 mt-2">Monthly Usage</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Campaigns"
          value={data.metrics.totalCampaigns}
          icon="Mail"
          trend="up"
          trendValue="+12%"
          gradient={true}
        />
        <MetricCard
          title="Emails Sent"
          value={data.metrics.emailsSent.toLocaleString()}
          icon="Send"
          trend="up"
          trendValue="+8%"
        />
        <MetricCard
          title="Open Rate"
          value={`${data.metrics.openRate}%`}
          icon="Eye"
          trend="up"
          trendValue="+2.4%"
        />
        <MetricCard
          title="Click Rate"
          value={`${data.metrics.clickRate}%`}
          icon="MousePointer"
          trend="down"
          trendValue="-0.8%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Campaigns */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Campaigns</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentCampaigns.map((campaign) => (
                <div key={campaign.Id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                    <p className="text-sm text-gray-600">{campaign.workspace}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{campaign.sent} sent</p>
                      <p className="text-xs text-gray-500">{campaign.openRate}% open rate</p>
                    </div>
                    <Badge variant={campaign.status}>{campaign.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Provider Health */}
        <Card>
          <CardHeader>
            <CardTitle>Provider Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.providerHealth.map((provider) => (
                <div key={provider.Id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      provider.status === "active" ? "bg-green-500" :
                      provider.status === "error" ? "bg-red-500" : "bg-yellow-500"
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{provider.name}</p>
                      <p className="text-xs text-gray-500">{provider.type.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {provider.sentToday}/{provider.dailyLimit}
                    </p>
                    <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-primary-600 h-1.5 rounded-full"
                        style={{ width: `${Math.min((provider.sentToday / provider.dailyLimit) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <ApperIcon name="Plus" className="h-6 w-6 mb-2" />
              Create Campaign
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <ApperIcon name="Upload" className="h-6 w-6 mb-2" />
              Import Contacts
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <ApperIcon name="Server" className="h-6 w-6 mb-2" />
              Add Provider
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <ApperIcon name="BarChart3" className="h-6 w-6 mb-2" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;