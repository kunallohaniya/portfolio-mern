const nodemailer = require('nodemailer');

// In-memory rate limit store
const rateLimitMap = new Map();

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, error: 'Method not allowed' })
    };
  }

  try {
    const { name, email, subject, message, recaptchaToken } = JSON.parse(event.body);

    // 1. Validate required fields
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'All fields are required.' })
      };
    }

    // 2. Verify reCAPTCHA server-side
    const recaptchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
      }
    );
    const recaptchaData = await recaptchaRes.json();
    if (!recaptchaData.success) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'reCAPTCHA verification failed.' })
      };
    }

    // 3. Server-side rate limiting by IP
    const ip = event.headers['x-forwarded-for'] || 'unknown';
    const now = Date.now();
    const windowMs = 24 * 60 * 60 * 1000;
    const existing = rateLimitMap.get(ip) || [];
    const recent = existing.filter(t => now - t < windowMs);

    if (recent.length >= 5) {
      return {
        statusCode: 429,
        body: JSON.stringify({
          success: false,
          error: '[ RATE LIMIT ] — 5 messages already transmitted in the last 24h. Try again tomorrow.'
        })
      };
    }

    rateLimitMap.set(ip, [...recent, now]);

    // 4. Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS
      }
    });

    const sentAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // 5. Email 1 — Owner notification
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[ PORTFOLIO ] New message from ${name}`,
      html: `
        <div style="font-family:'Courier New',monospace;background:#0a0a0a;
                    color:#e5e5e5;padding:32px;max-width:600px;
                    border:1px solid #333;">
          <p style="color:#F59E0B;letter-spacing:0.15em;font-size:11px;
                    margin:0 0 24px;">
            ▸ PORTFOLIO / CONTACT TRANSMISSION
          </p>
          <p style="font-size:13px;line-height:1.8;margin:0 0 6px;">
            <span style="color:#888;">FROM</span> &nbsp;&nbsp;&nbsp; ${name}
          </p>
          <p style="font-size:13px;line-height:1.8;margin:0 0 6px;">
            <span style="color:#888;">EMAIL</span> &nbsp;&nbsp; ${email}
          </p>
          <p style="font-size:13px;line-height:1.8;margin:0 0 6px;">
            <span style="color:#888;">SUBJECT</span> &nbsp; ${subject}
          </p>
          <p style="font-size:13px;line-height:1.8;margin:0 0 24px;">
            <span style="color:#888;">TIME</span> &nbsp;&nbsp;&nbsp; ${sentAt} IST
          </p>
          <div style="border-top:1px solid #333;padding-top:20px;
                      font-size:13px;line-height:1.8;color:#ccc;">
            ${message}
          </div>
          <p style="margin:32px 0 0;font-size:10px;color:#555;
                    letter-spacing:0.1em;">
            KUNALPORTFOLIO.IN — SECURE CONTACT FORM
          </p>
        </div>
      `
    });

    // 6. Email 2 — Auto reply (silent fail)
    try {
      await transporter.sendMail({
        from: `"Kunal Lohar" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: `Message received — Kunal Lohar`,
        html: `
          <div style="font-family:'Courier New',monospace;background:#0a0a0a;
                      color:#e5e5e5;padding:32px;max-width:600px;
                      border:1px solid #333;">
            <p style="color:#F59E0B;letter-spacing:0.15em;font-size:11px;
                      margin:0 0 24px;">
              ▸ TRANSMISSION CONFIRMED
            </p>
            <p style="font-size:14px;font-weight:600;margin:0 0 16px;">
              Hey ${name},
            </p>
            <p style="font-size:13px;line-height:1.9;color:#ccc;margin:0 0 24px;">
              Your message has been received and logged.<br/>
              I review every inquiry personally and will get back to you shortly.<br/>
              Until then — appreciate you reaching out.
            </p>
            <div style="border-top:1px solid #333;padding-top:20px;">
              <p style="font-size:13px;margin:0 0 4px;">Kunal Lohar</p>
              <p style="font-size:11px;color:#F59E0B;letter-spacing:0.1em;margin:0;">
                SOFTWARE ENGINEER — KUNALPORTFOLIO.IN
              </p>
            </div>
            <p style="margin:32px 0 0;font-size:10px;color:#555;
                      letter-spacing:0.08em;">
              This is an automated confirmation. Do not reply to this address.
            </p>
          </div>
        `
      });
    } catch (autoReplyErr) {
      console.warn('Auto-reply failed (silent):', autoReplyErr);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Transmission successful.' })
    };

  } catch (err) {
    console.error('sendMail function error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Internal server error. Please retry.' })
    };
  }
};
import nodemailer from 'nodemailer';

const rateLimitStore = new Map();
const MAX_MESSAGES_PER_24H = 5;
const WINDOW_MS = 24 * 60 * 60 * 1000;

const json = (statusCode, payload) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { success: false, error: 'Method not allowed.' });
  }

  try {
    const { name, email, subject, message, recaptchaToken } = JSON.parse(event.body || '{}');

    if (!name || !email || !subject || !message || !recaptchaToken) {
      return json(400, { success: false, error: 'Missing required fields.' });
    }

    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecret) {
      return json(500, { success: false, error: 'Internal server error. Please retry.' });
    }

    const recaptchaPayload = new URLSearchParams({
      secret: recaptchaSecret,
      response: recaptchaToken
    }).toString();

    const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: recaptchaPayload
    });

    const recaptchaData = await recaptchaRes.json();
    if (!recaptchaData.success) {
      return json(400, { success: false, error: 'reCAPTCHA verification failed.' });
    }

    const forwardedFor = event.headers['x-forwarded-for'] || event.headers['X-Forwarded-For'] || 'unknown';
    const ip = forwardedFor.split(',')[0].trim() || 'unknown';
    const now = Date.now();
    const recentTimestamps = (rateLimitStore.get(ip) || []).filter((timestamp) => now - timestamp < WINDOW_MS);

    if (recentTimestamps.length >= MAX_MESSAGES_PER_24H) {
      return json(429, {
        success: false,
        error: '[ RATE LIMIT ] — 5 messages already transmitted in the last 24h. Try again tomorrow.'
      });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASS;

    if (!gmailUser || !gmailPass) {
      return json(500, { success: false, error: 'Internal server error. Please retry.' });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass
      }
    });

    await transporter.sendMail({
      from: gmailUser,
      to: gmailUser,
      replyTo: safeEmail,
      subject: `[ PORTFOLIO ] New message from ${safeName}`,
      html: `
        <div style="font-family:'Courier New',monospace;background:#0a0a0a;
                    color:#e5e5e5;padding:32px;max-width:600px;
                    border:1px solid #333;">
          <p style="color:#F59E0B;letter-spacing:0.15em;font-size:11px;
                    margin:0 0 24px">
            ▸ PORTFOLIO / CONTACT TRANSMISSION
          </p>
          <p style="font-size:13px;line-height:1.8;margin:0 0 6px">
            <span style="color:#888">FROM</span> &nbsp;&nbsp;&nbsp; ${safeName}
          </p>
          <p style="font-size:13px;line-height:1.8;margin:0 0 6px">
            <span style="color:#888">EMAIL</span> &nbsp;&nbsp; ${safeEmail}
          </p>
          <p style="font-size:13px;line-height:1.8;margin:0 0 6px">
            <span style="color:#888">SUBJECT</span> &nbsp; ${safeSubject}
          </p>
          <p style="font-size:13px;line-height:1.8;margin:0 0 24px">
            <span style="color:#888">TIME</span> &nbsp;&nbsp;&nbsp;
            ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
          </p>
          <div style="border-top:1px solid #333;padding-top:20px;
                      font-size:13px;line-height:1.8;color:#ccc">
            ${safeMessage}
          </div>
          <p style="margin:32px 0 0;font-size:10px;color:#555;
                    letter-spacing:0.1em">
            KUNALPORTFOLIO.IN — SECURE CONTACT FORM
          </p>
        </div>
      `
    });

    recentTimestamps.push(now);
    rateLimitStore.set(ip, recentTimestamps);

    transporter
      .sendMail({
        from: `"Kunal Lohar" <${gmailUser}>`,
        to: safeEmail,
        subject: 'Message received — Kunal Lohar',
        html: `
          <div style="font-family:'Courier New',monospace;background:#0a0a0a;
                      color:#e5e5e5;padding:32px;max-width:600px;
                      border:1px solid #333;">
            <p style="color:#F59E0B;letter-spacing:0.15em;font-size:11px;
                      margin:0 0 24px">
              ▸ TRANSMISSION CONFIRMED
            </p>
            <p style="font-size:14px;font-weight:600;margin:0 0 16px">
              Hey ${safeName},
            </p>
            <p style="font-size:13px;line-height:1.9;color:#ccc;margin:0 0 24px">
              Your message has been received and logged.<br>
              I review every inquiry personally and will get back
              to you shortly.<br>
              Until then — appreciate you reaching out.
            </p>
            <div style="border-top:1px solid #333;padding-top:20px;">
              <p style="font-size:13px;margin:0 0 4px">Kunal Lohar</p>
              <p style="font-size:11px;color:#F59E0B;letter-spacing:0.1em;
                        margin:0">
                SOFTWARE ENGINEER — KUNALPORTFOLIO.IN
              </p>
            </div>
            <p style="margin:32px 0 0;font-size:10px;color:#555;
                      letter-spacing:0.08em">
              This is an automated confirmation. Do not reply to this address.
            </p>
          </div>
        `
      })
      .catch((err) => {
        console.warn('Auto-reply send failed:', err);
      });

    return json(200, { success: true, message: 'Transmission successful.' });
  } catch (error) {
    console.error('sendMail hard failure:', error);
    return json(500, { success: false, error: 'Internal server error. Please retry.' });
  }
};
