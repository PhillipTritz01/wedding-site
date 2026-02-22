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
        <div className="mb-12">
          <h2 className="font-script text-3xl sm:text-4xl text-green-800 mb-6 text-center">
            Accommodation
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-6">
            <div className="text-gray-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {content.theWedding.accommodation}
            </div>
          </div>
        </div>
      </div>

      {/* Week Of Schedule Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="font-script text-3xl sm:text-4xl text-green-800 mb-4 sm:mb-6 text-center">
          Week Of Schedule
        </h2>
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <div className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line text-center">
            {content.theWedding.weekOfScheduleIntro || ''}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {content.theWedding.calendar && content.theWedding.calendar.map((day, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 sm:p-6 min-h-[150px] sm:min-h-[200px]">
                <div className="text-center mb-3 sm:mb-4">
                  <div className="font-semibold text-gray-800 text-sm sm:text-base">{day.date}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{day.day}</div>
                </div>
                <div className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {day.text || <span className="text-gray-400 italic">No events</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TheWedding

