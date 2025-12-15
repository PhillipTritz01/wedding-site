import { useState, useEffect } from 'react'
import { fetchContent } from '../utils/cms'

const WeddingRegistry = () => {
  const [content, setContent] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [copied, setCopied] = useState(false)

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

  const registryUrl = content.weddingRegistry.registryUrl
  const password = content.weddingRegistry.password

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
      <div className="text-center mb-12 px-4">
        <h1 className="font-script text-4xl sm:text-5xl md:text-6xl text-green-800 mb-4">
          Wedding Registry
        </h1>
        <p className="text-gray-700 text-base sm:text-lg max-w-2xl mx-auto px-4 mb-8">
          Your presence at our wedding is the greatest gift of all. 
          However, if you'd like to help us start our new life together, 
          we've created a universal wedding registry where you can find gifts from all your favorite stores:
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 text-center hover:shadow-lg transition-shadow">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            MyRegistry.com
          </h3>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Visit our universal wedding registry to see all of our gift preferences from stores you love.
          </p>
          <a
            href={registryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors mb-4 text-sm sm:text-base"
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
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={password}
                    readOnly
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-center font-mono text-gray-700 text-sm sm:text-base"
                    onClick={(e) => e.target.select()}
                  />
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap text-sm sm:text-base"
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

