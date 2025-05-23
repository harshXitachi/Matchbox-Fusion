import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import Dashboard from "@/components/admin/Dashboard";
import ContentEditor from "@/components/admin/ContentEditor";
import MediaLibrary from "@/components/admin/MediaLibrary";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  // Check for existing login session
  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession");
    if (adminSession) {
      try {
        const session = JSON.parse(adminSession);
        if (session.isLoggedIn && session.expiresAt > Date.now()) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("adminSession");
        }
      } catch (error) {
        localStorage.removeItem("adminSession");
      }
    }
  }, []);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    // Simulate API call with setTimeout
    setTimeout(() => {
      if (loginData.username === "swati001" && loginData.password === "tandon@opkl") {
        // Set session with expiry (24 hours)
        if (rememberMe) {
          const sessionData = {
            isLoggedIn: true,
            expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
            username: loginData.username
          };
          localStorage.setItem("adminSession", JSON.stringify(sessionData));
        }
        
        setIsLoggedIn(true);
        setLoading(false);
      } else {
        setLoginError("Invalid username or password. Please try again.");
        setLoading(false);
      }
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    setIsLoggedIn(false);
    setLocation("/admin");
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Matchbox~Fusion</title>
        <meta name="description" content="Admin dashboard for Matchbox~Fusion website management" />
      </Helmet>

      {!isLoggedIn ? (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[hsl(var(--darker-purple))]">
          {/* Background particles effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[hsl(var(--darker-purple))]">
              <img 
                src="https://images.unsplash.com/photo-1539321908154-04927596764d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                alt="Cosmic nebula background" 
                className="w-full h-full object-cover opacity-40"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--darker-purple))]/80 to-[hsl(var(--deep-purple))]/80"></div>
          </div>
          
          {/* Animated 3D elements */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[hsl(var(--accent-purple))]/20 blur-3xl animate-float-slower"></div>
          <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[hsl(var(--accent-blue))]/15 blur-3xl animate-float"></div>
          
          {/* Login form */}
          <motion.div 
            className="glass rounded-xl p-8 w-full max-w-md z-10 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-8">
              <h1 className="font-display font-bold text-3xl mb-2 gradient-text">Matchbox~Fusion</h1>
              <p className="text-gray-300">Admin Dashboard</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              {loginError && (
                <div className="bg-red-500/20 text-red-300 px-4 py-3 rounded-lg text-sm">
                  {loginError}
                </div>
              )}
              
              <div>
                <label htmlFor="username" className="block text-gray-300 mb-2">Username</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  value={loginData.username}
                  onChange={handleLoginChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-purple))] focus:border-transparent transition-all" 
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-purple))] focus:border-transparent transition-all" 
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="rememberMe" 
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 rounded border-gray-300 text-[hsl(var(--accent-purple))] focus:ring-[hsl(var(--accent-purple))]" 
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-300">Remember me</label>
                </div>
                
                <a href="#" className="text-sm text-[hsl(var(--accent-purple))] hover:text-[hsl(var(--accent-blue))] transition-colors">
                  Forgot password?
                </a>
              </div>
              
              <button 
                type="submit" 
                className="btn-glow w-full bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(var(--accent-blue))] py-3 rounded-lg text-white font-medium hover:shadow-lg transition-all relative disabled:opacity-70"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  "Login to Dashboard"
                )}
              </button>
              
              <div className="text-center mt-4">
                <a href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Return to website
                </a>
              </div>
            </form>
          </motion.div>
        </div>
      ) : (
        <AdminDashboard onLogout={handleLogout} />
      )}
    </>
  );
};

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[hsl(var(--darker-purple))]">
      {/* Sidebar */}
      <aside className={`glass-darker md:h-screen overflow-y-auto transition-all duration-300 z-20 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <div className={`transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden md:block'}`}>
            <h1 className="font-display font-bold text-xl gradient-text">Matchbox~Fusion</h1>
            <p className="text-xs text-gray-400">Admin Dashboard</p>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              {isSidebarOpen ? (
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              )}
            </svg>
          </button>
        </div>
        <nav className="mt-6 px-4">
          <ul className="space-y-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: "📊" },
              { id: "content", label: "Content Editor", icon: "📝" },
              { id: "media", label: "Media Library", icon: "🖼️" },
              { id: "settings", label: "Settings", icon: "⚙️" },
            ].map((item) => (
              <li key={item.id}>
                <button
                  className={`w-full flex items-center py-3 px-4 rounded-lg transition-colors ${activeSection === item.id ? 'bg-[hsl(var(--accent-purple))]/20 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className={`${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden md:block'} transition-opacity duration-300`}>
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-10 pt-6 border-t border-white/10">
            <button
              onClick={onLogout}
              className="w-full flex items-center py-3 px-4 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              <span className="mr-3">🚪</span>
              <span className={`${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden md:block'} transition-opacity duration-300`}>
                Logout
              </span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-hidden h-screen">
        <div className="h-full flex flex-col">
          {/* Header */}
          <header className="glass z-10 py-3 px-6 flex items-center justify-between">
            <h2 className="text-xl font-display font-semibold">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h2>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[hsl(var(--accent-purple))] rounded-full"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-2 ring-2 ring-[hsl(var(--accent-purple))]/50">
                  <img src="/chairman.jpg" alt="Admin" className="w-full h-full object-cover" />
                </div>
                <div className={`transition-opacity duration-300`}>
                  <p className="text-sm font-medium">Swati Choudhary</p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard content */}
          <div className="flex-1 overflow-y-auto p-6 bg-[hsl(var(--darker-purple))]">
            {activeSection === "dashboard" && <Dashboard />}
            {activeSection === "content" && <ContentEditor />}
            {activeSection === "media" && <MediaLibrary />}
            
            {!["dashboard", "content", "media"].includes(activeSection) && (
              <div className="glass rounded-xl p-6 mt-4 text-center py-12">
                <h3 className="text-2xl font-display font-semibold mb-6">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section</h3>
                <p className="text-gray-300 max-w-xl mx-auto">
                  This {activeSection} section is currently in development. Check back soon for updates or contact your developer for more information.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;