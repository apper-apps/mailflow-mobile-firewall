import campaignsData from "@/services/mockData/campaigns.json";

let campaigns = [...campaignsData];

export const campaignService = {
  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...campaigns]);
      }, 400);
    });
  },

  async getById(Id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const campaign = campaigns.find(c => c.Id === Id);
        if (campaign) {
          resolve({ ...campaign });
        } else {
          reject(new Error("Campaign not found"));
        }
      }, 200);
    });
  },

  async create(campaignData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCampaign = {
          ...campaignData,
          Id: Math.max(...campaigns.map(c => c.Id)) + 1,
          status: "draft",
          metrics: { sent: 0, opened: 0, clicked: 0, bounced: 0 }
        };
        campaigns.push(newCampaign);
        resolve({ ...newCampaign });
      }, 500);
    });
  },

  async update(Id, updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = campaigns.findIndex(c => c.Id === Id);
        if (index !== -1) {
          campaigns[index] = { ...campaigns[index], ...updates };
          resolve({ ...campaigns[index] });
        } else {
          reject(new Error("Campaign not found"));
        }
      }, 300);
    });
  },

  async delete(Id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = campaigns.findIndex(c => c.Id === Id);
        if (index !== -1) {
          campaigns.splice(index, 1);
          resolve();
        } else {
          reject(new Error("Campaign not found"));
        }
      }, 200);
    });
  }
};