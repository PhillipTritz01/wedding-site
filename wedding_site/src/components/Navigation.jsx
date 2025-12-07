import { Link, useLocation } from 'react-router-dom'

const Navigation = () => {
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/') && location.pathname === '/' ? 'text-purple-600' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/our-story"
              className={`text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/our-story') ? 'text-purple-600' : ''
              }`}
            >
              Our Story
            </Link>
            <Link
              to="/the-wedding"
              className={`text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/the-wedding') ? 'text-purple-600' : ''
              }`}
            >
              The Wedding
            </Link>
            <Link
              to="/wedding-party"
              className={`text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/wedding-party') ? 'text-purple-600' : ''
              }`}
            >
              Wedding Party
            </Link>
            <Link
              to="/wedding-registry"
              className={`text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/wedding-registry') ? 'text-purple-600' : ''
              }`}
            >
              Wedding Registry
            </Link>
          </div>
          <Link
            to="/rsvp"
            className="px-6 py-2 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded transition-colors font-medium"
          >
            RSVP
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

