/**
 * Email Utility using Nodemailer
 * Handles sending emails for contact form and notifications
 */

const nodemailer = require('nodemailer');

/**
 * Create and configure email transporter
 * @returns {Object|null} Nodemailer transporter or null if not configured
 */
const createTransporter = () => {
  // Check if email credentials are configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️  Email credentials not configured. Email sending disabled.');
    return null;
  }

  try {
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false // For development; set to true in production
      }
    });

    return transporter;
  } catch (error) {
    console.error('❌ Error creating email transporter:', error.message);
    return null;
  }
};

/**
 * Send contact form notification email
 * @param {Object} contactData - Contact form data
 * @param {string} contactData.name - Sender name
 * @param {string} contactData.email - Sender email
 * @param {string} contactData.subject - Email subject
 * @param {string} contactData.message - Email message
 * @returns {Promise<Object>} Result of email sending
 */
const sendContactNotification = async ({ name, email, subject, message }) => {
  const transporter = createTransporter();
  
  if (!transporter) {
    return {
      success: false,
      message: 'Email service not configured'
    };
  }

  try {
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Form: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
              border-radius: 8px;
            }
            .header {
              background: linear-gradient(135deg, #4A00E0 0%, #8E2DE2 100%);
              color: white;
              padding: 20px;
              border-radius: 8px 8px 0 0;
              text-align: center;
            }
            .content {
              background: white;
              padding: 30px;
              border-radius: 0 0 8px 8px;
            }
            .field {
              margin-bottom: 20px;
            }
            .label {
              font-weight: bold;
              color: #4A00E0;
              margin-bottom: 5px;
            }
            .value {
              color: #555;
              padding: 10px;
              background-color: #f5f5f5;
              border-left: 3px solid #8E2DE2;
            }
            .footer {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              font-size: 12px;
              color: #999;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📧 New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">From:</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${subject}</div>
              </div>
              
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
              
              <div class="footer">
                <p>Sent on ${new Date().toLocaleString()}</p>
                <p>This is an automated message from your portfolio contact form.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        New Contact Form Submission
        
        From: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
        
        Sent on: ${new Date().toLocaleString()}
      `
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully:', info.messageId);
    
    return {
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    
    return {
      success: false,
      message: 'Failed to send email',
      error: error.message
    };
  }
};

/**
 * Send welcome email to new admin (optional)
 * @param {Object} userData - User data
 * @returns {Promise<Object>} Result of email sending
 */
const sendWelcomeEmail = async ({ email, username }) => {
  const transporter = createTransporter();
  
  if (!transporter) {
    return {
      success: false,
      message: 'Email service not configured'
    };
  }

  try {
    const mailOptions = {
      from: `"Portfolio Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Your Portfolio Admin Panel',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #4A00E0 0%, #8E2DE2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px; }
            .content { padding: 30px 0; }
            .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #4A00E0 0%, #8E2DE2 100%); color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Welcome ${username}!</h1>
            </div>
            <div class="content">
              <p>Your admin account has been successfully created.</p>
              <p>You can now access your portfolio admin panel to manage projects, view contact submissions, and update your content.</p>
              <p>Get started by logging in with your credentials.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    
    return {
      success: true,
      message: 'Welcome email sent successfully',
      messageId: info.messageId
    };
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    
    return {
      success: false,
      message: 'Failed to send welcome email',
      error: error.message
    };
  }
};

/**
 * Verify email configuration
 * @returns {Promise<boolean>} True if email is configured and working
 */
const verifyEmailConfig = async () => {
  const transporter = createTransporter();
  
  if (!transporter) {
    return false;
  }

  try {
    await transporter.verify();
    console.log('✅ Email configuration verified successfully');
    return true;
  } catch (error) {
    console.error('❌ Email configuration verification failed:', error.message);
    return false;
  }
};

module.exports = {
  createTransporter,
  sendContactNotification,
  sendWelcomeEmail,
  verifyEmailConfig
};

