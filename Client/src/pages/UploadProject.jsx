import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UploadProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    university: '',
    tags: '',
    image: null,
    githubLink: '',
    liveLink: '',
    technologies: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validation
    if (!formData.title || !formData.description) {
      setError('Title and description are required.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'image' && formData.image) {
          submitData.append('image', formData.image);
        } else if (formData[key]) {
          submitData.append(key, formData[key]);
        }
      });

      // TODO: Replace with actual API call
      // const response = await fetch('/api/projects', {
      //   method: 'POST',
      //   body: submitData,
      // });
      // if (!response.ok) throw new Error('Failed to upload project');

      console.log('Project data:', formData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate to profile after successful upload
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Failed to upload project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Upload Your Project</h1>

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="e.g., AI-Powered Learning Assistant"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                placeholder="Describe your project in detail..."
              />
            </div>

            {/* University */}
            <div>
              <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-2">
                University
              </label>
              <input
                type="text"
                id="university"
                name="university"
                value={formData.university}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="e.g., MIT, Stanford, Harvard"
              />
            </div>

            {/* Technologies */}
            <div>
              <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 mb-2">
                Technologies Used
              </label>
              <input
                type="text"
                id="technologies"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="e.g., React, Node.js, Python, TensorFlow"
              />
              <p className="mt-1 text-sm text-gray-500">Separate technologies with commas</p>
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="e.g., AI, Machine Learning, Education"
              />
              <p className="mt-1 text-sm text-gray-500">Separate tags with commas</p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Link
                </label>
                <input
                  type="url"
                  id="githubLink"
                  name="githubLink"
                  value={formData.githubLink}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="https://github.com/username/repo"
                />
              </div>
              <div>
                <label htmlFor="liveLink" className="block text-sm font-medium text-gray-700 mb-2">
                  Live Demo Link
                </label>
                <input
                  type="url"
                  id="liveLink"
                  name="liveLink"
                  value={formData.liveLink}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="https://yourproject.com"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Project Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors duration-200">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="image"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  {formData.image && (
                    <p className="text-sm text-blue-600 mt-2">{formData.image.name}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <span>Upload Project</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

