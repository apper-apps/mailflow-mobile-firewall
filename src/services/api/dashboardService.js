import dashboardData from "@/services/mockData/dashboard.json";

export const dashboardService = {
  async getDashboardData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dashboardData);
      }, 300);
    });
  }
};