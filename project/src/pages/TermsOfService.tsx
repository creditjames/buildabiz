import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> January 15, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using Build-A-Biz ("we," "us," or "our") services, you ("you" or "your") 
                agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, 
                please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Services</h2>
              <p className="text-gray-700 mb-4">
                Build-A-Biz provides business formation services, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Business entity formation (LLC, Corporation, etc.)</li>
                <li>Registered agent services</li>
                <li>Document preparation and filing</li>
                <li>Compliance monitoring and reminders</li>
                <li>Business plan generation using AI technology</li>
                <li>Additional business services as offered on our platform</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts and Registration</h2>
              <p className="text-gray-700 mb-4">
                To use our services, you must create an account and provide accurate, complete information. 
                You are responsible for maintaining the confidentiality of your account credentials and for 
                all activities that occur under your account.
              </p>
              <p className="text-gray-700 mb-4">
                You must be at least 18 years old and have the legal capacity to enter into contracts to 
                use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment Terms</h2>
              <p className="text-gray-700 mb-4">
                Payment is required before services are rendered. All fees are non-refundable except as 
                specifically stated in our refund policy. State filing fees are separate from our service 
                fees and are non-refundable.
              </p>
              <p className="text-gray-700 mb-4">
                We reserve the right to change our pricing at any time. Price changes will not affect 
                orders already placed and paid for.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Service Limitations and Disclaimers</h2>
              <p className="text-gray-700 mb-4">
                Build-A-Biz is not a law firm and does not provide legal advice. We provide self-help 
                services at your specific direction. We cannot provide any kind of advice, explanation, 
                opinion, or recommendation about possible legal rights, remedies, defenses, options, 
                selection of forms, or strategies.
              </p>
              <p className="text-gray-700 mb-4">
                While we strive for accuracy, we cannot guarantee that all information provided is 
                error-free or that our services will meet your specific needs. You should consult with 
                an attorney for legal advice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. AI-Generated Content</h2>
              <p className="text-gray-700 mb-4">
                Our platform may use artificial intelligence to generate business plans and other content. 
                AI-generated content is provided as a starting point and should be reviewed, customized, 
                and verified by you before use. We do not guarantee the accuracy, completeness, or 
                suitability of AI-generated content for your specific business needs.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                The Build-A-Biz platform, including all content, features, and functionality, is owned 
                by us and is protected by copyright, trademark, and other intellectual property laws. 
                You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>
              <p className="text-gray-700 mb-4">
                You retain ownership of any content you provide to us, but you grant us a license to 
                use such content to provide our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Privacy and Data Protection</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Please review our{' '}
                <Link to="/privacy" className="text-orange-500 hover:text-orange-600">
                  Privacy Policy
                </Link>{' '}
                to understand how we collect, use, and protect your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Prohibited Uses</h2>
              <p className="text-gray-700 mb-4">You may not use our services:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                TO THE FULLEST EXTENT PERMITTED BY LAW, BUILD-A-BIZ SHALL NOT BE LIABLE FOR ANY 
                INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF 
                PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, 
                USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
              <p className="text-gray-700 mb-4">
                Our total liability to you for all claims arising out of or relating to these Terms 
                or our services shall not exceed the amount you paid us in the twelve (12) months 
                preceding the claim.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Indemnification</h2>
              <p className="text-gray-700 mb-4">
                You agree to indemnify, defend, and hold harmless Build-A-Biz and its officers, 
                directors, employees, and agents from and against any claims, liabilities, damages, 
                judgments, awards, losses, costs, expenses, or fees arising out of or relating to 
                your use of our services or violation of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account and access to our services immediately, 
                without prior notice or liability, for any reason, including if you breach these Terms.
              </p>
              <p className="text-gray-700 mb-4">
                You may terminate your account at any time by contacting us. Upon termination, 
                your right to use our services will cease immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Governing Law and Dispute Resolution</h2>
              <p className="text-gray-700 mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the 
                State of California, without regard to its conflict of law provisions.
              </p>
              <p className="text-gray-700 mb-4">
                Any disputes arising out of or relating to these Terms or our services shall be 
                resolved through binding arbitration in accordance with the rules of the American 
                Arbitration Association.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms at any time. We will notify you of any 
                changes by posting the new Terms on our website. Your continued use of our services 
                after such changes constitutes your acceptance of the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Severability</h2>
              <p className="text-gray-700 mb-4">
                If any provision of these Terms is held to be invalid or unenforceable, the remaining 
                provisions will remain in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Build-A-Biz Inc.</strong><br />
                  Email: support@buildabiz.us<br />
                  Phone: 1-800-BUILD-BIZ<br />
                </p>
              </div>
            </section>

            <div className="border-t border-gray-200 pt-8 mt-8">
              <p className="text-sm text-gray-500">
                By using Build-A-Biz services, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;