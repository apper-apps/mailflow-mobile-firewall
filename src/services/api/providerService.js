import providersData from "@/services/mockData/providers.json";

let providers = [...providersData];

export const providerService = {
  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...providers]);
      }, 300);
    });
  },

  async getById(Id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const provider = providers.find(p => p.Id === Id);
        if (provider) {
          resolve({ ...provider });
        } else {
          reject(new Error("Provider not found"));
        }
      }, 200);
    });
  },

  async create(providerData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProvider = {
          ...providerData,
          Id: Math.max(...providers.map(p => p.Id)) + 1,
          status: "active",
          sentToday: 0
        };
        providers.push(newProvider);
        resolve({ ...newProvider });
      }, 500);
    });
  },

  async update(Id, updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = providers.findIndex(p => p.Id === Id);
        if (index !== -1) {
          providers[index] = { ...providers[index], ...updates };
          resolve({ ...providers[index] });
        } else {
          reject(new Error("Provider not found"));
        }
      }, 300);
    });
  },

  async delete(Id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = providers.findIndex(p => p.Id === Id);
        if (index !== -1) {
          providers.splice(index, 1);
          resolve();
        } else {
          reject(new Error("Provider not found"));
        }
      }, 200);
    });
  }
};