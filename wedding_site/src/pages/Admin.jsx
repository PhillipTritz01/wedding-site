import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || '/api';
const UPLOADS_BASE = import.meta.env.VITE_UPLOADS_BASE || API_URL.replace(/\/api\/?$/, '');

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already authenticated
    const token = localStorage.getItem('cms_token');
    if (token) {
      setIsAuthenticated(true);
      fetchContent();
    }
  }, []);

  const getDefaultCalendar = () => [
    { date: "Aug 10", day: "Monday", text: "" },
    { date: "Aug 11", day: "Tuesday", text: "" },
    { date: "Aug 12", day: "Wednesday", text: "" },
    { date: "Aug 13", day: "Thursday", text: "" },
    { date: "Aug 14", day: "Friday", text: "" },
    { date: "Aug 15", day: "Saturday", text: "" },
    { date: "Aug 16", day: "Sunday", text: "" },
    { date: "Aug 17", day: "Monday", text: "" }
  ];

  const fetchContent = async () => {
    try {
      const response = await fetch(`${API_URL}/content`);
      const data = await response.json();
      // Ensure calendar exists in theWedding section (backward compatibility)
      if (!data.theWedding) {
        data.theWedding = {};
      }
      if (!data.theWedding.calendar || !Array.isArray(data.theWedding.calendar) || data.theWedding.calendar.length === 0) {
        data.theWedding.calendar = getDefaultCalendar();
      }
      setContent(data);
    } catch (error) {
      console.error('Failed to fetch content:', error);
      // Set default content with calendar if fetch fails
      const defaultData = {
        theWedding: {
          calendar: getDefaultCalendar()
        }
      };
      setContent(defaultData);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('cms_token', token);
        setIsAuthenticated(true);
        fetchContent();
      } else {
        setError('Invalid password');
      }
    } catch (error) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('cms_token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleSave = async (section) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('cms_token');
      const response = await fetch(`${API_URL}/content/${section}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(content[section]),
      });

      if (response.ok) {
        alert('Content saved successfully!');
      } else {
        alert('Failed to save content');
      }
    } catch (error) {
      alert('Failed to save content');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (section, arrayName, index, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [arrayName]: prev[section][arrayName].map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const addArrayItem = (section, arrayName) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [arrayName]: [...prev[section][arrayName], { name: '', label: '', image: '' }],
      },
    }));
  };

  const removeArrayItem = (section, arrayName, index) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [arrayName]: prev[section][arrayName].filter((_, i) => i !== index),
      },
    }));
  };

  const handleFileUpload = async (section, field, file) => {
    if (!file) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('cms_token');
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (response.ok) {
        const { filePath } = await response.json();
        handleChange(section, field, filePath);
      } else {
        alert('Failed to upload file');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file');
    } finally {
      setLoading(false);
    }
  };

  const handleArrayFileUpload = async (section, arrayName, index, field, file) => {
    if (!file) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('cms_token');
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (response.ok) {
        const { filePath } = await response.json();
        handleArrayChange(section, arrayName, index, field, filePath);
      } else {
        alert('Failed to upload file');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file');
    } finally {
      setLoading(false);
    }
  };

  const handleFileDelete = async (filePath) => {
    if (!filePath) return;
    
    const filename = filePath.split('/').pop();
    try {
      const token = localStorage.getItem('cms_token');
      const response = await fetch(`${API_URL}/upload/${filename}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        return true;
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
    return false;
  };

  const getFileUrl = (filePath) => {
    if (!filePath) return null;

    // already absolute
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      return filePath;
    }

    // normalize any bad saved values
    let p = filePath;

    // fix values like "api/uploads/..." or "/api/uploads/..."
    p = p.replace(/^\/?api\/uploads/, '/uploads');

    // ensure leading slash
    if (!p.startsWith('/')) p = '/' + p;

    return `${UPLOADS_BASE}${p}`;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            CMS Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">CMS Admin</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold text-gray-800 mb-4">Sections</h2>
              <nav className="space-y-2">
                {['home', 'ourStory', 'theWedding', 'weddingParty', 'weddingRegistry'].map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeSection === section
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1')}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Editor */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              {activeSection === 'home' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Home Page</h2>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Couple Name</label>
                    <input
                      type="text"
                      value={content.home.coupleName}
                      onChange={(e) => handleChange('home', 'coupleName', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Wedding Title</label>
                    <input
                      type="text"
                      value={content.home.weddingTitle}
                      onChange={(e) => handleChange('home', 'weddingTitle', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Date</label>
                    <input
                      type="text"
                      value={content.home.date}
                      onChange={(e) => handleChange('home', 'date', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Location</label>
                    <input
                      type="text"
                      value={content.home.location}
                      onChange={(e) => handleChange('home', 'location', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Hero Image</label>
                    {content.home.heroImage && (
                      <div className="mb-2">
                        <img 
                          src={getFileUrl(content.home.heroImage)} 
                          alt="Preview" 
                          className="max-w-xs max-h-48 object-cover rounded-lg border border-gray-300"
                        />
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            handleFileUpload('home', 'heroImage', file);
                          }
                          e.target.value = ''; // Reset input
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      {content.home.heroImage && (
                        <button
                          type="button"
                          onClick={async () => {
                            await handleFileDelete(content.home.heroImage);
                            handleChange('home', 'heroImage', '');
                          }}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                          title="Remove Image"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Hero Video (optional - overrides image if set)</label>
                    {content.home.heroVideo && (
                      <div className="mb-2">
                        {content.home.heroVideo.includes('youtube.com') || content.home.heroVideo.includes('youtu.be') ? (
                          <p className="text-sm text-gray-600">YouTube video configured</p>
                        ) : (
                          <video 
                            src={getFileUrl(content.home.heroVideo)} 
                            className="max-w-xs max-h-48 rounded-lg border border-gray-300"
                            controls
                          />
                        )}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            handleFileUpload('home', 'heroVideo', file);
                          }
                          e.target.value = ''; // Reset input
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      {content.home.heroVideo && (
                        <button
                          type="button"
                          onClick={async () => {
                            if (!content.home.heroVideo.includes('youtube.com') && !content.home.heroVideo.includes('youtu.be')) {
                              await handleFileDelete(content.home.heroVideo);
                            }
                            handleChange('home', 'heroVideo', '');
                          }}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                          title="Remove Video"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Video will override image if both are set. Supports .mp4, .webm, .mov files.</p>
                  </div>
                  <button
                    onClick={() => handleSave('home')}
                    disabled={loading}
                    className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    Save Home
                  </button>
                </div>
              )}

              {activeSection === 'ourStory' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Story Text 1</label>
                    <textarea
                      value={content.ourStory.storyText1}
                      onChange={(e) => handleChange('ourStory', 'storyText1', e.target.value)}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Story Text 2</label>
                    <textarea
                      value={content.ourStory.storyText2}
                      onChange={(e) => handleChange('ourStory', 'storyText2', e.target.value)}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Image 1</label>
                    {content.ourStory.image1 && (
                      <div className="mb-2">
                        <img 
                          src={getFileUrl(content.ourStory.image1)} 
                          alt="Preview" 
                          className="max-w-xs max-h-48 object-cover rounded-lg border border-gray-300"
                        />
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            handleFileUpload('ourStory', 'image1', file);
                          }
                          e.target.value = '';
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      {content.ourStory.image1 && (
                        <button
                          type="button"
                          onClick={async () => {
                            await handleFileDelete(content.ourStory.image1);
                            handleChange('ourStory', 'image1', '');
                          }}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                          title="Remove Image"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Image 2</label>
                    {content.ourStory.image2 && (
                      <div className="mb-2">
                        <img 
                          src={getFileUrl(content.ourStory.image2)} 
                          alt="Preview" 
                          className="max-w-xs max-h-48 object-cover rounded-lg border border-gray-300"
                        />
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            handleFileUpload('ourStory', 'image2', file);
                          }
                          e.target.value = '';
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      {content.ourStory.image2 && (
                        <button
                          type="button"
                          onClick={async () => {
                            await handleFileDelete(content.ourStory.image2);
                            handleChange('ourStory', 'image2', '');
                          }}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                          title="Remove Image"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleSave('ourStory')}
                    disabled={loading}
                    className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    Save Our Story
                  </button>
                </div>
              )}

              {activeSection === 'theWedding' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">The Wedding</h2>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Event Details</label>
                    <textarea
                      value={content.theWedding.eventDetails}
                      onChange={(e) => handleChange('theWedding', 'eventDetails', e.target.value)}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Getting There</label>
                    <textarea
                      value={content.theWedding.gettingThere}
                      onChange={(e) => handleChange('theWedding', 'gettingThere', e.target.value)}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Accommodation</label>
                    <textarea
                      value={content.theWedding.accommodation}
                      onChange={(e) => handleChange('theWedding', 'accommodation', e.target.value)}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Week Of Schedule - Intro Text</label>
                    <p className="text-gray-500 text-sm mb-2">Text shown above the calendar (optional)</p>
                    <textarea
                      value={content.theWedding?.weekOfScheduleIntro || ''}
                      onChange={(e) => handleChange('theWedding', 'weekOfScheduleIntro', e.target.value)}
                      rows="3"
                      placeholder="Add introductory text for the week schedule..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 mb-4"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-4">Week Of Schedule - Calendar (August 10-17, 2026)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                      {(content.theWedding?.calendar || getDefaultCalendar()).map((day, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 sm:p-6">
                          <div className="mb-3 sm:mb-4">
                            <div className="font-semibold text-gray-800 text-sm sm:text-base">{day.date}</div>
                            <div className="text-xs sm:text-sm text-gray-600">{day.day}</div>
                          </div>
                          <textarea
                            value={day.text || ''}
                            onChange={(e) => handleArrayChange('theWedding', 'calendar', index, 'text', e.target.value)}
                            rows="6"
                            placeholder="Enter event details..."
                            className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded text-xs sm:text-sm focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleSave('theWedding')}
                    disabled={loading}
                    className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    Save The Wedding
                  </button>
                </div>
              )}

              {activeSection === 'weddingParty' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Wedding Party</h2>
                  
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-gray-700">Bridesmaids</h3>
                      <button
                        onClick={() => addArrayItem('weddingParty', 'bridesmaids')}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                      >
                        Add
                      </button>
                    </div>
                    {content.weddingParty.bridesmaids.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <div>
                            <label className="block text-gray-700 font-medium mb-2 text-sm">Name</label>
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => handleArrayChange('weddingParty', 'bridesmaids', index, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 font-medium mb-2 text-sm">Label</label>
                            <input
                              type="text"
                              value={item.label}
                              onChange={(e) => handleArrayChange('weddingParty', 'bridesmaids', index, 'label', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                          </div>
                        </div>
                        <div className="mb-2">
                          <label className="block text-gray-700 font-medium mb-2 text-sm">Image</label>
                          {item.image && (
                            <div className="mb-2">
                              <img 
                                src={getFileUrl(item.image)} 
                                alt="Preview" 
                                className="max-w-32 max-h-32 object-cover rounded-lg border border-gray-300"
                              />
                            </div>
                          )}
                          <div className="flex gap-2">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  handleArrayFileUpload('weddingParty', 'bridesmaids', index, 'image', file);
                                }
                                e.target.value = '';
                              }}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                            {item.image && (
                              <button
                                type="button"
                                onClick={async () => {
                                  await handleFileDelete(item.image);
                                  handleArrayChange('weddingParty', 'bridesmaids', index, 'image', '');
                                }}
                                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
                                title="Remove Image"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeArrayItem('weddingParty', 'bridesmaids', index)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-gray-700">Groomsmen</h3>
                      <button
                        onClick={() => addArrayItem('weddingParty', 'groomsmen')}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                      >
                        Add
                      </button>
                    </div>
                    {content.weddingParty.groomsmen.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <div>
                            <label className="block text-gray-700 font-medium mb-2 text-sm">Name</label>
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => handleArrayChange('weddingParty', 'groomsmen', index, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 font-medium mb-2 text-sm">Label</label>
                            <input
                              type="text"
                              value={item.label}
                              onChange={(e) => handleArrayChange('weddingParty', 'groomsmen', index, 'label', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                          </div>
                        </div>
                        <div className="mb-2">
                          <label className="block text-gray-700 font-medium mb-2 text-sm">Image</label>
                          {item.image && (
                            <div className="mb-2">
                              <img 
                                src={getFileUrl(item.image)} 
                                alt="Preview" 
                                className="max-w-32 max-h-32 object-cover rounded-lg border border-gray-300"
                              />
                            </div>
                          )}
                          <div className="flex gap-2">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  handleArrayFileUpload('weddingParty', 'groomsmen', index, 'image', file);
                                }
                                e.target.value = '';
                              }}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                            {item.image && (
                              <button
                                type="button"
                                onClick={async () => {
                                  await handleFileDelete(item.image);
                                  handleArrayChange('weddingParty', 'groomsmen', index, 'image', '');
                                }}
                                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
                                title="Remove Image"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeArrayItem('weddingParty', 'groomsmen', index)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleSave('weddingParty')}
                    disabled={loading}
                    className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    Save Wedding Party
                  </button>
                </div>
              )}

              {activeSection === 'weddingRegistry' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Wedding Registry</h2>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Registry URL</label>
                    <input
                      type="text"
                      value={content.weddingRegistry.registryUrl}
                      onChange={(e) => handleChange('weddingRegistry', 'registryUrl', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Password</label>
                    <input
                      type="text"
                      value={content.weddingRegistry.password}
                      onChange={(e) => handleChange('weddingRegistry', 'password', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <button
                    onClick={() => handleSave('weddingRegistry')}
                    disabled={loading}
                    className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    Save Registry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

