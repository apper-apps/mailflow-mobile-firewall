import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CampaignForm from "@/components/organisms/CampaignForm";
import { campaignService } from "@/services/api/campaignService";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const CampaignEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
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

  const handleSubmit = async (formData) => {
    try {
      setSubmitLoading(true);
      const updatedCampaign = await campaignService.update(parseInt(id), formData);
      toast.success("Campaign updated successfully");
      navigate(`/campaigns/${updatedCampaign.Id}`);
    } catch (error) {
      toast.error("Failed to update campaign");
      console.error("Update campaign error:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadCampaign} />;
  if (!campaign) return <Error message="Campaign not found" onRetry={loadCampaign} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" onClick={() => navigate(`/campaigns/${id}`)}>
            <ApperIcon name="ArrowLeft" className="h-4 w-4 mr-1" />
            Back to Campaign
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Edit Campaign</h1>
          <p className="text-gray-600">Update your campaign settings and content</p>
        </div>
      </div>

      {/* Form */}
      <CampaignForm 
        initialData={campaign}
        onSubmit={handleSubmit}
        loading={submitLoading}
        submitLabel="Update Campaign"
        isEdit={true}
      />
    </div>
  );
};

export default CampaignEdit;