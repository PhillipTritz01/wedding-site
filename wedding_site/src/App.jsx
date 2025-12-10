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
  return (
    <Router>
      <div className="min-h-screen bg-blue-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/the-wedding" element={<TheWedding />} />
          <Route path="/wedding-party" element={<WeddingParty />} />
          <Route path="/wedding-registry" element={<WeddingRegistry />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

