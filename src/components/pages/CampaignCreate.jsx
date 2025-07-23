import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampaignForm from "@/components/organisms/CampaignForm";
import { campaignService } from "@/services/api/campaignService";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const CampaignCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      const newCampaign = await campaignService.create(formData);
      toast.success("Campaign created successfully");
      navigate(`/campaigns/${newCampaign.Id}`);
    } catch (error) {
      toast.error("Failed to create campaign");
      console.error("Create campaign error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/campaigns")}>
            <ApperIcon name="ArrowLeft" className="h-4 w-4 mr-1" />
            Back to Campaigns
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Create New Campaign</h1>
          <p className="text-gray-600">Set up your email campaign to start reaching prospects</p>
        </div>
      </div>

      {/* Form */}
      <CampaignForm 
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel="Create Campaign"
      />
    </div>
  );
};

export default CampaignCreate;