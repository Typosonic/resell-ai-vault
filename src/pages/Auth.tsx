
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Auth() {
  const { user, signIn, signUp, resetPassword } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isResetPassword) {
        await resetPassword(email);
        setIsResetPassword(false);
      } else if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, name);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link 
          to="/" 
          className="flex items-center justify-center space-x-2 mb-8 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        <div className="flex justify-center">
          <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600">
            <Bot className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="mt-4 text-center text-3xl font-bold text-gray-900">
          AutomationVault.ai
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isResetPassword 
            ? 'Reset your password'
            : isLogin 
            ? 'Sign in to your account' 
            : 'Create your account'
          }
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {isResetPassword 
                ? 'Reset Password'
                : isLogin 
                ? 'Welcome Back' 
                : 'Get Started'
              }
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              {!isResetPassword && (
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              )}

              {!isLogin && !isResetPassword && (
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading 
                  ? 'Loading...' 
                  : isResetPassword 
                  ? 'Send Reset Email'
                  : isLogin 
                  ? 'Sign In' 
                  : 'Sign Up'
                }
              </Button>
            </form>

            <div className="mt-6 space-y-2">
              {!isResetPassword ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="w-full text-center text-sm text-purple-600 hover:text-purple-500"
                  >
                    {isLogin 
                      ? "Don't have an account? Sign up" 
                      : "Already have an account? Sign in"
                    }
                  </button>
                  
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => setIsResetPassword(true)}
                      className="w-full text-center text-sm text-gray-600 hover:text-gray-500"
                    >
                      Forgot your password?
                    </button>
                  )}
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsResetPassword(false)}
                  className="w-full text-center text-sm text-purple-600 hover:text-purple-500"
                >
                  Back to sign in
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
