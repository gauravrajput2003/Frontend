import React from 'react';

const PrivacyPolicy = () => {
  const year = new Date().getFullYear();
  return (
    <div className="min-h-[80vh] flex justify-center px-4 py-10">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            Privacy Policy
          </h1>
          <p className="text-white/70 mt-2">Effective date: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
          <div className="p-6 md:p-10 space-y-8 text-white/90">
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Who we are</h2>
              <p>
                DevNexus (codeally.online) is a developer networking and mock interview platform. We help people connect,
                collaborate, and practice interviews using real-time technologies like WebRTC.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Information we collect</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Account info: name, email, password (hashed), profile details (age, gender, photo, about, skills).</li>
                <li>Usage data: pages visited, basic device/browser info, and interaction events for product improvement.</li>
                <li>Communication data: transactional emails (verification, password reset, requests/booking notices).</li>
                <li>Payment data: order/payment IDs and status from our provider (e.g., Razorpay); we do not store card details.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">How we use your information</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>To create and manage your account and profile.</li>
                <li>To facilitate connections, requests, and mock interviews.</li>
                <li>To send transactional emails strictly related to your account and activity.</li>
                <li>To secure our platform and comply with legal obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Email practices</h2>
              <p>
                We send transactional emails only (e.g., verification, password reset, connection/interview requests and updates).
                You can manage notification preferences in-app. We don’t send promotional bulk emails without consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Data sharing</h2>
              <p>
                We share data with trusted processors only to provide our services (e.g., email delivery, payment processing).
                They process data under our instructions and applicable data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Security</h2>
              <p>
                We use industry practices to protect your data (encryption in transit, hashed passwords, access controls).
                No method is 100% secure, but we continuously improve our safeguards.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Your rights</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Access, update, or delete your profile information.</li>
                <li>Change notification preferences.</li>
                <li>Contact us to exercise data rights where applicable.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Contact</h2>
              <p>
                For privacy questions, contact: <a className="text-sky-400 underline" href="mailto:support@codeally.online">support@codeally.online</a>
              </p>
            </section>

            <div className="pt-4 text-sm text-white/60">
              <p>© {year} DevNexus. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
