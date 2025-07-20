import analyticsData from "@/services/mockData/analytics.json";

export const analyticsService = {
  async getAnalytics(timeRange = "7days") {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = { ...analyticsData };
        
        // Adjust data based on time range
        if (timeRange === "30days") {
          data.emailVolume.dates = data.emailVolume.dates.slice(0, 30);
          data.emailVolume.sent = data.emailVolume.sent.slice(0, 30);
          data.emailVolume.delivered = data.emailVolume.delivered.slice(0, 30);
          data.emailVolume.opened = data.emailVolume.opened.slice(0, 30);
        } else if (timeRange === "90days") {
          // Extend data for 90 days (simplified)
          const extended = Array(90).fill().map((_, i) => i);
          data.emailVolume.dates = extended.map(i => `Day ${i + 1}`);
          data.emailVolume.sent = extended.map(() => Math.floor(Math.random() * 1000));
          data.emailVolume.delivered = extended.map(() => Math.floor(Math.random() * 950));
          data.emailVolume.opened = extended.map(() => Math.floor(Math.random() * 400));
        }
        
        resolve(data);
      }, 400);
    });
  }
};