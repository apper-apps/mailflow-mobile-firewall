import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { contactService } from "@/services/api/contactService";
import { toast } from "react-toastify";

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await contactService.getAll();
      setContacts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleSelectContact = (Id) => {
    setSelectedContacts(prev => 
      prev.includes(Id) 
        ? prev.filter(id => id !== Id)
        : [...prev, Id]
    );
  };

  const handleSelectAll = () => {
    setSelectedContacts(
      selectedContacts.length === filteredContacts.length 
        ? [] 
        : filteredContacts.map(contact => contact.Id)
    );
  };

  const handleBulkAction = (action) => {
    toast.info(`${action} action for ${selectedContacts.length} contacts`);
    setSelectedContacts([]);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadContacts} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contacts</h2>
          <p className="text-gray-600">{contacts.length} total contacts</p>
        </div>
        <div className="flex items-center space-x-4">
          <SearchBar
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button variant="outline">
            <ApperIcon name="Upload" className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="primary">
            <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      {selectedContacts.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-800">
              {selectedContacts.length} contact(s) selected
            </span>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={() => handleBulkAction("Export")}>
                <ApperIcon name="Download" className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction("Add to List")}>
                <ApperIcon name="List" className="h-4 w-4 mr-1" />
                Add to List
              </Button>
              <Button size="sm" variant="danger" onClick={() => handleBulkAction("Delete")}>
                <ApperIcon name="Trash2" className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {filteredContacts.length === 0 ? (
        <Empty
          title="No contacts found"
          message="Import your first contacts to start building your audience."
          actionLabel="Import Contacts"
          onAction={() => toast.info("Import feature coming soon")}
          icon="Users"
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="w-12 px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedContacts.length === filteredContacts.length}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lists
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredContacts.map((contact) => (
                    <tr key={contact.Id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedContacts.includes(contact.Id)}
                          onChange={() => handleSelectContact(contact.Id)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {contact.firstName} {contact.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{contact.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {contact.company}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {contact.lists.map((list) => (
                            <Badge key={list} variant="secondary" className="text-xs">
                              {list}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={contact.status}>{contact.status}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <ApperIcon name="Edit" className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                            <ApperIcon name="Trash2" className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContactTable;