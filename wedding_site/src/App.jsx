import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import OurStory from './pages/OurStory'
import TheWedding from './pages/TheWedding'
import WeddingParty from './pages/WeddingParty'
import WeddingRegistry from './pages/WeddingRegistry'
import RSVP from './pages/RSVP'
import Admin from './pages/Admin'

function App() {
  // Detect hostname for subdomain-based routing
  const hostname = typeof window !== 'undefined' ? window.location.hostname : ''
  const isAdminSubdomain = hostname.startsWith('admin.')
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1'

  // If on admin subdomain, render Admin UI only (catch-all route)
  if (isAdminSubdomain) {
    return (
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/*" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    )
  }

  // Public site: render public routes, /admin only on localhost
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/the-wedding" element={<TheWedding />} />
          <Route path="/wedding-party" element={<WeddingParty />} />
          <Route path="/wedding-registry" element={<WeddingRegistry />} />
          <Route path="/rsvp" element={<RSVP />} />
          {isLocalhost && <Route path="/admin" element={<Admin />} />}
        </Routes>
      </div>
    </Router>
  )
}

export default App

