import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';

export default function Profile() {
  // Sample user data - replace with API call
  const [userData] = useState({
    name: 'John Doe',
    email: 'john.doe@university.edu',
    university: 'MIT',
    bio: 'Passionate developer and innovator. Love building projects that make a difference.',
    avatar: null,
    joinDate: '2024-01-15',
  });

  // Sample user projects - replace with API call
  const userProjects = [
    {
      id: 1,
      title: 'AI-Powered Learning Assistant',
      description: 'An intelligent tutoring system that adapts to student learning patterns using machine learning algorithms.',
      author: userData.name,
      university: userData.university,
      tags: ['AI', 'Machine Learning', 'Education'],
      likes: 234,
      views: 1200,
    },
    {
      id: 2,
      title: 'Smart Health Monitoring App',
      description: 'Mobile application for tracking health metrics and providing personalized wellness recommendations.',
      author: userData.name,
      university: userData.university,
      tags: ['Mobile', 'Health', 'AI'],
      likes: 167,
      views: 890,
    },
  ];

  const stats = [
    { label: 'Projects', value: userProjects.length },
    { label: 'Total Likes', value: userProjects.reduce((sum, p) => sum + p.likes, 0) },
    { label: 'Total Views', value: userProjects.reduce((sum, p) => sum + p.views, 0) },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {userData.name.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md hover:bg-blue-700 transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{userData.name}</h1>
              <p className="text-lg text-gray-600 mb-2">{userData.university}</p>
              <p className="text-gray-500 mb-4">{userData.email}</p>
              <p className="text-gray-700 mb-4 max-w-2xl">{userData.bio}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <span className="text-sm text-gray-500">
                  Member since {new Date(userData.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-2">
              <Link
                to="/upload"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-center"
              >
                Upload Project
              </Link>
              <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200">
                Edit Profile
              </button>
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
                <ProjectCard key={project.id} project={project} />
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
    </div>
  );
}

