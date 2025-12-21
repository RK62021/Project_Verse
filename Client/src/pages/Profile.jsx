import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import AvatarUploadPopup from '../components/AvatarUploadPopup';
import { useAuth } from '../context/AuthContext';
import { profileAPI, projectsAPI } from '../services/api';

export default function Profile() {
  const { user } = useAuth();
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profileData, setProfileData] = useState({
    bio: '',
    college: '',
    avatarUrl: '',
    contactEmail: '',
    socialLinks: {
      twitter: '',
      facebook: '',
      linkedin: '',
      instagram: '',
    },
  });

  const [editFormData, setEditFormData] = useState({});
  const [userProjects, setUserProjects] = useState([]);

  useEffect(() => {
    if (user) {
      fetchProfileData();
      fetchUserProjects();
    }
  }, [user]);

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      const response = await profileAPI.getProfile();
      if (response.data) {
        setProfileData(response.data);
        setEditFormData(response.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserProjects = async () => {
    try {
      if (user?.id) {
        const response = await projectsAPI.getProjectsByUserId(user.id);
        if (response.data) {
          setUserProjects(Array.isArray(response.data) ? response.data : []);
        }
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setUserProjects([]);
    }
  };

  const handleProjectUpdate = (projectId, updates) => {
    setUserProjects((prevProjects) =>
      prevProjects.map((project) =>
        project._id === projectId ? { ...project, ...updates } : project
      )
    );
  };

  const handleAvatarUpload = async (file) => {
    try {
      const response = await profileAPI.uploadAvatar(file);
      if (response.data?.avatarUrl) {
        setProfileData((prev) => ({ ...prev, avatarUrl: response.data.avatarUrl }));
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Failed to upload avatar. Please try again.');
    }
  };

  const handleEditProfile = () => {
    setEditFormData(profileData);
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditFormData(profileData);
    setIsEditMode(false);
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      const response = await profileAPI.updateProfile(editFormData);
      if (response.data) {
        setProfileData(response.data);
        setIsEditMode(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('socialLinks.')) {
      const socialKey = name.split('.')[1];
      setEditFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value,
        },
      }));
    } else {
      setEditFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const stats = [
    { label: 'Projects', value: userProjects.length },
    { label: 'Total Likes', value: userProjects.reduce((sum, p) => sum + (p.likesCount || 0), 0) },
    { label: 'Total Views', value: userProjects.reduce((sum, p) => sum + (p.viewsCount || 0), 0) },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              {profileData.avatarUrl ? (
                <img
                  src={profileData.avatarUrl}
                  alt={user?.name}
                  className="w-32 h-32 rounded-full object-cover shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              )}
              <button
                onClick={() => setIsAvatarPopupOpen(true)}
                className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md hover:bg-blue-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{user?.name}</h1>
              {isEditMode ? (
                <div className="space-y-3 max-w-2xl">
                  <input
                    type="text"
                    name="college"
                    value={editFormData.college || ''}
                    onChange={handleInputChange}
                    placeholder="University/College"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    name="contactEmail"
                    value={editFormData.contactEmail || ''}
                    onChange={handleInputChange}
                    placeholder="Contact Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    name="bio"
                    value={editFormData.bio || ''}
                    onChange={handleInputChange}
                    placeholder="Bio"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      name="socialLinks.linkedin"
                      value={editFormData.socialLinks?.linkedin || ''}
                      onChange={handleInputChange}
                      placeholder="LinkedIn URL"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="socialLinks.twitter"
                      value={editFormData.socialLinks?.twitter || ''}
                      onChange={handleInputChange}
                      placeholder="Twitter URL"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="socialLinks.facebook"
                      value={editFormData.socialLinks?.facebook || ''}
                      onChange={handleInputChange}
                      placeholder="Facebook URL"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="socialLinks.instagram"
                      value={editFormData.socialLinks?.instagram || ''}
                      onChange={handleInputChange}
                      placeholder="Instagram URL"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-lg text-gray-600 mb-2">{profileData.college || 'No college specified'}</p>
                  <p className="text-gray-500 mb-4">{user?.email}</p>
                  {profileData.contactEmail && profileData.contactEmail !== user?.email && (
                    <p className="text-gray-500 mb-4">Contact: {profileData.contactEmail}</p>
                  )}
                  <p className="text-gray-700 mb-4 max-w-2xl">{profileData.bio || 'No bio yet'}</p>
                  {(profileData.socialLinks?.linkedin || profileData.socialLinks?.twitter || profileData.socialLinks?.facebook || profileData.socialLinks?.instagram) && (
                    <div className="flex gap-3 justify-center md:justify-start mb-4">
                      {profileData.socialLinks.linkedin && (
                        <a href={profileData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                      )}
                      {profileData.socialLinks.twitter && (
                        <a href={profileData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                        </a>
                      )}
                      {profileData.socialLinks.facebook && (
                        <a href={profileData.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                        </a>
                      )}
                      {profileData.socialLinks.instagram && (
                        <a href={profileData.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        </a>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-2">
              {isEditMode ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    disabled={isSaving}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/upload"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-center"
                  >
                    Upload Project
                  </Link>
                  <button
                    onClick={handleEditProfile}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
                  >
                    Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* User Projects */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Projects</h2>
            <Link
              to="/upload"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-sm"
            >
              + New Project
            </Link>
          </div>

          {userProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userProjects.map((project) => (
                <ProjectCard 
                  key={project._id || project.id} 
                  project={project} 
                  onUpdate={handleProjectUpdate}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-500 mb-6">Start showcasing your work by uploading your first project!</p>
              <Link
                to="/upload"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Upload Your First Project
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Avatar Upload Popup */}
      <AvatarUploadPopup
        isOpen={isAvatarPopupOpen}
        onClose={() => setIsAvatarPopupOpen(false)}
        onUpload={handleAvatarUpload}
        currentAvatar={profileData.avatarUrl}
      />
    </div>
  );
}

