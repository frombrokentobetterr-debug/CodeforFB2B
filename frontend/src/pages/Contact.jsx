import { useState } from "react";
import { Helmet } from "react-helmet-async";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

  .contact { font-family: 'Jost', sans-serif; font-weight: 300; background: #f4ede3; color: #2a2420; min-height: 100vh; }

  .contact-hero { padding: 100px 24px 52px; text-align: center; }
  .contact-hero .eye { font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; color: #7a9e87; margin-bottom: 18px; }
  .contact-hero h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(30px, 5vw, 54px); font-weight: 300; margin-bottom: 14px; }
  .contact-hero h1 em { font-style: italic; color: #c4623a; }
  .contact-hero p { font-size: 13px; color: #8a7d74; max-width: 360px; margin: 0 auto; line-height: 1.75; }

  .contact-body { max-width: 560px; margin: 0 auto; padding: 48px 24px 80px; }

  .form-group { margin-bottom: 16px; }
  .form-group label { display: block; font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: #8a7d74; margin-bottom: 6px; }
  .form-group input, .form-group select, .form-group textarea {
    width: 100%; background: #fff; border: 1px solid #ede3d8; border-radius: 3px;
    padding: 12px 14px; font-family: 'Jost', sans-serif; font-size: 13px; font-weight: 300;
    color: #2a2420; outline: none; transition: border-color 0.2s; -webkit-appearance: none;
  }
  .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: #c4623a; }
  .form-group textarea { resize: vertical; min-height: 110px; line-height: 1.65; }
  .form-group .hint { font-size: 10px; color: #c9b99a; margin-top: 4px; letter-spacing: 0.05em; }
  .form-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

  .submit-btn { width: 100%; background: #c4623a; color: white; border: none; border-radius: 40px; padding: 14px; font-family: 'Jost', sans-serif; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; margin-top: 8px; }
  .submit-btn:hover { background: #9e4828; }
  .submit-btn:disabled { background: #c9b99a; cursor: not-allowed; }

  .success { text-align: center; padding: 48px 0; }
  .success h3 { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 300; margin: 12px 0 8px; }
  .success p { font-size: 13px; color: #8a7d74; line-height: 1.8; }

  .crisis { margin-top: 28px; padding: 16px 20px; background: #fff; border-left: 3px solid #7a9e87; font-size: 12px; line-height: 1.8; color: #8a7d74; }
  .crisis strong { color: #4d7060; font-weight: 500; }

  @media (max-width: 480px) { .form-row2 { grid-template-columns: 1fr; } }
`;

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | From Broken To Better</title>
        <meta name="description" content="Reach out to From Broken To Better. We are here for anyone navigating separation or divorce in India. Your story stays private, always." />
        <link rel="canonical" href="https://frombrokentobetter.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://frombrokentobetter.com/contact" />
        <meta property="og:title" content="Contact Us | From Broken To Better" />
        <meta property="og:description" content="Reach out to From Broken To Better. We are here for anyone navigating separation or divorce in India. Your story stays private, always." />
        <meta property="og:image" content="https://frombrokentobetter.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="From Broken To Better" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://frombrokentobetter.com/contact" />
        <meta name="twitter:title" content="Contact Us | From Broken To Better" />
        <meta name="twitter:description" content="Reach out to From Broken To Better. We are here for anyone navigating separation or divorce in India. Your story stays private, always." />
        <meta name="twitter:image" content="https://frombrokentobetter.com/og-image.jpg" />
      </Helmet>
      <style>{styles}</style>
      <div className="contact">
        <section className="contact-hero">
          <div className="eye">Get In Touch</div>
          <h1>We're here.<br /><em>Talk to us.</em></h1>
          <p>A question, a concern, a partnership — whatever it is, we're listening. We'll reach back to you directly.</p>
        </section>

        <div className="contact-body">
          {sent ? (
            <div className="success">
              <div style={{ fontSize: 40 }}>🌿</div>
              <h3>We've got your message.</h3>
              <p>We'll reach back to you within 24–48 hours<br />on the contact details you've shared.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <input name="name" value={form.name} onChange={onChange} placeholder="What should we call you?" required />
              </div>

              <div className="form-row2">
                <div className="form-group">
                  <label>Email <span style={{color:'#c9b99a',fontSize:'9px'}}>(optional)</span></label>
                  <input name="email" type="email" value={form.email} onChange={onChange} placeholder="your@email.com" />
                  <div className="hint">We'll reply here if provided</div>
                </div>
                <div className="form-group">
                  <label>Phone Number <span style={{color:'#c9b99a',fontSize:'9px'}}>(optional)</span></label>
                  <input name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="+91 00000 00000" />
                  <div className="hint">Or we can call you back</div>
                </div>
              </div>

              <div className="form-group">
                <label>What is this about?</label>
                <select name="subject" value={form.subject} onChange={onChange} required>
                  <option value="">Select a topic...</option>
                  <option>General Question</option>
                  <option>Become a Practitioner</option>
                  <option>Technical Issue</option>
                  <option>Partnership or Media</option>
                  <option>Something Else</option>
                </select>
              </div>

              <div className="form-group">
                <label>Your Message</label>
                <textarea name="message" value={form.message} onChange={onChange} placeholder="Tell us what's on your mind. There's no wrong way to start." required />
              </div>

              <button className="submit-btn" disabled={loading}>{loading ? "Sending..." : "Send Message"}</button>
            </form>
          )}

          <div className="crisis">
            <strong>In crisis right now?</strong> Please reach iCall India: <strong>9152987821</strong> · Vandrevala Foundation: <strong>1860-2662-345</strong> — available 24/7.
          </div>
        </div>
      </div>
    </>
  );
}
