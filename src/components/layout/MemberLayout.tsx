import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Library, 
  Download, 
  MessageSquare, 
  Settings, 
  LogOut,
  Bot,
  Wand2
} from 'lucide-react';

export const MemberLayout = () => {
  const { signOut } = useAuth();
  const { profile } = useProfile();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Library', href: '/library', icon: Library },
    { name: 'Workflow Builder', href: '/workflow-builder', icon: Wand2 },
    { name: 'My Downloads', href: '/downloads', icon: Download },
    { name: 'AI Chat', href: '/chat', icon: MessageSquare },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen member-portal">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center px-6 border-b border-gray-200">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">AutomationVault</span>
            </Link>
          </div>

          {/* User Info */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="text-sm text-gray-600">Welcome back,</div>
            <div className="font-medium text-gray-900">{profile?.name || 'User'}</div>
            <div className="text-xs text-gray-500 capitalize">
              {profile?.subscription_status || 'free'} Plan
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Sign Out */}
          <div className="px-4 py-4 border-t border-gray-200">
            <Button
              variant="ghost"
              onClick={signOut}
              className="w-full justify-start text-gray-600 hover:text-gray-900"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <main className="min-h-screen bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
