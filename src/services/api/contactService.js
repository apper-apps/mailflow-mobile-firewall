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

  async getFiltered(filters) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!filters || filters.length === 0) {
          resolve([...contacts]);
          return;
        }

        const filteredContacts = contacts.filter(contact => {
          return filters.reduce((result, filter, index) => {
            if (!filter.value && filter.field !== 'customField') return result;
            
            let matches = false;
            const value = filter.value.toLowerCase();
            
            switch (filter.field) {
              case 'text':
                matches = contact.email.toLowerCase().includes(value) ||
                         contact.firstName.toLowerCase().includes(value) ||
                         contact.lastName.toLowerCase().includes(value) ||
                         contact.company.toLowerCase().includes(value);
                break;
              case 'equals':
                matches = contact.email.toLowerCase() === value ||
                         contact.firstName.toLowerCase() === value ||
                         contact.lastName.toLowerCase() === value ||
                         contact.company.toLowerCase() === value;
                break;
              case 'status':
                matches = contact.status === filter.value;
                break;
              case 'lists':
                matches = contact.lists.includes(filter.value);
                break;
              case 'company':
                matches = contact.company.toLowerCase().includes(value);
                break;
              case 'customField':
                if (filter.customField && filter.value) {
                  const customFieldValue = contact.customFields?.[filter.customField];
                  matches = customFieldValue && customFieldValue.toLowerCase().includes(value);
                }
                break;
              default:
                matches = false;
            }
            
            if (index === 0) return matches;
            
            return filter.logic === 'OR' ? result || matches : result && matches;
          }, true);
        });

        resolve([...filteredContacts]);
      }, 400);
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