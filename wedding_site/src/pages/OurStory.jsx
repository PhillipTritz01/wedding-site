import { useState, useEffect } from 'react'
import { fetchContent, getFileUrl } from '../utils/cms'

const OurStory = () => {
  const [content, setContent] = useState(null)

  useEffect(() => {
    fetchContent().then(data => setContent(data))
  }, [])

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12 px-4">
        <h1 className="font-script text-4xl sm:text-5xl md:text-6xl text-green-800 mb-4">
          Our Story
        </h1>
        <div className="flex justify-center items-center space-x-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-purple-400"></div>
          <div className="w-2 h-2 rounded-full bg-purple-300"></div>
          <div className="w-3 h-3 rounded-full bg-purple-400"></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-12 px-4">
        {/* Image 1 */}
        <div className="relative">
          {content.ourStory.image1 ? (
            <img 
              src={getFileUrl(content.ourStory.image1)} 
              alt="Our Story" 
              className="aspect-square object-cover rounded-lg shadow-lg"
            />
          ) : (
            <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg overflow-hidden shadow-lg">
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <span className="text-xs sm:text-sm">Photo Placeholder</span>
              </div>
            </div>
          )}
        </div>

        {/* Image 2 */}
        <div className="relative">
          {content.ourStory.image2 ? (
            <img 
              src={getFileUrl(content.ourStory.image2)} 
              alt="Our Story" 
              className="aspect-square object-cover rounded-lg shadow-lg"
            />
          ) : (
            <div className="aspect-square bg-gradient-to-br from-blue-200 to-green-200 rounded-lg overflow-hidden shadow-lg">
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <span className="text-xs sm:text-sm">Photo Placeholder</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto text-center px-4">
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
          {content.ourStory.storyText1}
        </p>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          {content.ourStory.storyText2}
        </p>
      </div>

      {/* Navigation Arrow - Hidden on mobile */}
      <button className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-3 text-white transition-all">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  )
}

export default OurStory

