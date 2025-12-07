const OurStory = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="font-script text-5xl md:text-6xl text-green-800 mb-4">
          Our Story
        </h1>
        <div className="flex justify-center items-center space-x-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-purple-400"></div>
          <div className="w-2 h-2 rounded-full bg-purple-300"></div>
          <div className="w-3 h-3 rounded-full bg-purple-400"></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
        {/* Image Placeholder 1 */}
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg overflow-hidden shadow-lg">
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <span className="text-sm">Photo Placeholder</span>
            </div>
          </div>
        </div>

        {/* Image Placeholder 2 */}
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-blue-200 to-green-200 rounded-lg overflow-hidden shadow-lg">
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <span className="text-sm">Photo Placeholder</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto text-center">
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          We met in the most unexpected way, and from that moment on, we knew our lives would never be the same. 
          Through laughter, adventures, and countless memories, our love has grown stronger each day.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          Now, we're excited to celebrate this next chapter together with all of you, our family and friends, 
          as we say "I do" and begin our journey as husband and wife.
        </p>
      </div>

      {/* Navigation Arrow */}
      <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-3 text-white transition-all">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  )
}

export default OurStory

