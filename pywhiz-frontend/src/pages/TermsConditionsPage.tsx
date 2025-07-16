"use client"

const TermsConditionsPage = () => {
  return (
    <div className="bg-gradient-to-b from-[#e6f7f7] to-white min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 md:p-8 shadow-md">
          <h1 className="text-3xl font-bold text-[#003366] mb-6">Business Terms & Conditions</h1>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

            <h2 className="text-2xl font-semibold text-[#10b3b3] mb-4">Acceptance of Terms</h2>
            <p className="mb-6">
              By accessing and using PyWhiz, you accept and agree to be bound by the terms and provision of this
              agreement. These terms apply to all users of the platform.
            </p>

            <h2 className="text-2xl font-semibold text-[#10b3b3] mb-4">Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily access PyWhiz for personal, non-commercial educational use only. This
              is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for commercial purposes</li>
              <li>Attempt to reverse engineer any software</li>
              <li>Remove any copyright or proprietary notations</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#10b3b3] mb-4">User Accounts</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>You are responsible for maintaining account security</li>
              <li>Provide accurate and complete information</li>
              <li>Notify us immediately of unauthorized use</li>
              <li>One account per user policy</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#10b3b3] mb-4">Prohibited Uses</h2>
            <p className="mb-4">You may not use PyWhiz:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>For any unlawful purpose or to solicit unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations or laws</li>
              <li>To harass, abuse, insult, harm, defame, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload viruses or malicious code</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#10b3b3] mb-4">Content Ownership</h2>
            <p className="mb-6">
              All course content, including videos, exercises, and materials, are the intellectual property of PyWhiz.
              Users retain ownership of their created code and projects.
            </p>

            <h2 className="text-2xl font-semibold text-[#10b3b3] mb-4">Service Availability</h2>
            <p className="mb-6">
              We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. Scheduled maintenance will
              be announced in advance when possible.
            </p>

            <h2 className="text-2xl font-semibold text-[#10b3b3] mb-4">Limitation of Liability</h2>
            <p className="mb-6">
              PyWhiz shall not be liable for any indirect, incidental, special, consequential, or punitive damages
              resulting from your use of the platform.
            </p>

            <h2 className="text-2xl font-semibold text-[#10b3b3] mb-4">Termination</h2>
            <p className="mb-6">
              We may terminate or suspend your account immediately, without prior notice, for conduct that we believe
              violates these Terms or is harmful to other users.
            </p>

            <h2 className="text-2xl font-semibold text-[#10b3b3] mb-4">Changes to Terms</h2>
            <p className="mb-6">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon
              posting. Continued use constitutes acceptance of modified terms.
            </p>

            <div className="bg-[#e6f7f7] p-4 rounded-lg border border-[#10b3b3]">
              <h3 className="font-semibold text-[#003366] mb-2">Questions?</h3>
              <p>
                If you have any questions about these Terms & Conditions, please contact us at{" "}
                <a href="mailto:legal@pywhiz.com" className="text-[#10b3b3] hover:underline">
                  legal@pywhiz.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsConditionsPage
