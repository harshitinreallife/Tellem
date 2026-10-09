# **Tell’em 💬**

**Your space. Your voice. Your anonymity.**

Tell’em is an anonymous messaging web application that allows users to receive messages without revealing the sender's identity. Users can create their own profiles, share their profile links through social media, and receive anonymous messages from friends or anyone with access to their link.

🌐 **Live Demo:** https://tellem.live

## ✨ Features

* **User Authentication:** Secured sign-up,verify email and sign-in using credentials.
* **Anonymous Messaging:** Send messages anonymously to other users  and receive messages by sharing your unique public profile link.
* **Personalized Profiles:** Each user has a unique username and public messaging url.
* **Message Management:** View and delete received messages.
* **Message Acceptance Controls:** Enable or disable incoming messages.
* **Shareable Profile Links:** Share your profile link to receive anonymous messages.
* **AI-Powered Suggestions:** Generate message suggestions using AI.
* **Responsive Design:** Clean interface designed for desktop, tablet, and mobile devices.
* **Protected Routes:** Restrict access to authenticated areas of the application.

## 🛠️ Tech Stack

* Next.js [app router]
* React
* TypeScript
* Tailwind CSS
* MongoDB
* NextAuth
* Zod for validation
* shad cn ui 
* React Hook Form
* GSAP for smooth animations
* AI SDK/Gemini for AI-Powered Suggestions 
* Brevo SMTP for sending emails
* Vercel for deployment
* Git & GitHub for version control



## 🚀 Getting Started

Follow these steps to run Tell’em locally.

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* Git
* A MongoDB database


### 1. Clone the repository

```bash
git clone https://github.com/harshitinreallife/Tellem.git
```

Navigate into the project directory:

```bash
cd YOUR_REPOSITORY
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory.

Add the environment variables required by your application:

```env
MONGO_URI=your_mongodb_connection_string

NEXTAUTH_SECRET=your_nextauth_secret

NEXTAUTH_URL=http://localhost:3000

GOOGLE_AI_KEY=your_google_ai_api_key

BREVO_SMTP_USER=your_brevo_smtp_user

BREVO_SMTP_PASS=your_brevo_smtp_pass

EMAIL_FROM=your_email_from
```

Configure your Brevo SMTP credentials using the exact variable names expected by your application's email configuration.


**Important:** Replace the example values with your own credentials. Never commit `.env.local` or expose API keys, database credentials, SMTP passwords, or authentication secrets in your repository.

### 4. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 5. Build for production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## 🌍 Deployment

Tell’em is deployed on Vercel.

Visit the live application:

**https://tellem.live**


## 🔮 Future Improvements

* Google OAuth sign-in and registration
* Improved user profile customization
* Enhanced message filtering and moderation
* Additional AI-powered features


**Built with ❤️ using Next.js and TypeScript.**
