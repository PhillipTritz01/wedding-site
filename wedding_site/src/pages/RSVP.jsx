import { useState } from 'react'
import emailjs from '@emailjs/browser'

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    attending: '',
    dietary: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // EmailJS configuration
  // To set up EmailJS:
  // 1. Sign up at https://www.emailjs.com/
  // 2. Create an email service (Gmail, Outlook, etc.)
  // 3. Create an email template with these variables: {{name}}, {{attending}}, {{dietary}}, {{message}}
  // 4. In your template, set the "To Email" field to: phillip.tritz@gmail.com,nakiafrancis116@gmail.com
  //    OR create two separate templates and send twice
  // 5. Replace the values below with your credentials
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_3eaigbw'
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_79eebx9'
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'OYzk9FCNtls0004AZ'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const templateParams = {
        name: formData.name,
        attending: formData.attending === 'yes' ? 'Yes' : 'No',
        dietary: formData.dietary || 'None',
        message: formData.message || 'None',
        to_email: 'phillip.tritz@gmail.com,nakiafrancis116@gmail.com', // Both emails
      }

      // Check if EmailJS is configured
      if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || 
          EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || 
          EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        // Fallback: Use mailto if EmailJS is not configured
        const subject = encodeURIComponent(`RSVP from ${formData.name}`)
        const body = encodeURIComponent(
          `Name: ${formData.name}\n` +
          `Attending: ${formData.attending === 'yes' ? 'Yes' : 'No'}\n` +
          `${formData.dietary ? `Dietary Restrictions: ${formData.dietary}\n` : ''}` +
          `${formData.message ? `Message: ${formData.message}` : ''}`
        )
        // Note: mailto with multiple recipients may not work in all browsers
        // User will need to manually add the second email
        window.location.href = `mailto:phillip.tritz@gmail.com?cc=nakiafrancis116@gmail.com&subject=${subject}&body=${body}`
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
        setFormData({
          name: '',
          attending: '',
          dietary: '',
          message: ''
        })
        }, 3000)
        setIsSubmitting(false)
        return
      }

      // Send email using EmailJS to both recipients in a single email
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          ...templateParams,
          to_email: 'phillip.tritz@gmail.com,nakiafrancis116@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      )

      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: '',
          attending: '',
          dietary: '',
          message: ''
        })
      }, 3000)
    } catch (err) {
      console.error('Failed to send RSVP:', err)
      setError('Failed to send RSVP. Please try again or contact us directly at phillip.tritz@gmail.com or nakiafrancis116@gmail.com')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12 px-4">
        <h1 className="font-script text-4xl sm:text-5xl md:text-6xl text-green-800 mb-4">
          RSVP
        </h1>
        <p className="text-gray-700 text-base sm:text-lg px-4 mb-8">
          Please let us know if you'll be joining us on our special day!
        </p>
      </div>

      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 sm:p-8 text-center">
          <div className="text-green-600 text-4xl sm:text-5xl mb-4">✓</div>
          <h2 className="text-xl sm:text-2xl font-semibold text-green-800 mb-2">
            Thank You!
          </h2>
          <p className="text-green-700 text-sm sm:text-base">
            We've received your RSVP and can't wait to celebrate with you!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              Will you be attending? *
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  required
                  checked={formData.attending === 'yes'}
                  onChange={handleChange}
                  className="mr-2 text-purple-600"
                />
                <span className="text-gray-700 text-sm sm:text-base">Yes, I'll be there!</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  required
                  checked={formData.attending === 'no'}
                  onChange={handleChange}
                  className="mr-2 text-purple-600"
                />
                <span className="text-gray-700 text-sm sm:text-base">Sorry, I can't make it</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="dietary" className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              Dietary Restrictions or Allergies
            </label>
            <textarea
              id="dietary"
              name="dietary"
              rows="3"
              value={formData.dietary}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
              placeholder="Please let us know about any dietary restrictions..."
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              Message (Optional)
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
              placeholder="Leave us a message..."
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs sm:text-sm">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors text-sm sm:text-base"
          >
            {isSubmitting ? 'Sending...' : 'Submit RSVP'}
          </button>
        </form>
      )}
    </div>
  )
}

export default RSVP

