
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MemberLayout } from "@/components/layout/MemberLayout";

// Public pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Protected member pages
import Dashboard from "./pages/Dashboard";
import MemberLibrary from "./pages/MemberLibrary";
import AutomationDetails from "./pages/AutomationDetails";
import MyDownloads from "./pages/MyDownloads";
import AIChat from "./pages/AIChat";
import WorkflowBuilder from "./pages/WorkflowBuilder";
import MVPChecklist from "./pages/MVPChecklist";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected member routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <MemberLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
            </Route>
            
            <Route path="/library" element={
              <ProtectedRoute>
                <MemberLayout />
              </ProtectedRoute>
            }>
              <Route index element={<MemberLibrary />} />
            </Route>
            
            <Route path="/automation/:id" element={
              <ProtectedRoute>
                <MemberLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AutomationDetails />} />
            </Route>
            
            <Route path="/workflow-builder" element={
              <ProtectedRoute>
                <MemberLayout />
              </ProtectedRoute>
            }>
              <Route index element={<WorkflowBuilder />} />
            </Route>
            
            <Route path="/downloads" element={
              <ProtectedRoute>
                <MemberLayout />
              </ProtectedRoute>
            }>
              <Route index element={<MyDownloads />} />
            </Route>
            
            <Route path="/chat" element={
              <ProtectedRoute>
                <MemberLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AIChat />} />
            </Route>
            
            <Route path="/mvp-checklist" element={
              <ProtectedRoute>
                <MemberLayout />
              </ProtectedRoute>
            }>
              <Route index element={<MVPChecklist />} />
            </Route>
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <MemberLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Settings />} />
            </Route>

            {/* Redirect old library route to new member library */}
            <Route path="/library-old" element={<Navigate to="/library" replace />} />
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
