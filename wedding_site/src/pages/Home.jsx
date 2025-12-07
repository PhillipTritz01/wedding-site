import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Placeholder - Replace with actual image */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
          <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6">
          <h1 className="font-script text-4xl sm:text-5xl md:text-7xl mb-4">
            Phillip & Nakia
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">
            Wedding
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-8 px-2">
            Aug 17, 2026, 3:00 p.m. | Lethbridge
          </p>
          <Link
            to="/rsvp"
            className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
          >
            RSVP Now
          </Link>
        </div>

        {/* Navigation Arrows - Hidden on mobile */}
        <button className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-3 text-white transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-3 text-white transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Home

