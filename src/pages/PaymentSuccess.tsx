import { useState, useEffect } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, CheckCircle, Mail, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const { user, signUp, signIn } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [sessionVerified, setSessionVerified] = useState(false);

  const sessionId = searchParams.get('session_id');
  const plan = searchParams.get('plan');

  useEffect(() => {
    if (sessionId) {
      verifySession();
    }
  }, [sessionId]);

  const verifySession = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { sessionId }
      });
      
      if (error) throw error;
      
      if (data?.verified) {
        setSessionVerified(true);
        if (data.customerEmail) {
          setEmail(data.customerEmail);
        }
      }
    } catch (error) {
      console.error('Error verifying session:', error);
      toast({
        title: "Error",
        description: "Failed to verify payment session.",
        variant: "destructive",
      });
    }
  };

  // If user is already authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // If no session ID, redirect to home
  if (!sessionId) {
    return <Navigate to="/" replace />;
  }

  const handleAccountCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (!error) {
          toast({
            title: "Welcome back!",
            description: "Account linked to your subscription successfully.",
          });
        }
      } else {
        const { error } = await signUp(email, password, name);
        if (!error) {
          toast({
            title: "Account created!",
            description: "Your account has been created and linked to your subscription.",
          });
        }
      }
    } catch (error) {
      console.error('Account creation/login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!sessionVerified) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="p-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="mt-4 text-center text-3xl font-bold text-gray-900">
          Payment Successful!
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Your {plan} subscription is now active
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {!showAccountForm ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <Bot className="h-6 w-6 text-purple-600" />
                Complete Your Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-gray-600 mb-6">
                  Create your account to access your subscription and start building amazing automations.
                </p>
                
                <Button 
                  onClick={() => setShowAccountForm(true)}
                  className="w-full mb-4"
                  size="lg"
                >
                  Create Account
                </Button>
                
                <p className="text-sm text-gray-500 mb-2">Already have an account?</p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setIsLogin(true);
                    setShowAccountForm(true);
                  }}
                  className="w-full"
                >
                  Sign In
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {isLogin ? 'Sign In to Your Account' : 'Create Your Account'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAccountCreation} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1"
                    disabled={!!searchParams.get('email')}
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1"
                    minLength={6}
                  />
                </div>

                {!isLogin && (
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
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

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading 
                    ? 'Processing...' 
                    : isLogin 
                    ? 'Sign In & Access Subscription' 
                    : 'Create Account & Access Subscription'
                  }
                </Button>
              </form>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-purple-600 hover:text-purple-500"
                >
                  {isLogin 
                    ? "Don't have an account? Create one" 
                    : "Already have an account? Sign in"
                  }
                </button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="mt-6 text-center">
          <Link 
            to="/" 
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}