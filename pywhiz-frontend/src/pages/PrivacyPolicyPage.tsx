"use client"

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-gradient-to-b from-[#e6f7f7] to-white min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 md:p-8 shadow-md">
          <h1 className="text-3xl font-bold text-[#003366] mb-6">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

            <h2 className="text-2xl font-semibold text-[#10b3b3] mb-4">Information We Collect</h2>
            <p className="mb-4">
              We collect information you provide directly to us, such as when you create an account, enroll in learning,
              or contact us for support.
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Personal information (name, email address, age)</li>
              <li>Learning progress and learning completion data</li>
              <li>Device information and usage analytics</li>
              <li>Communication preferences</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#10b3b3] mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Provide and improve our educational services</li>
              <li>Track learning progress and personalize content</li>
              <li>Send important updates and notifications</li>
              <li>Respond to support requests and feedback</li>
              <li>Ensure platform security and prevent fraud</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#10b3b3] mb-4">Information Sharing</h2>
            <p className="mb-6">
              We do not sell, trade, or rent your personal information to third parties. We may share information only
              in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>With trusted service providers who assist our operations</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#10b3b3] mb-4">Data Security</h2>
            <p className="mb-6">
              We implement appropriate security measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-semibold text-[#10b3b3] mb-4">Children's Privacy</h2>
            <p className="mb-6">
              PyWhiz is designed for users aged 11-16. We take special care to protect the privacy of young learners and
              comply with applicable children's privacy laws.
            </p>

            <h2 className="text-2xl font-semibold text-[#10b3b3] mb-4">Your Rights</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Delete your account and data</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <div className="bg-[#e6f7f7] p-4 rounded-lg border border-[#10b3b3]">
              <h3 className="font-semibold text-[#003366] mb-2">Contact Us</h3>
              <p>
                If you have questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:privacy@pywhiz.com" className="text-[#10b3b3] hover:underline">
                  privacy@pywhiz.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage
