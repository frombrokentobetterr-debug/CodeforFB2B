import { Helmet } from "react-helmet-async";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

  .pp { font-family: 'Jost', sans-serif; font-weight: 300; background: #ffffff; color: #2a2420; }

  .pp-hero { background: #2a2420; padding: 100px 24px 60px; text-align: center; }
  .pp-hero .eye { font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; color: #7a9e87; margin-bottom: 14px; }
  .pp-hero h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(28px, 4vw, 46px); font-weight: 300; color: #f4ede3; margin-bottom: 10px; }
  .pp-hero .dt { font-size: 11px; color: #8a7d74; letter-spacing: 0.1em; }

  .pp-body { max-width: 720px; margin: 0 auto; padding: 72px 24px 100px; }

  .pp-intro { font-size: 15px; line-height: 2; color: #3a3028; margin-bottom: 56px; padding-bottom: 48px; border-bottom: 1px solid #e8e0d8; }

  .pp-s { margin-bottom: 52px; }
  .pp-s .snum { font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase; color: #c4623a; margin-bottom: 8px; }
  .pp-s h2 { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 400; margin-bottom: 18px; color: #1a1410; border-bottom: 1px solid #f0e8e0; padding-bottom: 12px; }
  .pp-s p { font-size: 14px; line-height: 2.05; color: #4a4038; margin-bottom: 16px; }
  .pp-s p strong { font-weight: 500; color: #2a2420; }
  .pp-s ul { list-style: none; padding: 0; margin: 16px 0; }
  .pp-s ul li { font-size: 14px; line-height: 1.9; color: #4a4038; padding: 10px 0 10px 20px; position: relative; border-bottom: 1px solid #f8f4f0; }
  .pp-s ul li:last-child { border-bottom: none; }
  .pp-s ul li::before { content: '—'; position: absolute; left: 0; color: #c9b99a; font-size: 12px; }
  .pp-s a { color: #7a9e87; text-decoration: underline; text-underline-offset: 3px; }
  .pp-s a:hover { color: #4d7060; }

  .callout { background: #f8f4f0; border: 1px solid #e8e0d8; padding: 24px 28px; margin: 20px 0; border-radius: 2px; }
  .callout p { margin: 0; font-size: 14px; line-height: 1.9; color: #3a3028; }

  .strong-callout { background: #2a2420; padding: 24px 28px; margin: 20px 0; border-radius: 2px; }
  .strong-callout p { margin: 0; font-size: 14px; line-height: 1.9; color: #f4ede3; }
  .strong-callout p strong { color: #c4623a; }

  .back { display: inline-block; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #8a7d74; text-decoration: none; margin-bottom: 48px; }
  .back:hover { color: #c4623a; }

  hr.divider { border: none; border-top: 1px solid #e8e0d8; margin: 52px 0; }
`;

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | From Broken To Better</title>
        <meta name="description" content="How From Broken To Better collects, uses, and protects your personal data. Governed by Indian IT Act and DPDP Act 2023." />
        <link rel="canonical" href="https://frombrokentobetter.com/privacy-policy" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://frombrokentobetter.com/privacy-policy" />
        <meta property="og:title" content="Privacy Policy | From Broken To Better" />
        <meta property="og:description" content="How From Broken To Better collects, uses, and protects your personal data. Governed by Indian IT Act and DPDP Act 2023." />
        <meta property="og:image" content="https://frombrokentobetter.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="From Broken To Better" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://frombrokentobetter.com/privacy-policy" />
        <meta name="twitter:title" content="Privacy Policy | From Broken To Better" />
        <meta name="twitter:description" content="How From Broken To Better collects, uses, and protects your personal data. Governed by Indian IT Act and DPDP Act 2023." />
        <meta name="twitter:image" content="https://frombrokentobetter.com/og-image.jpg" />
      </Helmet>
      <style>{styles}</style>
      <div className="pp">

        <section className="pp-hero">
          <div className="eye">Legal</div>
          <h1>Privacy Policy</h1>
          <div className="dt">Effective Date: March 1, 2026 &nbsp;·&nbsp; Last Updated: March 1, 2026</div>
        </section>

        <div className="pp-body">
          <a href="/" className="back">← Back to Home</a>

          <p className="pp-intro">
            This Privacy Policy describes how From Broken to Better ("we", "us", "our", or "the Platform") collects, uses, stores, and protects your personal information when you access or use our services. We take your privacy seriously — particularly because the nature of our platform means you may share sensitive personal and emotional information with us. Please read this policy carefully. By using our platform, you consent to the practices described here.
          </p>

          <div className="pp-s">
            <div className="snum">Section 01</div>
            <h2>Who We Are</h2>
            <p>From Broken to Better is a digital wellness platform designed to support individuals navigating separation and divorce. We operate in India and are subject to the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 (DPDP Act). Our platform provides peer matching, practitioner sessions, community events, journaling, and related wellness services.</p>
            <p>When this policy refers to "personal data" or "personal information," we mean any information that identifies or could reasonably identify you as an individual — including your name, email address, phone number, and any other details you voluntarily provide to us.</p>
          </div>

          <hr className="divider" />

          <div className="pp-s">
            <div className="snum">Section 02</div>
            <h2>What Personal Data We Collect</h2>
            <p>We collect information in two primary ways: information you provide directly to us, and information collected automatically through your use of the platform.</p>
            <p><strong>Information you provide directly:</strong></p>
            <ul>
              <li>Your name and email address when you create an account</li>
              <li>A password, which is stored in encrypted form and never readable by our team</li>
              <li>Onboarding responses — including information about your separation, how long ago it occurred, your emotional state, and the kind of support you are looking for</li>
              <li>Journal entries that you choose to save within the platform</li>
              <li>Messages you send to peers or practitioners through our in-app messaging system</li>
              <li>Any information you share when contacting us through our contact form, including your name, phone number, and the content of your message</li>
              <li>Payment information when booking a private session — processed by our third-party payment provider and not stored directly by us</li>
            </ul>
            <p><strong>Information collected automatically:</strong></p>
            <ul>
              <li>Pages you visit and features you use within the platform</li>
              <li>Session duration and frequency of use</li>
              <li>Device type, operating system, and browser type</li>
              <li>IP address and approximate geographic location</li>
              <li>Cookies and similar tracking technologies (described further in Section 08)</li>
            </ul>
          </div>

          <hr className="divider" />

          <div className="pp-s">
            <div className="snum">Section 03</div>
            <h2>Why We Collect Your Data and How We Use It</h2>
            <p>We collect personal data only for specific, legitimate purposes. We do not collect more data than we need, and we do not use your data in ways that you would not reasonably expect.</p>
            <ul>
              <li><strong>To create and manage your account</strong> — your name and email are required to register and to allow you to log back in securely.</li>
              <li><strong>To match you with the right peer</strong> — your onboarding responses help us identify someone whose experience and circumstances are genuinely similar to yours. This matching is the core function of the platform.</li>
              <li><strong>To connect you with a practitioner</strong> — when you book a private session, we share limited relevant information with the practitioner so they can prepare appropriately for your conversation.</li>
              <li><strong>To personalise your experience</strong> — we use your activity data to surface content, healing paths, and events that are relevant to where you are in your journey.</li>
              <li><strong>To communicate with you</strong> — we may send you emails about your account, upcoming events, or new features. You can unsubscribe from non-essential communications at any time.</li>
              <li><strong>To improve the platform</strong> — we analyse usage patterns in aggregate to understand how people use the platform and where we can improve. This analysis does not identify you individually.</li>
              <li><strong>To respond to your enquiries</strong> — when you contact us through the contact form, we use the information you provide to respond to your message.</li>
            </ul>
          </div>

          <hr className="divider" />

          <div className="pp-s">
            <div className="snum">Section 04</div>
            <h2>Who We Share Your Data With</h2>
            <div className="strong-callout">
              <p><strong>We do not sell your personal data. We have never sold it and we will never sell it.</strong> Your data is not used for advertising, profiling for third parties, or any commercial purpose beyond the operation of this platform.</p>
            </div>
            <p>There are limited circumstances in which we share your data with others:</p>
            <ul>
              <li><strong>Practitioners you choose to book with</strong> — when you schedule a private session, the practitioner will receive your name and basic context to prepare. They are bound by confidentiality obligations.</li>
              <li><strong>Service providers</strong> — we use third-party tools to help run the platform, including payment processors, email delivery services, and hosting providers. These providers access only the data they need to perform their specific function, and they are contractually required to protect it.</li>
              <li><strong>Legal requirements</strong> — we may disclose your information if required to do so by Indian law, court order, or government authority. We will notify you where legally permitted before doing so.</li>
            </ul>
            <p>In no other circumstances will your personal data be shared, disclosed, or transferred to any third party.</p>
          </div>

          <hr className="divider" />

          <div className="pp-s">
            <div className="snum">Section 05</div>
            <h2>Sensitive Personal Data</h2>
            <p>Because of the nature of our platform, you may share information that is particularly sensitive — including details about your mental health, your relationships, your emotional state, and your personal history. We treat this information with the highest level of care and discretion.</p>
            <p>Sensitive personal information is:</p>
            <ul>
              <li>Never shared publicly or visible to other users without your explicit consent</li>
              <li>Never used to target you with advertising of any kind</li>
              <li>Never disclosed to employers, family members, or other third parties</li>
              <li>Accessible only to staff who need it to operate the platform, under strict confidentiality obligations</li>
            </ul>
            <div className="callout">
              <p>Your journal entries are private by default. Unless you explicitly choose to share an entry, it is visible only to you. We do not read your journal entries except where technically necessary to maintain the service or where required by law.</p>
            </div>
          </div>

          <hr className="divider" />

          <div className="pp-s">
            <div className="snum">Section 06</div>
            <h2>Your Rights Under Indian Law</h2>
            <p>Under the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000, you have the following rights with respect to your personal data:</p>
            <ul>
              <li><strong>Right to access</strong> — you may request a copy of the personal data we hold about you at any time.</li>
              <li><strong>Right to correction</strong> — if any of your personal data is inaccurate or incomplete, you have the right to have it corrected.</li>
              <li><strong>Right to erasure</strong> — you may request the deletion of your account and associated personal data. We will process such requests within 30 days, subject to any legal obligations that require us to retain certain data.</li>
              <li><strong>Right to withdraw consent</strong> — where we process your data on the basis of your consent, you may withdraw that consent at any time. Withdrawal does not affect the lawfulness of processing carried out before withdrawal.</li>
              <li><strong>Right to grievance redressal</strong> — you have the right to raise a complaint or grievance with our designated Data Protection Officer (details in Section 10).</li>
            </ul>
            <p>To exercise any of these rights, please contact us at <a href="mailto:privacy@frombrokentobetter.com">privacy@frombrokentobetter.com</a>. We will respond within 30 days of receiving your request.</p>
          </div>

          <hr className="divider" />

          <div className="pp-s">
            <div className="snum">Section 07</div>
            <h2>Data Storage, Retention, and Security</h2>
            <p>Your data is stored on secure servers with industry-standard protections in place, including encryption at rest and in transit, role-based access controls, regular security audits, and secure backup systems.</p>
            <p>We retain your personal data only for as long as your account is active or as long as necessary to provide our services. If you delete your account, we will delete or anonymise your personal data within 30 days, except where we are required to retain it under Indian law (for example, financial records relating to transactions).</p>
            <p>Despite our security measures, no system is completely secure. If you have reason to believe your account has been compromised, please contact us immediately at <a href="mailto:support@frombrokentobetter.com">support@frombrokentobetter.com</a>.</p>
          </div>

          <hr className="divider" />

          <div className="pp-s">
            <div className="snum">Section 08</div>
            <h2>Cookies and Tracking Technologies</h2>
            <p>We use cookies — small text files stored on your device — to make the platform function correctly and to improve your experience. We use the following types of cookies:</p>
            <ul>
              <li><strong>Essential cookies</strong> — required for the platform to function. These keep you logged in and maintain your session. You cannot disable these without also being unable to use the platform.</li>
              <li><strong>Functional cookies</strong> — remember your preferences and settings to improve your experience on return visits.</li>
            </ul>
            <p>We do not use advertising cookies, tracking cookies, or any third-party cookies that profile your behaviour across the web. We do not use third-party analytics tools that share your data with external advertising networks.</p>
          </div>

          <hr className="divider" />

          <div className="pp-s">
            <div className="snum">Section 09</div>
            <h2>Children's Privacy</h2>
            <p>Our platform is intended for adults aged 18 and above. We do not knowingly collect or store personal data from individuals under the age of 18. If we become aware that we have inadvertently collected data from a minor, we will delete it promptly. If you believe a minor has created an account on our platform, please contact us at <a href="mailto:privacy@frombrokentobetter.com">privacy@frombrokentobetter.com</a>.</p>
          </div>

          <hr className="divider" />

          <div className="pp-s">
            <div className="snum">Section 10</div>
            <h2>Contact Our Data Protection Officer</h2>
            <p>We have designated a Data Protection Officer responsible for overseeing our data protection practices and handling privacy-related enquiries and complaints. If you have any questions about this policy, wish to exercise your rights, or want to raise a concern about how we handle your data, please contact:</p>
            <div className="callout">
              <p><strong>Data Protection Officer</strong><br />From Broken to Better<br />Email: <a href="mailto:privacy@frombrokentobetter.com">privacy@frombrokentobetter.com</a><br />We will acknowledge your enquiry within 5 business days and resolve it within 30 days.</p>
            </div>
          </div>

          <hr className="divider" />

          <div className="pp-s">
            <div className="snum">Section 11</div>
            <h2>Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or the services we offer. When we make significant changes, we will notify you by email (where we have your email address) and by posting a notice on the platform at least 14 days before the changes take effect.</p>
            <p>Your continued use of the platform after changes take effect constitutes your acceptance of the updated policy. If you do not agree to the updated terms, you may delete your account before the changes take effect.</p>
            <p>The date at the top of this page always reflects when the policy was last updated.</p>
          </div>

        </div>
      </div>
    </>
  );
}
