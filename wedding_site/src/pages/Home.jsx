import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchContent, getFileUrl } from '../utils/cms'

const Home = () => {
  const [content, setContent] = useState(null)

  useEffect(() => {
    fetchContent().then(data => setContent(data))
  }, [])

  const getYouTubeEmbedUrl = (url) => {
    if (url.includes('youtube.com/embed')) {
      const videoId = url.match(/embed\/([^?]+)/)?.[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0`;
    } else if (url.includes('youtube.com/watch')) {
      const videoId = url.match(/[?&]v=([^&]+)/)?.[1];
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0` : url;
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0` : url;
    }
    return url;
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video or Image */}
        {content.home.heroVideo ? (
          <div className="absolute inset-0">
            {content.home.heroVideo.includes('youtube.com') || content.home.heroVideo.includes('youtu.be') ? (
              // YouTube embed
              <iframe
                src={getYouTubeEmbedUrl(content.home.heroVideo)}
                className="w-full h-full"
                style={{ objectFit: 'cover', border: 'none' }}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              // Direct video file
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={getFileUrl(content.home.heroVideo)} type="video/mp4" />
                <source src={getFileUrl(content.home.heroVideo)} type="video/webm" />
              </video>
            )}
            <div className="absolute inset-0 bg-black opacity-20"></div>
          </div>
        ) : content.home.heroImage ? (
          <div className="absolute inset-0">
            <img 
              src={getFileUrl(content.home.heroImage)} 
              alt="Wedding" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-20"></div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
            <div className="absolute inset-0 bg-black opacity-20"></div>
          </div>
        )}
        
        {/* Content Overlay */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6">
          <h1 className="font-script text-4xl sm:text-5xl md:text-7xl mb-4">
            {content.home.coupleName}
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">
            {content.home.weddingTitle}
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-8 px-2">
            {content.home.date} | {content.home.location}
          </p>
          <Link
            to="/rsvp"
            className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
          >
            RSVP Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home

