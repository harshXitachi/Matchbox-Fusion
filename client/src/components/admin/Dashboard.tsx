import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";

// Dashboard component for analytics and site statistics
const Dashboard = () => {
  const [stats, setStats] = useState({
    visits: {
      total: 0,
      today: 0,
      thisWeek: 0,
      percentageIncrease: "0"
    },
    inquiries: {
      recent: [],
      total: 0
    },
    popularPages: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // For now, we're using simulated data
        // In production, this would be replaced with real API data
        
        // Simulated data for testing UI
        const mockData = {
          visits: {
            total: 1248,
            today: 42,
            thisWeek: 319,
            percentageIncrease: "17.5"
          },
          inquiries: {
            recent: [
              { 
                id: 1, 
                name: "John Smith", 
                email: "john@example.com", 
                message: "Interested in your event services for corporate meeting", 
                createdAt: new Date().toISOString() 
              },
              { 
                id: 2, 
                name: "Sarah Johnson", 
                email: "sarah@example.com", 
                message: "Looking for wedding planning services", 
                createdAt: new Date(Date.now() - 86400000).toISOString() 
              },
              { 
                id: 3, 
                name: "Michael Lee", 
                email: "michael@example.com", 
                message: "Need a quote for a birthday celebration", 
                createdAt: new Date(Date.now() - 172800000).toISOString() 
              }
            ],
            total: 24
          },
          popularPages: [
            { pageVisited: "/", count: 523 },
            { pageVisited: "/services", count: 298 },
            { pageVisited: "/portfolio", count: 214 },
            { pageVisited: "/contact", count: 163 },
            { pageVisited: "/about", count: 50 }
          ]
        };
        
        setStats(mockData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  // Animated counter effect
  const AnimatedCounter = ({ value, duration = 1000 }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      let start = 0;
      const increment = value / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        setCount(Math.floor(start));
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        }
      }, 16);
      
      return () => clearInterval(timer);
    }, [value, duration]);
    
    return <span>{count.toLocaleString()}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-6">
        <h3 className="text-2xl font-display font-semibold mb-2">Dashboard Analytics</h3>
        <p className="text-gray-300">
          Overview of website performance and visitor statistics
        </p>
      </div>
      
      {loading ? (
        <div className="glass rounded-xl p-12 flex justify-center">
          <div className="text-center">
            <svg className="animate-spin h-10 w-10 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-lg">Loading dashboard data...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div 
              className="glass rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-lg font-medium text-gray-400">Total Visits</h4>
              <p className="text-3xl font-display font-bold mt-2">
                <AnimatedCounter value={stats.visits.total} />
              </p>
              <div className="h-1 w-full bg-white/10 rounded-full mt-4">
                <div className="h-1 bg-[hsl(var(--accent-purple))] rounded-full" style={{ width: '80%' }}></div>
              </div>
            </motion.div>
            
            <motion.div 
              className="glass rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h4 className="text-lg font-medium text-gray-400">Today</h4>
              <p className="text-3xl font-display font-bold mt-2">
                <AnimatedCounter value={stats.visits.today} />
              </p>
              <div className="h-1 w-full bg-white/10 rounded-full mt-4">
                <div className="h-1 bg-[hsl(var(--accent-blue))] rounded-full" style={{ width: '40%' }}></div>
              </div>
            </motion.div>
            
            <motion.div 
              className="glass rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h4 className="text-lg font-medium text-gray-400">This Week</h4>
              <p className="text-3xl font-display font-bold mt-2">
                <AnimatedCounter value={stats.visits.thisWeek} />
              </p>
              <div className="h-1 w-full bg-white/10 rounded-full mt-4">
                <div className="h-1 bg-[hsl(var(--accent-purple))] rounded-full" style={{ width: '65%' }}></div>
              </div>
            </motion.div>
            
            <motion.div 
              className="glass rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <h4 className="text-lg font-medium text-gray-400">Growth</h4>
              <p className="text-3xl font-display font-bold mt-2 flex items-center">
                +{stats.visits.percentageIncrease}%
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </p>
              <p className="text-sm text-gray-400 mt-4">Compared to last week</p>
            </motion.div>
          </div>
          
          {/* Popular Pages */}
          <motion.div 
            className="glass rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <h4 className="text-xl font-display font-semibold mb-4">Most Visited Pages</h4>
            
            <div className="space-y-4">
              {stats.popularPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg font-medium w-8">{index + 1}.</span>
                    <span className="text-gray-300">{page.pageVisited}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">{page.count.toLocaleString()}</span>
                    <span className="text-gray-400 ml-2">visits</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Recent Inquiries */}
          <motion.div 
            className="glass rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-display font-semibold">Recent Inquiries</h4>
              <span className="bg-[hsl(var(--accent-purple))]/20 px-3 py-1 rounded-full text-sm">
                {stats.inquiries.total} Total
              </span>
            </div>
            
            <div className="space-y-4">
              {stats.inquiries.recent.map((inquiry: any) => (
                <div key={inquiry.id} className="glass-darker rounded-lg p-4">
                  <div className="flex justify-between">
                    <h5 className="font-medium">{inquiry.name}</h5>
                    <span className="text-sm text-gray-400">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">{inquiry.email}</p>
                  <p className="text-sm mt-2 line-clamp-2">{inquiry.message}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Dashboard;