import { useState } from 'react';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  // Sample projects - replace with API call
  const allProjects = [
    {
      id: 1,
      title: 'AI-Powered Learning Assistant',
      description: 'An intelligent tutoring system that adapts to student learning patterns using machine learning algorithms.',
      author: 'Sarah Johnson',
      university: 'MIT',
      tags: ['AI', 'Machine Learning', 'Education'],
      likes: 234,
      views: 1200,
    },
    {
      id: 2,
      title: 'Sustainable Energy Monitoring System',
      description: 'IoT-based solution for real-time energy consumption tracking and optimization in smart buildings.',
      author: 'Michael Chen',
      university: 'Stanford',
      tags: ['IoT', 'Sustainability', 'Energy'],
      likes: 189,
      views: 980,
    },
    {
      id: 3,
      title: 'Virtual Reality Campus Tour',
      description: 'Immersive VR experience allowing prospective students to explore university campuses remotely.',
      author: 'Emily Rodriguez',
      university: 'Harvard',
      tags: ['VR', 'Web Development', 'Education'],
      likes: 156,
      views: 750,
    },
    {
      id: 4,
      title: 'Blockchain Voting System',
      description: 'Secure and transparent voting platform using blockchain technology for student elections.',
      author: 'James Wilson',
      university: 'Oxford',
      tags: ['Blockchain', 'Security', 'Web3'],
      likes: 298,
      views: 1500,
    },
    {
      id: 5,
      title: 'Smart Health Monitoring App',
      description: 'Mobile application for tracking health metrics and providing personalized wellness recommendations.',
      author: 'Lisa Anderson',
      university: 'Cambridge',
      tags: ['Mobile', 'Health', 'AI'],
      likes: 167,
      views: 890,
    },
    {
      id: 6,
      title: 'Automated Code Review Tool',
      description: 'AI-powered tool that automatically reviews code and suggests improvements for better code quality.',
      author: 'Robert Lee',
      university: 'Caltech',
      tags: ['AI', 'Development', 'Tools'],
      likes: 245,
      views: 1100,
    },
  ];

  const tags = ['All', 'AI', 'Machine Learning', 'IoT', 'Web Development', 'Mobile', 'Blockchain', 'VR', 'Education'];

  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'All' || project.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Projects</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover innovative projects from students across universities worldwide
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedTag === tag
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-gray-600">
          Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No projects found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

