import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1000);
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-20 px-4" style={{backgroundImage: "radial-gradient(circle at 25% 25%, rgba(120,119,198,0.08) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,119,198,0.08) 0%, transparent 50%)"}}>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Have questions, feedback, or want to collaborate? We'd love to hear from you! 
            Reach out and let's build something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-2 text-green-400">
                    <span className="text-lg">✅</span>
                    <span>Message sent successfully! We'll get back to you soon.</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                    <option value="partnership">Partnership/Collaboration</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 resize-none"
                    placeholder="Tell us more about your inquiry, feedback, or how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg disabled:shadow-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>Send Message</span>
                      <span className="text-lg">📤</span>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            {/* Direct Contact */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Direct Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-blue-400 text-xl">📧</span>
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm">Email</p>
                    <a 
                      href="mailto:gauravrajput2003@gmail.com" 
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                    >
                   gauravsingh032002@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-green-400 text-xl">📱</span>
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm">WhatsApp</p>
                    <a 
                      href="https://wa.me/+916203615319" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 transition-colors duration-200"
                    >
                      +91 6203615319
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Connect with Me</h3>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-4">
                <a 
                  href="https://github.com/gauravrajput2003" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all duration-200 group min-w-0 overflow-x-auto"
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">🐙</span>
                  <div className="min-w-0">
                    <p className="text-white font-medium">GitHub</p>
                    <p className="text-slate-400 text-sm truncate max-w-[120px] sm:max-w-[160px]">@gauravrajput2003</p>
                  </div>
                </a>
                <a 
                  href="https://www.linkedin.com/in/gaurav-singh-aa7a0a196/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all duration-200 group min-w-0 overflow-x-auto"
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">💼</span>
                  <div className="min-w-0">
                    <p className="text-white font-medium">LinkedIn</p>
                    <p className="text-slate-400 text-sm truncate max-w-[120px] sm:max-w-[160px]">@gauravrajput2003</p>
                  </div>
                </a>
                <a 
                  href="https://x.com/GauravS36812804" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all duration-200 group min-w-0 overflow-x-auto"
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">🐦</span>
                  <div className="min-w-0">
                    <p className="text-white font-medium">Twitter</p>
                    <p className="text-slate-400 text-sm truncate max-w-[120px] sm:max-w-[160px]">@gauravrajput03</p>
                  </div>
                </a>
                <a 
                  href="https://www.instagram.com/gaurav.rajput_2/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all duration-200 group min-w-0 overflow-x-auto"
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">📸</span>
                  <div className="min-w-0">
                    <p className="text-white font-medium">Instagram</p>
                    <p className="text-slate-400 text-sm truncate max-w-[120px] sm:max-w-[160px]">@gaurav.rajput_2</p>
                  </div>
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-pink-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Quick Questions?</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">💼 Looking for collaboration?</h4>
                  <p className="text-slate-300 text-sm">
                    I'm always open to interesting projects and partnerships. Send me your ideas!
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">🐛 Found a bug?</h4>
                  <p className="text-slate-300 text-sm">
                    Report it directly via the form or email with steps to reproduce.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">💡 Have a feature idea?</h4>
                  <p className="text-slate-300 text-sm">
                    Share your suggestions! User feedback drives our development roadmap.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Response Time */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-slate-800/50 backdrop-blur-sm rounded-xl px-6 py-4 border border-slate-700/50">
            <span className="text-green-400 text-2xl">⚡</span>
            <div className="text-left">
              <p className="text-white font-medium">Quick Response Time</p>
              <p className="text-slate-400 text-sm">We typically respond within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
