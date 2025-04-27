
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth, AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BrowseProjects from "./pages/BrowseProjects";
import FindFreelancers from "./pages/FindFreelancers";
import PostProject from "./pages/PostProject";
import NotFound from "./pages/NotFound";
import MyPortfolio from "./pages/MyPortfolio";
import MyBids from "./pages/MyBids";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

// Private route component to redirect unauthenticated users
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Redirects authenticated users from landing page to dashboard
const AuthRedirect = () => {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <Landing />;
};

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        {/* Public routes */}
        <Route path="/" element={<AuthRedirect />} />
        <Route path="/browse-projects" element={<BrowseProjects />} />
        <Route path="/find-freelancers" element={<FindFreelancers />} />
        <Route path="/post-project" element={<PostProject />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/portfolio" element={<PrivateRoute><MyPortfolio /></PrivateRoute>} />
        <Route path="/bids" element={<PrivateRoute><MyBids /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppRoutes />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
