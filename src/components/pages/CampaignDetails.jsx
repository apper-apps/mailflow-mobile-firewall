import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { campaignService } from "@/services/api/campaignService";
import { toast } from "react-toastify";

const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCampaign();
  }, [id]);

  const loadCampaign = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await campaignService.getById(parseInt(id));
      setCampaign(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this campaign?")) return;
    
    try {
      await campaignService.delete(parseInt(id));
      toast.success("Campaign deleted successfully");
      navigate("/campaigns");
    } catch (err) {
      toast.error("Failed to delete campaign");
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadCampaign} />;
  if (!campaign) return <Error message="Campaign not found" onRetry={loadCampaign} />;

  const openRate = campaign.metrics.sent > 0 ? ((campaign.metrics.opened / campaign.metrics.sent) * 100).toFixed(1) : 0;
  const clickRate = campaign.metrics.opened > 0 ? ((campaign.metrics.clicked / campaign.metrics.opened) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-4 mb-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/campaigns")}>
              <ApperIcon name="ArrowLeft" className="h-4 w-4 mr-1" />
              Back to Campaigns
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{campaign.name}</h1>
          <div className="flex items-center space-x-4 mt-2">
            <p className="text-gray-600">{campaign.workspace}</p>
            <Badge variant={campaign.status}>{campaign.status}</Badge>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Link to={`/campaigns/${campaign.Id}/edit`}>
            <Button variant="outline">
              <ApperIcon name="Edit" className="h-4 w-4 mr-2" />
              Edit Campaign
            </Button>
          </Link>
          <Button variant="outline" onClick={handleDelete} className="text-red-600 border-red-200 hover:bg-red-50">
            <ApperIcon name="Trash2" className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sent</p>
                <p className="text-3xl font-bold text-primary-600">{campaign.metrics.sent.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-full">
                <ApperIcon name="Mail" className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Rate</p>
                <p className="text-3xl font-bold text-green-600">{openRate}%</p>
                <p className="text-sm text-gray-500">{campaign.metrics.opened} opens</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <ApperIcon name="Eye" className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Click Rate</p>
                <p className="text-3xl font-bold text-accent-600">{clickRate}%</p>
                <p className="text-sm text-gray-500">{campaign.metrics.clicked} clicks</p>
              </div>
              <div className="p-3 bg-accent-100 rounded-full">
                <ApperIcon name="MousePointer" className="h-6 w-6 text-accent-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
                <p className="text-3xl font-bold text-red-600">
                  {campaign.metrics.sent > 0 ? ((campaign.metrics.bounced / campaign.metrics.sent) * 100).toFixed(1) : 0}%
                </p>
                <p className="text-sm text-gray-500">{campaign.metrics.bounced} bounced</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <ApperIcon name="AlertTriangle" className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Content */}
        <Card>
          <CardHeader>
            <CardTitle>Email Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Subject Line</label>
              <p className="mt-1 p-3 bg-gray-50 rounded-lg text-sm">{campaign.emailContent.subject}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email Body</label>
              <div className="mt-1 p-4 bg-gray-50 rounded-lg text-sm whitespace-pre-wrap max-h-48 overflow-y-auto">
                {campaign.emailContent.body}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Schedule Type</label>
              <p className="mt-1 text-sm text-gray-900 capitalize">{campaign.schedule.type}</p>
            </div>
            {campaign.schedule.sendTime && (
              <div>
                <label className="text-sm font-medium text-gray-700">Send Time</label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(campaign.schedule.sendTime).toLocaleString()}
                </p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-700">Contact Lists</label>
              <div className="mt-1 flex flex-wrap gap-2">
                {campaign.contactListIds.map((listId) => (
                  <Badge key={listId} variant="secondary">{listId}</Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email Providers</label>
              <div className="mt-1 flex flex-wrap gap-2">
                {campaign.providerIds.map((providerId) => (
                  <Badge key={providerId} variant="outline">Provider {providerId}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">{campaign.metrics.sent}</p>
              <p className="text-sm text-gray-600">Sent</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{campaign.metrics.delivered}</p>
              <p className="text-sm text-gray-600">Delivered</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{campaign.metrics.opened}</p>
              <p className="text-sm text-gray-600">Opened</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent-600">{campaign.metrics.clicked}</p>
              <p className="text-sm text-gray-600">Clicked</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{campaign.metrics.bounced}</p>
              <p className="text-sm text-gray-600">Bounced</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">{campaign.metrics.unsubscribed}</p>
              <p className="text-sm text-gray-600">Unsubscribed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignDetails;