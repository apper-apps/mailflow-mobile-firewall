import { useState } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";

const FilterBuilder = ({ onFiltersChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState([]);

  const filterTypes = [
    { value: 'text', label: 'Text Contains' },
    { value: 'equals', label: 'Equals' },
    { value: 'status', label: 'Status' },
    { value: 'lists', label: 'In Lists' },
    { value: 'company', label: 'Company' },
    { value: 'customField', label: 'Custom Field' }
  ];

  const statusOptions = ['active', 'unsubscribed', 'bounced'];
  
  const listOptions = [
    'Prospects', 'C-Level', 'Marketing Leaders', 'SaaS', 'Founders', 
    'Fintech', 'Enterprise', 'Healthcare', 'Consultants', 'Retail', 
    'Operations', 'Manufacturing', 'Agencies', 'Creative', 'Finance', 
    'Education', 'Leadership', 'Logistics', 'Non-profit', 'Directors'
  ];

  const customFieldOptions = [
    'position', 'industry', 'employees'
  ];

  const addFilter = () => {
    const newFilter = {
      id: Date.now(),
      field: 'text',
      operator: 'contains',
      value: '',
      logic: filters.length > 0 ? 'AND' : null
    };
    const updatedFilters = [...filters, newFilter];
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const updateFilter = (id, updates) => {
    const updatedFilters = filters.map(filter => 
      filter.id === id ? { ...filter, ...updates } : filter
    );
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const removeFilter = (id) => {
    const updatedFilters = filters.filter(filter => filter.id !== id);
    // Reset logic for first filter if it exists
    if (updatedFilters.length > 0 && updatedFilters[0].logic) {
      updatedFilters[0].logic = null;
    }
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const clearAllFilters = () => {
    setFilters([]);
    onFiltersChange([]);
  };

  const getFieldLabel = (field) => {
    return filterTypes.find(type => type.value === field)?.label || field;
  };

  const renderFilterValue = (filter) => {
    switch (filter.field) {
      case 'status':
        return (
          <select
            value={filter.value}
            onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Select status</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        );
      
      case 'lists':
        return (
          <select
            value={filter.value}
            onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Select list</option>
            {listOptions.map(list => (
              <option key={list} value={list}>{list}</option>
            ))}
          </select>
        );
      
      case 'customField':
        return (
          <div className="flex space-x-2">
            <select
              value={filter.customField || ''}
              onChange={(e) => updateFilter(filter.id, { customField: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Select field</option>
              {customFieldOptions.map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>
            <Input
              type="text"
              placeholder="Enter value"
              value={filter.value}
              onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
              className="min-w-32"
            />
          </div>
        );
      
      default:
        return (
          <Input
            type="text"
            placeholder="Enter value"
            value={filter.value}
            onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
            className="min-w-32"
          />
        );
    }
  };

  const activeFiltersCount = filters.filter(f => f.value).length;

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center space-x-2">
        <Button
          variant={isOpen ? "primary" : "outline"}
          onClick={() => setIsOpen(!isOpen)}
          className="relative"
        >
          <ApperIcon name="Filter" className="h-4 w-4 mr-2" />
          Advanced Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2 text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
        
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <ApperIcon name="X" className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50">
          <Card className="w-[600px] max-w-[90vw]">
            <CardHeader>
              <CardTitle className="text-lg">Filter Contacts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filters.length === 0 ? (
                <p className="text-gray-500 text-sm">No filters applied. Add a filter to get started.</p>
              ) : (
                <div className="space-y-3">
                  {filters.map((filter, index) => (
                    <div key={filter.id} className="border border-gray-200 rounded-lg p-3 space-y-3">
                      {index > 0 && (
                        <div className="flex items-center space-x-2">
                          <select
                            value={filter.logic}
                            onChange={(e) => updateFilter(filter.id, { logic: e.target.value })}
                            className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                          >
                            <option value="AND">AND</option>
                            <option value="OR">OR</option>
                          </select>
                          <span className="text-sm text-gray-500">must also match:</span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2 flex-wrap gap-2">
                        <select
                          value={filter.field}
                          onChange={(e) => updateFilter(filter.id, { field: e.target.value, value: '', customField: '' })}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          {filterTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                          ))}
                        </select>
                        
                        {renderFilterValue(filter)}
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFilter(filter.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <ApperIcon name="Trash2" className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between pt-2 border-t">
                <Button variant="outline" size="sm" onClick={addFilter}>
                  <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
                  Add Filter
                </Button>
                
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Done
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FilterBuilder;