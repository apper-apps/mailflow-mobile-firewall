import contactsData from "@/services/mockData/contacts.json";

let contacts = [...contactsData];

export const contactService = {
  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...contacts]);
      }, 350);
    });
  },

  async getById(Id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const contact = contacts.find(c => c.Id === Id);
        if (contact) {
          resolve({ ...contact });
        } else {
          reject(new Error("Contact not found"));
        }
      }, 200);
    });
  },

  async create(contactData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newContact = {
          ...contactData,
          Id: Math.max(...contacts.map(c => c.Id)) + 1,
          status: "active",
          lists: []
        };
        contacts.push(newContact);
        resolve({ ...newContact });
      }, 400);
    });
  },

  async update(Id, updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = contacts.findIndex(c => c.Id === Id);
        if (index !== -1) {
          contacts[index] = { ...contacts[index], ...updates };
          resolve({ ...contacts[index] });
        } else {
          reject(new Error("Contact not found"));
        }
      }, 300);
    });
  },

  async delete(Id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = contacts.findIndex(c => c.Id === Id);
        if (index !== -1) {
          contacts.splice(index, 1);
          resolve();
        } else {
          reject(new Error("Contact not found"));
        }
      }, 200);
    });
  }
};