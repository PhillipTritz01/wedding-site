import { useState, useEffect } from 'react'

const AccessGate = ({ children }) => {
  const [isGranted, setIsGranted] = useState(false)
  const [accessCode, setAccessCode] = useState('')
  const [error, setError] = useState('')
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Check localStorage on mount
    const granted = localStorage.getItem('wedding-access-granted') === 'true'
    setIsGranted(granted)
    setIsChecking(false)

    // Warn if access code is missing
    if (!import.meta.env.VITE_WEDDING_ACCESS_CODE) {
      console.warn('VITE_WEDDING_ACCESS_CODE is not set in environment variables')
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const envCode = import.meta.env.VITE_WEDDING_ACCESS_CODE

    if (!envCode) {
      setError('Access code not configured. Please contact the site administrator.')
      return
    }

    if (accessCode.trim() === envCode) {
      localStorage.setItem('wedding-access-granted', 'true')
      setIsGranted(true)
    } else {
      setError('Incorrect access code. Please try again.')
      setAccessCode('')
    }
  }

  // Show loading state while checking localStorage
  if (isChecking) {
    return null
  }

  // If access is granted, render children
  if (isGranted) {
    return <>{children}</>
  }

  // Show access gate
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="font-script text-4xl md:text-5xl text-green-800 mb-2">
            Welcome
          </h1>
          <p className="text-gray-600">
            Please enter the access code from your invitation
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="access-code" className="block text-gray-700 font-medium mb-2">
              Access Code
            </label>
            <input
              type="password"
              id="access-code"
              value={accessCode}
              onChange={(e) => {
                setAccessCode(e.target.value)
                setError('')
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter access code"
              autoFocus
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  )
}

export default AccessGate

