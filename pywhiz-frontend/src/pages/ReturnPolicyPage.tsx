"use client"

const ReturnPolicyPage = () => {
  return (
    <div className="bg-gradient-to-b from-[#e6f7f7] to-white min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 md:p-8 shadow-md">
          <h1 className="text-3xl font-bold text-[#003366] mb-6">Return Policy</h1>

          <div className="prose prose-lg max-w-none text-gray-700">
            <h2 className="text-2xl font-semibold text-[#10b3b3] mb-4">Overview</h2>
            <p className="mb-6">
              At PyWhiz, we are committed to providing the best learning experience for our users. This return policy
              outlines the terms and conditions for refunds and returns of our services.
            </p>

            <h2 className="text-2xl font-semibold text-[#10b3b3] mb-4">Refund Eligibility</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Refunds are available within 30 days of purchase</li>
              <li>Technical issues that prevent access to course content</li>
              <li>Duplicate purchases made in error</li>
              <li>Course content significantly different from description</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#10b3b3] mb-4">Non-Refundable Items</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Courses completed more than 80% of the content</li>
              <li>Purchases made more than 30 days ago</li>
              <li>Free courses or promotional content</li>
              <li>Certificates and badges earned</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#10b3b3] mb-4">How to Request a Refund</h2>
            <ol className="list-decimal pl-6 mb-6 space-y-2">
              <li>Contact our support team at support@pywhiz.com</li>
              <li>Provide your order number and reason for refund</li>
              <li>Allow 3-5 business days for review</li>
              <li>Refunds will be processed to the original payment method</li>
            </ol>

            <h2 className="text-2xl font-semibold text-[#10b3b3] mb-4">Processing Time</h2>
            <p className="mb-6">
              Once approved, refunds typically take 5-10 business days to appear in your account, depending on your
              payment provider.
            </p>

            <div className="bg-[#e6f7f7] p-4 rounded-lg border border-[#10b3b3]">
              <h3 className="font-semibold text-[#003366] mb-2">Need Help?</h3>
              <p>
                If you have any questions about our return policy, please contact us at{" "}
                <a href="mailto:support@pywhiz.com" className="text-[#10b3b3] hover:underline">
                  support@pywhiz.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReturnPolicyPage
