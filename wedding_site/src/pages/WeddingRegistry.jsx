import { useState } from 'react'

const WeddingRegistry = () => {
  const registryUrl = "https://www.myregistry.com/wedding-registry/nakia-francis-and-phillip-tritz-lethbridge-ab/4809068"
  const [showPassword, setShowPassword] = useState(false)
  const [copied, setCopied] = useState(false)
  const password = "nakia&phillip4life"

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy password:', err)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="font-script text-5xl md:text-6xl text-green-800 mb-4">
          Wedding Registry
        </h1>
        <div className="flex justify-center items-center space-x-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-purple-400"></div>
          <div className="w-2 h-2 rounded-full bg-purple-300"></div>
          <div className="w-3 h-3 rounded-full bg-purple-400"></div>
        </div>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Your presence at our wedding is the greatest gift of all. 
          However, if you'd like to help us start our new life together, 
          we've created a universal wedding registry where you can find gifts from all your favorite stores:
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            MyRegistry.com
          </h3>
          <p className="text-gray-600 mb-6">
            Visit our universal wedding registry to see all of our gift preferences from stores you love.
          </p>
          <a
            href={registryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors mb-4"
          >
            Visit Our Registry
          </a>
          <div className="mt-4">
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium mb-2"
            >
              {showPassword ? 'Hide Password' : 'Click for Password'}
            </button>
            {showPassword && (
              <div className="mt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={password}
                    readOnly
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-center font-mono text-gray-700"
                    onClick={(e) => e.target.select()}
                  />
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 italic">
          Thank you for thinking of us!
        </p>
      </div>
    </div>
  )
}

export default WeddingRegistry

