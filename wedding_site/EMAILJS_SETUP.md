# EmailJS Setup Instructions

To enable email sending for the RSVP form, you need to set up EmailJS (free service).

## Steps:

1. **Sign up at https://www.emailjs.com/** (free account)

2. **Create an Email Service:**
   - Go to "Email Services" in the dashboard
   - Click "Add New Service"
   - Choose your email provider (Gmail recommended)
   - Follow the setup instructions
   - Copy the Service ID

3. **Create an Email Template:**
   - Go to "Email Templates" in the dashboard
   - Click "Create New Template"
   - Use this template content:
   
   ```
   Subject: RSVP from {{name}}
   
   New RSVP Submission
   
   Name: {{name}}
   Email: {{email}}
   Attending: {{attending}}
   Number of Guests: {{guests}}
   Dietary Restrictions: {{dietary}}
   Message: {{message}}
   ```
   
   - In the "To Email" field, you can set: phillip.tritz@gmail.com (we'll send twice)
   - Copy the Template ID

4. **Get your Public Key:**
   - Go to "Account" → "General"
   - Copy your Public Key

5. **Configure the website:**
   
   Option A: Use environment variables (recommended)
   - Create a `.env` file in the project root:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
   
   Option B: Edit the RSVP.jsx file directly
   - Replace `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, and `YOUR_PUBLIC_KEY` in `src/pages/RSVP.jsx`

6. **Restart the development server** after adding environment variables

## Note:
The form will send emails to both:
- phillip.tritz@gmail.com
- nakiafrancis116@gmail.com

If EmailJS is not configured, the form will fall back to opening your email client with a mailto link.

