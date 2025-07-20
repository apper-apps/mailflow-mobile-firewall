import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const Settings = () => {
  const plans = [
    { name: "Free", limit: 500, price: "$0", current: true },
    { name: "Starter", limit: 5000, price: "$29" },
    { name: "Growth", limit: 25000, price: "$99" },
    { name: "Scale", limit: 50000, price: "$199" },
    { name: "Enterprise", limit: 100000, price: "$399" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and billing preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workspace Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Workspace Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              label="Workspace Name"
              defaultValue="My Workspace"
            />
            <FormField
              label="Company Name"
              defaultValue="Acme Corporation"
            />
            <FormField
              label="Contact Email"
              type="email"
              defaultValue="admin@acme.com"
            />
            <Button variant="primary">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Current Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg p-4">
                <h3 className="text-xl font-bold text-primary-700">Free Plan</h3>
                <p className="text-3xl font-bold gradient-text">500</p>
                <p className="text-sm text-gray-600">emails per month</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Used</span>
                  <span>325 / 500</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary-600 to-secondary-600 h-2 rounded-full w-[65%]"></div>
                </div>
              </div>
              <Button variant="primary" className="w-full">
                Upgrade Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-lg border-2 p-4 ${
                  plan.current
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                {plan.current && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white">
                    Current
                  </Badge>
                )}
                <div className="text-center space-y-2">
                  <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                  <p className="text-2xl font-bold gradient-text">{plan.price}</p>
                  <p className="text-sm text-gray-600">{plan.limit.toLocaleString()} emails/month</p>
                  {!plan.current && (
                    <Button variant="outline" size="sm" className="w-full">
                      Upgrade
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Settings */}
      <Card>
        <CardHeader>
          <CardTitle>API Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">API Key</h4>
                <p className="text-sm text-gray-600">Use this key to access the MailFlow Pro API</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <ApperIcon name="Copy" className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <ApperIcon name="RefreshCw" className="h-4 w-4 mr-1" />
                  Regenerate
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;