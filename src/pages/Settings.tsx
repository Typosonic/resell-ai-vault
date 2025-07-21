
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User,
  Mail,
  Key,
  CreditCard,
  Crown,
  Shield
} from 'lucide-react';

export default function Settings() {
  const { user, resetPassword } = useAuth();
  const { profile, updateProfile, isUpdating } = useProfile();
  const [name, setName] = useState(profile?.name || '');
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name });
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    
    setIsResettingPassword(true);
    await resetPassword(user.email);
    setIsResettingPassword(false);
  };

  const getSubscriptionColor = (status: string) => {
    switch (status) {
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'basic': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="member-portal">
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Account Settings
          </h1>
          <p className="text-gray-600">
            Manage your account preferences and subscription
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <User className="mr-2 h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 bg-white border-gray-300"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    value={user?.email || ''}
                    disabled
                    className="mt-1 bg-gray-50 border-gray-300"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Email cannot be changed
                  </p>
                </div>

                <Button 
                  type="submit" 
                  disabled={isUpdating || name === profile?.name}
                >
                  {isUpdating ? 'Updating...' : 'Update Profile'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Shield className="mr-2 h-5 w-5" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Password</Label>
                <div className="mt-1">
                  <p className="text-sm text-gray-600 mb-3">
                    Change your password to keep your account secure
                  </p>
                  <Button
                    variant="outline"
                    onClick={handlePasswordReset}
                    disabled={isResettingPassword}
                    className="w-full"
                  >
                    <Key className="mr-2 h-4 w-4" />
                    {isResettingPassword ? 'Sending...' : 'Reset Password'}
                  </Button>
                </div>
              </div>

              <div>
                <Label>Account Status</Label>
                <div className="mt-1 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-green-800">Account Active</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Settings */}
          <Card className="lg:col-span-2 bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Crown className="mr-2 h-5 w-5" />
                Subscription & Billing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Current Plan</Label>
                  <div className="mt-2">
                    <Badge 
                      className={`${getSubscriptionColor(profile?.subscription_status || 'free')} text-sm px-3 py-1`}
                    >
                      <Crown className="mr-1 h-3 w-3" />
                      {profile?.subscription_status?.toUpperCase() || 'FREE'} PLAN
                    </Badge>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="text-sm text-gray-600">
                      Plan benefits:
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {profile?.subscription_status === 'premium' ? (
                        <>
                          <li>✓ Unlimited downloads</li>
                          <li>✓ Priority AI support</li>
                          <li>✓ Advanced automations</li>
                          <li>✓ Custom integrations</li>
                        </>
                      ) : profile?.subscription_status === 'basic' ? (
                        <>
                          <li>✓ 50 downloads per month</li>
                          <li>✓ Standard AI support</li>
                          <li>✓ Basic automations</li>
                          <li>✗ Custom integrations</li>
                        </>
                      ) : (
                        <>
                          <li>✓ 5 downloads per month</li>
                          <li>✓ Community support</li>
                          <li>✗ Advanced automations</li>
                          <li>✗ Custom integrations</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Billing Information</Label>
                    <div className="mt-2 p-4 border border-gray-200 rounded-lg bg-white">
                      <div className="flex items-center text-gray-600">
                        <CreditCard className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          {profile?.subscription_status === 'free' 
                            ? 'No billing information on file'
                            : 'Billing information configured'
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {profile?.subscription_status === 'free' ? (
                      <Button className="w-full">
                        <Crown className="mr-2 h-4 w-4" />
                        Upgrade Plan
                      </Button>
                    ) : (
                      <>
                        <Button variant="outline" className="w-full">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Manage Billing
                        </Button>
                        <Button variant="outline" className="w-full">
                          Change Plan
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
