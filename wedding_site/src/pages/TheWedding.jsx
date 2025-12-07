const TheWedding = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="font-script text-5xl md:text-6xl text-green-800 mb-4">
          Big Day
        </h1>
        <div className="flex justify-center items-center space-x-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-purple-400"></div>
          <div className="w-2 h-2 rounded-full bg-purple-300"></div>
          <div className="w-3 h-3 rounded-full bg-purple-400"></div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-12 text-center">
          <p className="text-gray-600 text-lg">
            No events at the moment
          </p>
        </div>

        {/* Getting There Section */}
        <div className="mb-12">
          <h2 className="font-script text-4xl text-green-800 mb-4 text-center">
            Getting There
          </h2>
          <div className="flex justify-center items-center space-x-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-purple-400"></div>
            <div className="w-2 h-2 rounded-full bg-purple-300"></div>
            <div className="w-3 h-3 rounded-full bg-purple-400"></div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-700 leading-relaxed">
              Venue details and directions will be provided closer to the date. 
              We can't wait to celebrate with you!
            </p>
          </div>
        </div>

        {/* Accommodation Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            ACCOMMODATION
          </h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-600 leading-relaxed">
              I'm a paragraph. Click here to add your own text and edit me. It's easy. 
              Just click 'Edit Text' or double click me to add your own content and make changes to the font. 
              Feel free to drag and drop me anywhere you like on your page. I'm a great place for you to tell a story.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TheWedding

