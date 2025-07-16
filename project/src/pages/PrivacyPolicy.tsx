import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> January 15, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Build-A-Biz Inc. ("we," "us," or "our") respects your privacy and is committed to 
                protecting your personal information. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our website and services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
              <p className="text-gray-700 mb-4">We may collect the following personal information:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Name and contact information (email, phone, address)</li>
                <li>Business information (business name, type, purpose)</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Account credentials (username, password)</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Usage data and analytics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use your information to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Provide and maintain our services</li>
                <li>Process your business formation requests</li>
                <li>Communicate with you about your account and services</li>
                <li>Send important updates and notifications</li>
                <li>Improve our services and user experience</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">We may share your information with:</p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Providers</h3>
              <p className="text-gray-700 mb-4">
                Third-party vendors who help us provide our services, including payment processors, 
                cloud storage providers, and analytics services.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Government Agencies</h3>
              <p className="text-gray-700 mb-4">
                State agencies for business formation filings and compliance requirements.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Legal Requirements</h3>
              <p className="text-gray-700 mb-4">
                When required by law, court order, or to protect our rights and safety.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or destruction. 
                However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your personal information for as long as necessary to provide our services 
                and comply with legal obligations. Business formation documents may be retained 
                indefinitely as required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to enhance your experience, analyze usage, 
                and provide personalized content. You can control cookie settings through your 
                browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Third-Party Links</h2>
              <p className="text-gray-700 mb-4">
                Our website may contain links to third-party websites. We are not responsible for 
                the privacy practices of these external sites.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our services are not intended for individuals under 18 years of age. We do not 
                knowingly collect personal information from children.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any 
                material changes by posting the new policy on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Build-A-Biz Inc.</strong><br />
                  Email: privacy@buildabiz.com<br />
                  Phone: 1-800-BUILD-BIZ<br />
                  Address: 123 Business Ave, Suite 100, San Francisco, CA 94105
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;