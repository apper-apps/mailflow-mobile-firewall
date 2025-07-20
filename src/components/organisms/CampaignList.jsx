import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { campaignService } from "@/services/api/campaignService";
import { toast } from "react-toastify";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await campaignService.getAll();
      setCampaigns(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const handleDeleteCampaign = async (Id) => {
    if (!confirm("Are you sure you want to delete this campaign?")) return;
    
    try {
      await campaignService.delete(Id);
      setCampaigns(campaigns.filter(campaign => campaign.Id !== Id));
      toast.success("Campaign deleted successfully");
    } catch (err) {
      toast.error("Failed to delete campaign");
    }
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadCampaigns} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Campaigns</h2>
          <p className="text-gray-600">Manage your email campaigns</p>
        </div>
        <div className="flex items-center space-x-4">
          <SearchBar
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Link to="/campaigns/new">
            <Button variant="primary">
              <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </Link>
        </div>
      </div>

      {filteredCampaigns.length === 0 ? (
        <Empty
          title="No campaigns found"
          message="Create your first email campaign to get started with cold outreach."
          actionLabel="Create Campaign"
          onAction={() => window.location.href = "/campaigns/new"}
          icon="Mail"
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <Card key={campaign.Id} className="hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{campaign.workspace}</p>
                  </div>
                  <Badge variant={campaign.status}>{campaign.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary-600">{campaign.metrics.sent}</p>
                      <p className="text-xs text-gray-500">Sent</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{campaign.metrics.opened}</p>
                      <p className="text-xs text-gray-500">Opened</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-accent-600">{campaign.metrics.clicked}</p>
                      <p className="text-xs text-gray-500">Clicked</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex space-x-2">
                      <Link to={`/campaigns/${campaign.Id}`}>
                        <Button variant="outline" size="sm">
                          <ApperIcon name="Eye" className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Link to={`/campaigns/${campaign.Id}/edit`}>
                        <Button variant="ghost" size="sm">
                          <ApperIcon name="Edit" className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteCampaign(campaign.Id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <ApperIcon name="Trash2" className="h-4 w-4" />
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

export default CampaignList;