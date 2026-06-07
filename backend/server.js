import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ──────────────────────────────────────
// Resume / Portfolio Data
// ──────────────────────────────────────
const portfolioData = {
  personal: {
    name: 'Niranjan S',
    title: 'Full Stack Developer',
    tagline: 'Passionate for Innovation and Problem Solving',
    phone: '+91 97914-90812',
    email: 'niranjan20051008@gmail.com',
    location: 'Kallal, Sivaganga District - 630305',
    linkedin: 'https://www.linkedin.com/in/niranjan-s-bb99b1296'
  },
  objective: 'Fresh and motivated Full Stack Developer with a passion for innovation and problem solving. Skilled in building scalable front-end and back-end solutions with strong technical expertise. Seeking opportunities to deliver impactful, end-to-end applications in a forward-thinking organization.',
  education: [
    {
      institution: 'Rajalakshmi Institute of Technology',
      degree: 'Bachelor of Computer Science and Business System',
      period: '2023 - 2027',
      score: '85%',
      type: 'B.E.'
    },
    {
      institution: 'Shanthi Rani Matric Hr Sec School',
      degree: 'HSC',
      period: '2022 - 2023',
      score: '96%',
      type: 'HSC'
    },
    {
      institution: 'Shanthi Rani Matric Hr Sec School',
      degree: 'SSLC',
      period: '2020 - 2021',
      score: 'Pass',
      type: 'SSLC'
    }
  ],
  skills: {
    languages: ['Java', 'Basic Python', 'C', 'SQL Basics'],
    webDevelopment: ['Advanced CSS', 'HTML', 'JavaScript'],
    tools: ['MySQL', 'UNIX Design', 'Figma', 'Tableau', 'Excel', 'Flutter', 'PowerBI', 'Kotlin'],
    frameworks: ['ReactJS', 'NodeJS', 'Express JS', 'Django']
  },
  certifications: [
    { provider: 'SKILLNATION', title: 'AI Dashboards using Microsoft Power BI' },
    { provider: 'SOLO LEARN', title: 'SQL Intermediate, Introduction to SQL' },
    { provider: 'SCALER', title: 'Unsupervised Machine Learning' },
    { provider: 'MongoDB', title: 'MongoDB Transactions' }
  ],
  projects: [
    {
      id: 1,
      title: 'Disaster Management',
      description: 'Developed a scalable mobile application for real-time disaster response, featuring emergency alerts, SOS services, shelter location navigation, and donation support. The system achieved a fast 2.1-second SOS response time with 92.4% alert accuracy.',
      tech: ['React Native', 'Node.js', 'MongoDB', 'Firebase'],
      highlights: ['2.1s SOS response time', '92.4% alert accuracy', '10,000+ users supported']
    },
    {
      id: 2,
      title: 'ECHOGUARD: ML-Based Early Warning System',
      description: 'A web-based application designed to detect early signs of software project failure using Machine Learning. Integrates React frontend, Django backend, and PostgreSQL database to provide real-time insights into project health.',
      tech: ['React', 'Django', 'PostgreSQL', 'Scikit-learn', 'Random Forest'],
      highlights: ['OTP-based authentication', 'Risk scoring (Low/Medium/High)', 'GitHub API integration']
    },
    {
      id: 3,
      title: 'Social Media Automation Platform',
      description: 'A smart social media automation system that allows users to manage and publish content across multiple platforms including Instagram, YouTube, LinkedIn, and Facebook. Features auto-scheduling and DM auto-trigger.',
      tech: ['React', 'Node.js', 'Express', 'Social Media APIs'],
      highlights: ['Multi-platform publishing', 'Auto-scheduling', 'DM auto-trigger']
    }
  ],
  internships: [
    { company: 'NSIC - Technical Services Centre', role: 'Android App Development' },
    { company: 'Codec', role: 'UI/UX Design + Website Development' },
    { company: 'INTERNPE', role: 'Foundation of AI' },
    { company: '1stop / Green Intern (Salesforce)', role: 'AI & Data Tools, Dashboard Creation, Reports' },
    { company: 'Hivericks Technology', role: 'Full Stack Development' }
  ],
  interests: [
    'Web Development',
    'Competitive Programming',
    'Problem Solving in Hackathons',
    'User Interface Design',
    'Creating New Apps'
  ]
};

// ──────────────────────────────────────
// API Routes
// ──────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running', timestamp: new Date().toISOString() });
});

// Get all portfolio data
app.get('/api/portfolio', (req, res) => {
  res.json({ success: true, data: portfolioData });
});

// Get specific sections
app.get('/api/portfolio/:section', (req, res) => {
  const { section } = req.params;
  if (portfolioData[section]) {
    res.json({ success: true, data: portfolioData[section] });
  } else {
    res.status(404).json({ success: false, message: 'Section not found' });
  }
});

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, message, permission } = req.body;

  // Validation
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required.'
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email address.'
    });
  }

  try {
    console.log(`\n📩 New Contact Submission from ${firstName} ${lastName} (${email})`);

    // Prepare email options
    const mailOptions = {
      from: `"${firstName} ${lastName}" <${email}>`,
      to: process.env.EMAIL_USER || 'niranjan20051008@gmail.com',
      replyTo: email,
      subject: `New Portfolio Message from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #ff2a2a;">New Message via Portfolio Contact Form</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Permission to Contact:</strong> ${permission ? 'Yes' : 'No'}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <h3 style="color: #333;">Message:</h3>
          <p style="white-space: pre-wrap; color: #555; background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
    };

    // Send the email if App Password is set
    if (process.env.EMAIL_PASS && process.env.EMAIL_PASS !== 'your_16_character_app_password_here') {
      await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully via Nodemailer');
    } else {
      console.log('⚠️ Email not sent. Please set up EMAIL_PASS in the backend/.env file to enable real email sending.');
    }

    res.json({
      success: true,
      message: `Thanks ${firstName}! Your message has been sent successfully.`
    });
  } catch (error) {
    console.error('❌ Contact form email sending error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please ensure email credentials are correct or try again later.'
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Niranjan Portfolio Backend`);
  console.log(`   Running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   Data:   http://localhost:${PORT}/api/portfolio\n`);
});
