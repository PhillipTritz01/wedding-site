import { useState, useEffect } from 'react'
import { fetchContent, getFileUrl } from '../utils/cms'

const WeddingParty = () => {
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
          Bridesmaids
        </h1>
        <div className="flex justify-center items-center space-x-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-purple-400"></div>
          <div className="w-2 h-2 rounded-full bg-purple-300"></div>
          <div className="w-3 h-3 rounded-full bg-purple-400"></div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto mb-12 px-4">
        {content.weddingParty.bridesmaids.map((bridesmaid, index) => (
          <div key={index} className="relative">
            {bridesmaid.image ? (
              <div className="aspect-square rounded-lg overflow-hidden shadow-lg relative">
                <img 
                  src={getFileUrl(bridesmaid.image)} 
                  alt={bridesmaid.name}
                  className="w-full h-full object-cover"
                />
                {bridesmaid.label && (
                  <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                    {bridesmaid.label}
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-square bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 rounded-lg overflow-hidden shadow-lg relative">
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <span className="text-xs sm:text-sm">Photo Placeholder</span>
                </div>
                {bridesmaid.label && (
                  <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                    {bridesmaid.label}
                  </div>
                )}
              </div>
            )}
            <p className="text-center mt-4 text-gray-700 font-medium text-sm sm:text-base">{bridesmaid.name}</p>
          </div>
        ))}
      </div>

      {/* Groomsmen Section */}
      <div className="text-center mt-12 sm:mt-16 mb-12 px-4">
        <h1 className="font-script text-4xl sm:text-5xl md:text-6xl text-green-800 mb-4">
          Groomsmen
        </h1>
        <div className="flex justify-center items-center space-x-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-purple-400"></div>
          <div className="w-2 h-2 rounded-full bg-purple-300"></div>
          <div className="w-3 h-3 rounded-full bg-purple-400"></div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto px-4">
        {content.weddingParty.groomsmen.map((groomsman, index) => (
          <div key={index} className="relative">
            {groomsman.image ? (
              <div className="aspect-square rounded-lg overflow-hidden shadow-lg relative">
                <img 
                  src={getFileUrl(groomsman.image)} 
                  alt={groomsman.name}
                  className="w-full h-full object-cover"
                />
                {groomsman.label && (
                  <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                    {groomsman.label}
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-square bg-gradient-to-br from-blue-200 via-green-200 to-purple-200 rounded-lg overflow-hidden shadow-lg relative">
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <span className="text-xs sm:text-sm">Photo Placeholder</span>
                </div>
                {groomsman.label && (
                  <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                    {groomsman.label}
                  </div>
                )}
              </div>
            )}
            <p className="text-center mt-4 text-gray-700 font-medium text-sm sm:text-base">{groomsman.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeddingParty

