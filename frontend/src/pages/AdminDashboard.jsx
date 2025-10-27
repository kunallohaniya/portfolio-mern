import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaChartLine, 
  FaProjectDiagram, 
  FaEnvelope, 
  FaUser, 
  FaSignOutAlt, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaUsers, 
  FaCog 
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { projectAPI, authAPI } from '../utils/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchUserData();
    fetchProjects();
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      const response = await authAPI.getCurrentUser();
      setUser(response.data.data.user);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      toast.error('Failed to load user data');
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await projectAPI.getAll();
      setProjects(response.data.data.projects);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaChartLine },
    { id: 'projects', label: 'Projects', icon: FaProjectDiagram },
    { id: 'messages', label: 'Messages', icon: FaEnvelope },
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'settings', label: 'Settings', icon: FaCog },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-dark-800 shadow-lg border-r border-gray-200 dark:border-dark-700">
        <div className="p-6 border-b border-gray-200 dark:border-dark-700">
          <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            Admin Panel
          </h1>
          {user && (
            <p className="text-sm text-dark-600 dark:text-dark-300 mt-2">
              Welcome, {user.username}
            </p>
          )}
        </div>

        <nav className="mt-6">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${
                activeTab === item.id
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-r-2 border-primary-500'
                  : 'text-dark-700 dark:text-dark-300 hover:bg-gray-50 dark:hover:bg-dark-700'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 dark:border-dark-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
          >
            <FaSignOutAlt className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white dark:bg-dark-800 shadow-sm border-b border-gray-200 dark:border-dark-700">
          <div className="px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-dark-800 dark:text-white capitalize">
              {activeTab}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
                {user?.username?.charAt(0)?.toUpperCase() || 'A'}
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {activeTab === 'dashboard' && (
            <DashboardView 
              user={user} 
              projects={projects} 
              loading={loading} 
            />
          )}
          
          {activeTab === 'projects' && (
            <ProjectsView 
              projects={projects} 
              loading={loading} 
              onRefresh={fetchProjects}
            />
          )}
          
          {activeTab === 'messages' && (
            <MessagesView />
          )}
          
          {activeTab === 'profile' && (
            <ProfileView user={user} />
          )}
          
          {activeTab === 'settings' && (
            <SettingsView />
          )}
        </main>
      </div>
    </div>
  );
};

// Dashboard View Component
const DashboardView = ({ user, projects, loading }) => {
  const stats = [
    { 
      title: 'Total Projects', 
      value: projects.length, 
      icon: FaProjectDiagram, 
      color: 'bg-blue-500' 
    },
    { 
      title: 'Messages', 
      value: '24', 
      icon: FaEnvelope, 
      color: 'bg-green-500' 
    },
    { 
      title: 'Visitors', 
      value: '1.2K', 
      icon: FaUsers, 
      color: 'bg-purple-500' 
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6"
          >
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-dark-600 dark:text-dark-300">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-dark-800 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6">
        <h3 className="text-lg font-semibold text-dark-800 dark:text-white mb-4">
          Recent Projects
        </h3>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full"
            />
          </div>
        ) : projects.length > 0 ? (
          <div className="space-y-4">
            {projects.slice(0, 5).map((project) => (
              <div 
                key={project._id} 
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-dark-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors duration-200"
              >
                <div>
                  <h4 className="font-medium text-dark-800 dark:text-white">
                    {project.title}
                  </h4>
                  <p className="text-sm text-dark-600 dark:text-dark-300 mt-1">
                    {project.description.substring(0, 60)}...
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                    <FaEye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg">
                    <FaEdit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-dark-600 dark:text-dark-300">
              No projects found. Create your first project!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Projects View Component
const ProjectsView = ({ projects, loading, onRefresh }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-dark-800 dark:text-white">
          Projects Management
        </h3>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200"
        >
          <FaPlus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {showCreateForm && (
        <div className="mb-6 bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6">
          <h4 className="text-lg font-semibold text-dark-800 dark:text-white mb-4">
            Create New Project
          </h4>
          <ProjectForm onCancel={() => setShowCreateForm(false)} onSuccess={onRefresh} />
        </div>
      )}

      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full"
            />
          </div>
        ) : projects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 dark:text-dark-400 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 dark:text-dark-400 uppercase tracking-wider">
                    Technologies
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 dark:text-dark-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 dark:text-dark-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
                {projects.map((project) => (
                  <tr key={project._id} className="hover:bg-gray-50 dark:hover:bg-dark-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            className="h-10 w-10 rounded-lg object-cover" 
                            src={project.imageUrl} 
                            alt={project.title} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-dark-800 dark:text-white">
                            {project.title}
                          </div>
                          <div className="text-sm text-dark-600 dark:text-dark-300">
                            {project.description.substring(0, 40)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.slice(0, 3).map((tech, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-dark-600 text-dark-800 dark:text-dark-200">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.status === 'published' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' 
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">
                          <FaEye className="w-4 h-4" />
                        </button>
                        <button className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-900 dark:hover:text-yellow-300">
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-dark-600 dark:text-dark-300">
              No projects found. Create your first project!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Project Form Component
const ProjectForm = ({ onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    imageUrl: '',
    liveLink: '',
    githubLink: '',
    featured: false,
    status: 'published'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert techStack string to array
      const projectData = {
        ...formData,
        techStack: formData.techStack.split(',').map(tech => tech.trim()).filter(tech => tech)
      };

      // Submit project (this would be implemented with projectAPI)
      console.log('Project data:', projectData);
      toast.success('Project created successfully!');
      onSuccess();
      onCancel();
    } catch (error) {
      console.error('Project creation error:', error);
      toast.error('Failed to create project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">
            Image URL *
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">
          Technologies (comma separated) *
        </label>
        <input
          type="text"
          name="techStack"
          value={formData.techStack}
          onChange={handleChange}
          placeholder="React, Node.js, MongoDB"
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">
            Live Link
          </label>
          <input
            type="url"
            name="liveLink"
            value={formData.liveLink}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">
            GitHub Link
          </label>
          <input
            type="url"
            name="githubLink"
            value={formData.githubLink}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-dark-700 dark:text-dark-300">
          Featured Project
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-dark-700 dark:text-dark-300 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
        >
          {isSubmitting ? 'Creating...' : 'Create Project'}
        </button>
      </div>
    </form>
  );
};

// Messages View Component
const MessagesView = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-dark-800 dark:text-white mb-6">
        Messages
      </h3>
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-8 text-center">
        <FaEnvelope className="w-12 h-12 text-dark-400 dark:text-dark-500 mx-auto mb-4" />
        <h4 className="text-lg font-medium text-dark-800 dark:text-white mb-2">
          No messages yet
        </h4>
        <p className="text-dark-600 dark:text-dark-300">
          Messages from your contact form will appear here.
        </p>
      </div>
    </div>
  );
};

// Profile View Component
const ProfileView = ({ user }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-dark-800 dark:text-white mb-6">
        Profile Settings
      </h3>
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6">
        {user ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 rounded-full bg-primary-500 flex items-center justify-center text-white text-2xl font-bold">
                {user.username?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div>
                <h4 className="text-lg font-medium text-dark-800 dark:text-white">
                  {user.username}
                </h4>
                <p className="text-dark-600 dark:text-dark-300">
                  {user.email}
                </p>
                <p className="text-sm text-dark-500 dark:text-dark-400 mt-1">
                  Role: {user.role}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  defaultValue={user.username}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-dark-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200">
                Update Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Settings View Component
const SettingsView = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-dark-800 dark:text-white mb-6">
        Settings
      </h3>
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-8 text-center">
        <FaCog className="w-12 h-12 text-dark-400 dark:text-dark-500 mx-auto mb-4" />
        <h4 className="text-lg font-medium text-dark-800 dark:text-white mb-2">
          Settings Panel
        </h4>
        <p className="text-dark-600 dark:text-dark-300">
          Configure your portfolio settings here.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;