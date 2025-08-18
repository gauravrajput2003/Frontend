import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
            About DevNexus
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Connecting developers worldwide, one meaningful relationship at a time. 
            We're building the future of professional networking for the tech community.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-slate-300 leading-relaxed">
              DevNexus was born from a simple idea: developers shouldn't just code in isolation. 
              We believe that meaningful connections lead to better code, innovative solutions, 
              and career growth that benefits the entire tech ecosystem.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Whether you're a seasoned engineer looking to mentor others, a startup founder 
              seeking technical co-founders, or a coding bootcamp graduate ready to make your mark, 
              DevNexus is your platform to connect, collaborate, and grow.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
              <h3 className="text-2xl font-bold text-white mb-6">Why DevNexus?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">🎯</span>
                  <div>
                    <h4 className="text-white font-semibold">Developer-First</h4>
                    <p className="text-slate-300 text-sm">Built by developers, for developers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-pink-400 text-xl">🚀</span>
                  <div>
                    <h4 className="text-white font-semibold">Career Growth</h4>
                    <p className="text-slate-300 text-sm">Connect with mentors and opportunities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl">🤝</span>
                  <div>
                    <h4 className="text-white font-semibold">Meaningful Connections</h4>
                    <p className="text-slate-300 text-sm">Quality over quantity, always</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What Makes Us Different</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🧠</div>
              <h3 className="text-xl font-semibold text-white mb-3">Smart Matching</h3>
              <p className="text-slate-400">
                Our algorithm considers your tech stack, experience level, and career goals 
                to suggest the most relevant connections.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">💬</div>
              <h3 className="text-xl font-semibold text-white mb-3">Real Conversations</h3>
              <p className="text-slate-400">
                Move beyond surface-level networking. Discuss projects, share knowledge, 
                and build genuine professional relationships.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🌍</div>
              <h3 className="text-xl font-semibold text-white mb-3">Global Community</h3>
              <p className="text-slate-400">
                Connect with developers from startups in Silicon Valley to tech hubs in Berlin, 
                Bangalore, and beyond.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-slate-800/50 to-purple-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Growing Together</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                10K+
              </div>
              <p className="text-slate-300">Active Developers</p>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                50K+
              </div>
              <p className="text-slate-300">Connections Made</p>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent mb-2">
                25+
              </div>
              <p className="text-slate-300">Countries</p>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
                100+
              </div>
              <p className="text-slate-300">Tech Stacks</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Meet the Founder</h2>
          <div className="max-w-md mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white">
                  G
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Gaurav Singh</h3>
                <p className="text-purple-400 mb-4">Full Stack Developer & Founder</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Passionate about connecting developers and building tools that make the tech 
                  community stronger. When not coding, you'll find me exploring new frameworks 
                  or mentoring aspiring developers.
                </p>
                <div className="flex justify-center gap-4 mt-6">
                  <a 
                    href="https://github.com/gauravrajput2003" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    <span className="text-xl">🐙</span>
                  </a>
                  <a 
                    href="https://linkedin.com/in/gauravrajput2003" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
                  >
                    <span className="text-xl">💼</span>
                  </a>
                  <a 
                    href="mailto:gauravrajput2003@gmail.com"
                    className="text-slate-400 hover:text-purple-400 transition-colors duration-200"
                  >
                    <span className="text-xl">📧</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-800/50 to-pink-800/50 backdrop-blur-sm rounded-2xl p-12 border border-purple-500/30">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Connecting?</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already building meaningful professional 
              relationships on DevNexus. Your next great collaboration is just a connection away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/login" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get Started Free
              </a>
              <a 
                href="/premium" 
                className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300"
              >
                Explore Premium
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
