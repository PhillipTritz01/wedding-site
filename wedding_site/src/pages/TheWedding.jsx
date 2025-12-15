import { useState, useEffect } from 'react'
import { fetchContent } from '../utils/cms'

const TheWedding = () => {
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
          Big Day
        </h1>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-12 text-center">
          <div className="text-gray-600 text-base sm:text-lg whitespace-pre-line">
            {content.theWedding.eventDetails}
          </div>
        </div>

        {/* Getting There Section */}
        <div className="mb-12">
          <h2 className="font-script text-3xl sm:text-4xl text-green-800 mb-6 text-center">
            Getting There
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <div className="text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {content.theWedding.gettingThere}
            </div>
          </div>
        </div>

        {/* Accommodation Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center">
            ACCOMMODATION
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <div className="text-gray-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {content.theWedding.accommodation}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TheWedding

