import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { analyticsService } from "@/services/api/analyticsService";

const AnalyticsCharts = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeRange, setTimeRange] = useState("7days");

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError("");
      const analyticsData = await analyticsService.getAnalytics(timeRange);
      setData(analyticsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadAnalytics} />;
  if (!data) return null;

  const emailVolumeOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    colors: ["#2563eb", "#10b981", "#f59e0b"],
    stroke: { curve: "smooth", width: 3 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1
      }
    },
    xaxis: {
      categories: data.emailVolume.dates,
      labels: { style: { colors: "#6b7280" } }
    },
    yaxis: { labels: { style: { colors: "#6b7280" } } },
    legend: { position: "top" },
    grid: { borderColor: "#e5e7eb" }
  };

  const engagementOptions = {
    chart: {
      type: "donut",
      toolbar: { show: false }
    },
    colors: ["#2563eb", "#10b981", "#f59e0b", "#ef4444"],
    labels: ["Delivered", "Opened", "Clicked", "Bounced"],
    legend: { position: "bottom" },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val.toFixed(1)}%`
    }
  };

  const performanceOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false }
    },
    colors: ["#7c3aed"],
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false
      }
    },
    xaxis: {
      categories: data.campaignPerformance.map(c => c.name),
      labels: { style: { colors: "#6b7280" } }
    },
    yaxis: { labels: { style: { colors: "#6b7280" } } },
    grid: { borderColor: "#e5e7eb" }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
          <p className="text-gray-600">Track your email campaign performance</p>
        </div>
        <div className="flex items-center space-x-2">
          {["7days", "30days", "90days"].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "primary" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range === "7days" ? "7 Days" : range === "30days" ? "30 Days" : "90 Days"}
            </Button>
          ))}
          <Button variant="outline" size="sm">
            <ApperIcon name="Download" className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Volume Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Email Volume Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart
              options={emailVolumeOptions}
              series={[
                { name: "Sent", data: data.emailVolume.sent },
                { name: "Delivered", data: data.emailVolume.delivered },
                { name: "Opened", data: data.emailVolume.opened }
              ]}
              type="area"
              height={300}
            />
          </CardContent>
        </Card>

        {/* Engagement Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart
              options={engagementOptions}
              series={data.engagement}
              type="donut"
              height={300}
            />
          </CardContent>
        </Card>

        {/* Campaign Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Top Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart
              options={performanceOptions}
              series={[{ name: "Open Rate %", data: data.campaignPerformance.map(c => c.openRate) }]}
              type="bar"
              height={300}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsCharts;