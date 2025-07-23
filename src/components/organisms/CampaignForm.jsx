import React, { useEffect, useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Providers from "@/components/pages/Providers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

const CampaignForm = ({ 
  initialData = null, 
  onSubmit, 
  loading = false, 
  submitLabel = "Save Campaign",
  isEdit = false 
}) => {
  const [formData, setFormData] = useState({
    name: "",
    workspaceId: "ws_1",
    workspace: "Sales Team",
    emailContent: {
      subject: "",
      body: ""
    },
    contactListIds: ["list_1"],
    providerIds: [1],
    schedule: {
      type: "immediate",
      sendTime: null
    }
  });

  const [errors, setErrors] = useState({});

  const workspaceOptions = [
    { id: "ws_1", name: "Sales Team" },
    { id: "ws_2", name: "Marketing Team" },
    { id: "ws_3", name: "Business Dev" }
  ];

  const contactListOptions = [
    { id: "list_1", name: "Prospects Q4" },
    { id: "list_2", name: "Enterprise Leads" },
    { id: "list_3", name: "Previous Customers" },
    { id: "list_4", name: "Cold Outreach" },
    { id: "list_5", name: "Partnership Targets" },
    { id: "list_6", name: "Demo Attendees" }
  ];

  const providerOptions = [
    { id: 1, name: "Gmail Workspace" },
    { id: 2, name: "Outlook 365" },
    { id: 3, name: "SendGrid API" }
  ];

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        workspaceId: initialData.workspaceId || "ws_1",
        workspace: initialData.workspace || "Sales Team",
        emailContent: {
          subject: initialData.emailContent?.subject || "",
          body: initialData.emailContent?.body || ""
        },
        contactListIds: initialData.contactListIds || ["list_1"],
        providerIds: initialData.providerIds || [1],
        schedule: {
          type: initialData.schedule?.type || "immediate",
          sendTime: initialData.schedule?.sendTime || null
        }
      });
    }
  }, [initialData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleEmailContentChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      emailContent: {
        ...prev.emailContent,
        [field]: value
      }
    }));
    
    if (errors[`emailContent.${field}`]) {
      setErrors(prev => ({
        ...prev,
        [`emailContent.${field}`]: ""
      }));
    }
  };

  const handleScheduleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [field]: value,
        // Reset sendTime if switching to immediate
        ...(field === "type" && value === "immediate" ? { sendTime: null } : {})
      }
    }));
  };

  const handleContactListToggle = (listId) => {
    setFormData(prev => ({
      ...prev,
      contactListIds: prev.contactListIds.includes(listId)
        ? prev.contactListIds.filter(id => id !== listId)
        : [...prev.contactListIds, listId]
    }));
  };

  const handleProviderToggle = (providerId) => {
    setFormData(prev => ({
      ...prev,
      providerIds: prev.providerIds.includes(providerId)
        ? prev.providerIds.filter(id => id !== providerId)
        : [...prev.providerIds, providerId]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Campaign name is required";
    }
    
    if (!formData.emailContent.subject.trim()) {
      newErrors["emailContent.subject"] = "Subject line is required";
    }
    
    if (!formData.emailContent.body.trim()) {
      newErrors["emailContent.body"] = "Email body is required";
    }
    
    if (formData.contactListIds.length === 0) {
      newErrors.contactListIds = "At least one contact list must be selected";
    }
    
    if (formData.providerIds.length === 0) {
      newErrors.providerIds = "At least one email provider must be selected";
    }

    if (formData.schedule.type === "scheduled" && !formData.schedule.sendTime) {
      newErrors["schedule.sendTime"] = "Send time is required for scheduled campaigns";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Update workspace name based on selected ID
    const selectedWorkspace = workspaceOptions.find(w => w.id === formData.workspaceId);
    const submitData = {
      ...formData,
      workspace: selectedWorkspace?.name || formData.workspace
    };

    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Campaign Name *
            </label>
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter campaign name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Workspace
            </label>
            <select
              value={formData.workspaceId}
              onChange={(e) => handleInputChange("workspaceId", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {workspaceOptions.map(workspace => (
                <option key={workspace.id} value={workspace.id}>
                  {workspace.name}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Email Content */}
      <Card>
        <CardHeader>
          <CardTitle>Email Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject Line *
            </label>
            <Input
              value={formData.emailContent.subject}
              onChange={(e) => handleEmailContentChange("subject", e.target.value)}
              placeholder="Enter email subject (use {{firstName}}, {{company}} for personalization)"
              className={errors["emailContent.subject"] ? "border-red-500" : ""}
            />
            {errors["emailContent.subject"] && (
              <p className="text-red-500 text-sm mt-1">{errors["emailContent.subject"]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Body *
            </label>
            <textarea
              value={formData.emailContent.body}
              onChange={(e) => handleEmailContentChange("body", e.target.value)}
              placeholder="Enter your email content. Use {{firstName}}, {{lastName}}, {{company}} for personalization."
              rows={8}
              className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors["emailContent.body"] ? "border-red-500" : ""
              }`}
            />
{errors["emailContent.body"] && (
              <p className="text-red-500 text-sm mt-1">{errors["emailContent.body"]}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Available variables: {"{firstName}"}, {"{lastName}"}, {"{company}"}, {"{email}"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Lists */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Lists</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">Select which contact lists to include in this campaign</p>
          <div className="space-y-3">
            {contactListOptions.map(list => (
              <label key={list.id} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.contactListIds.includes(list.id)}
                  onChange={() => handleContactListToggle(list.id)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">{list.name}</span>
              </label>
            ))}
          </div>
          {errors.contactListIds && (
            <p className="text-red-500 text-sm mt-2">{errors.contactListIds}</p>
          )}
        </CardContent>
      </Card>

      {/* Email Providers */}
      <Card>
        <CardHeader>
          <CardTitle>Email Providers</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">Choose email providers to send from</p>
          <div className="space-y-3">
            {providerOptions.map(provider => (
              <label key={provider.id} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.providerIds.includes(provider.id)}
                  onChange={() => handleProviderToggle(provider.id)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">{provider.name}</span>
              </label>
            ))}
          </div>
          {errors.providerIds && (
            <p className="text-red-500 text-sm mt-2">{errors.providerIds}</p>
          )}
        </CardContent>
      </Card>

      {/* Scheduling */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduling</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Send Type
            </label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="scheduleType"
                  value="immediate"
                  checked={formData.schedule.type === "immediate"}
                  onChange={(e) => handleScheduleChange("type", e.target.value)}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">Send Immediately</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="scheduleType"
                  value="scheduled"
                  checked={formData.schedule.type === "scheduled"}
                  onChange={(e) => handleScheduleChange("type", e.target.value)}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">Schedule for Later</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="scheduleType"
                  value="draft"
                  checked={formData.schedule.type === "draft"}
                  onChange={(e) => handleScheduleChange("type", e.target.value)}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">Save as Draft</span>
              </label>
            </div>
          </div>

          {formData.schedule.type === "scheduled" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Send Date & Time *
              </label>
              <input
                type="datetime-local"
                value={formData.schedule.sendTime ? new Date(formData.schedule.sendTime).toISOString().slice(0, 16) : ""}
                onChange={(e) => handleScheduleChange("sendTime", e.target.value ? new Date(e.target.value).toISOString() : null)}
                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                  errors["schedule.sendTime"] ? "border-red-500" : ""
                }`}
                min={new Date().toISOString().slice(0, 16)}
              />
              {errors["schedule.sendTime"] && (
                <p className="text-red-500 text-sm mt-1">{errors["schedule.sendTime"]}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex items-center justify-end space-x-4 pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {loading && <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default CampaignForm;