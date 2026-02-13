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

      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <div className="text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-line text-center mb-3">
            {content.ourStory.storyText1}
          </div>
          <div className="text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-line text-center">
            {content.ourStory.storyText2}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurStory

