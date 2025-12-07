const WeddingParty = () => {
  const bridesmaids = [
    {
      name: "Maid of Honor",
      label: "Maid of Honor",
      image: "placeholder1"
    },
    {
      name: "Bridesmaid",
      label: "Bridesmaid",
      image: "placeholder2"
    },
    {
      name: "Bridesmaid",
      label: "Bridesmaid",
      image: "placeholder3"
    }
  ]

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
        {bridesmaids.map((bridesmaid, index) => (
          <div key={index} className="relative">
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
        {[1, 2, 3].map((index) => (
          <div key={index} className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-200 via-green-200 to-purple-200 rounded-lg overflow-hidden shadow-lg">
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <span className="text-xs sm:text-sm">Photo Placeholder</span>
              </div>
            </div>
            <p className="text-center mt-4 text-gray-700 font-medium text-sm sm:text-base">Groomsman</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeddingParty

