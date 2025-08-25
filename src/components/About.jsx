import React from 'react'

const About = () => {
  return (
  <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-20 px-4" style={{backgroundImage: "radial-gradient(circle at 25% 25%, rgba(120,119,198,0.08) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,119,198,0.08) 0%, transparent 50%)"}}>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 8s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
            About DevNexus
          </h1>
          <p className="text-2xl md:text-3xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Connecting developers worldwide, one meaningful relationship at a time. 
            We're building the future of professional networking for the tech community.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
              DevNexus was born from a simple idea: developers shouldn't just code in isolation. 
              We believe that meaningful connections lead to better code, innovative solutions, 
              and career growth that benefits the entire tech ecosystem.
            </p>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
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
          <h2 className="text-3xl font-bold text-white mb-12">Meet the Founder</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative bg-slate-800/90 backdrop-blur-sm rounded-3xl p-12 border border-purple-500/30 shadow-2xl">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  {/* Profile Image */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-300"></div>
                    <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-purple-500/50 shadow-xl">
                      <img 
                        src="https://media.licdn.com/dms/image/v2/D4D03AQGTI9ve3XM05g/profile-displayphoto-scale_400_400/B4DZei0VH1HkAk-/0/1750783319331?e=1758758400&v=beta&t=HOaaVZlEOClNnmC2Bz9NIEteK_VMwgupADNoMXgyXeY" 
                        alt="Gaurav Singh - Founder of DevNexus"
                        className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600 hidden items-center justify-center text-4xl font-bold text-white">
                        GS
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-slate-800 rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">Gaurav Singh</h3>
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 mb-6">
                      <p className="text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                        Full Stack Developer & Founder
                      </p>
                      <span className="hidden sm:block text-slate-500">•</span>
                      <p className="text-sm text-blue-400 font-medium">Building the Future of Dev Networking</p>
                    </div>
                    
                    <p className="text-slate-300 leading-relaxed mb-8 max-w-2xl">
                      Passionate about connecting developers and building tools that make the tech 
                      community stronger. With expertise in modern web technologies and a vision 
                      for meaningful professional relationships, I'm dedicated to creating platforms 
                      that empower developers to grow, collaborate, and innovate together.
                    </p>
                    
                    {/* Social Links */}
                    <div className="flex justify-center lg:justify-start gap-4">
                      <a 
                        href="https://github.com/gauravrajput2003" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-all duration-300 border border-slate-600/30 hover:border-slate-500/50"
                      >
                        <span className="text-lg">🐙</span>
                        <span className="text-sm font-medium">GitHub</span>
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/gaurav-singh-aa7a0a196/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-blue-200 px-4 py-2 rounded-lg transition-all duration-300 border border-blue-500/30 hover:border-blue-400/50"
                      >
                        <span className="text-lg">💼</span>
                        <span className="text-sm font-medium">LinkedIn</span>
                      </a>
                      {/* Email link removed as requested */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-20 overflow-hidden">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What Developers Say</h2>
          <div className="relative">
            <div className="flex animate-scroll gap-8">
              {/* Testimonial 1 */}
              <div className="flex-shrink-0 w-96 bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30 shadow-2xl">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-40"></div>
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-purple-500/50">
                      <img 
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww" 
                        alt="Alex Chen"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">Alex Chen</h4>
                  <p className="text-purple-400 text-sm font-medium mb-4">Senior Frontend Developer</p>
                  <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-6">
                    "DevNexus transformed how I connect with other developers. Found amazing mentors 
                    and collaborators for my projects. The platform is intuitive and genuinely helpful 
                    for building meaningful professional relationships."
                  </p>
                  <div className="flex text-yellow-400 text-lg">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="flex-shrink-0 w-96 bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-pink-500/30 shadow-2xl">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-orange-600 rounded-full blur opacity-40"></div>
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-pink-500/50">
                      <img 
                        src="https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww" 
                        alt="Sarah Johnson"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">Sarah Johnson</h4>
                  <p className="text-pink-400 text-sm font-medium mb-4">Full Stack Engineer</p>
                  <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-6">
                    "As a bootcamp graduate, DevNexus helped me find experienced developers willing 
                    to mentor me. The connections I made here changed my career trajectory completely. 
                    Highly recommend for new developers!"
                  </p>
                  <div className="flex text-yellow-400 text-lg">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="flex-shrink-0 w-96 bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/30 shadow-2xl">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full blur opacity-40"></div>
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-blue-500/50">
                      <img 
                        src="https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D" 
                        alt="Michael Rodriguez"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">Michael Rodriguez</h4>
                  <p className="text-blue-400 text-sm font-medium mb-4">Startup CTO</p>
                  <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-6">
                    "Found my co-founder through DevNexus! The smart matching algorithm connected me 
                    with developers who shared my vision. We're now building something amazing together 
                    and growing our team."
                  </p>
                  <div className="flex text-yellow-400 text-lg">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>

              {/* Testimonial 4 */}
              <div className="flex-shrink-0 w-96 bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-green-500/30 shadow-2xl">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full blur opacity-40"></div>
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-green-500/50">
                      <img 
                        src="https://t4.ftcdn.net/jpg/06/83/33/99/240_F_683339990_DWxlWVl3LHGv55K9zjQAbcvsuQcZQjjD.jpg" 
                        alt="Priya Sharma"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">Priya Sharma</h4>
                  <p className="text-green-400 text-sm font-medium mb-4">Backend Developer</p>
                  <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-6">
                    "The global community aspect is incredible. Connected with developers from 15+ 
                    countries and learned so much about different tech cultures and practices. 
                    DevNexus breaks geographical boundaries."
                  </p>
                  <div className="flex text-yellow-400 text-lg">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>

              {/* Testimonial 5 */}
              <div className="flex-shrink-0 w-96 bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-orange-500/30 shadow-2xl">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-full blur opacity-40"></div>
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-orange-500/50">
                      <img 
                        src="https://t3.ftcdn.net/jpg/08/38/88/68/240_F_838886804_YzwcBWCCgkomNmSLRYJxNPlm6XtNLAKM.jpg" 
                        alt="David Kim"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">David Kim</h4>
                  <p className="text-orange-400 text-sm font-medium mb-4">Mobile Developer</p>
                  <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-6">
                    "Quality over quantity is real here. Instead of random connections, I found 
                    meaningful relationships that led to actual collaborations and friendships. 
                    The platform really delivers on its promise."
                  </p>
                  <div className="flex text-yellow-400 text-lg">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>

              {/* Testimonial 6 */}
              <div className="flex-shrink-0 w-96 bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-teal-500/30 shadow-2xl">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full blur opacity-40"></div>
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-teal-500/50">
                      <img 
                        src="https://t3.ftcdn.net/jpg/06/78/09/82/240_F_678098211_RBtjy68o4sN0myCWY3OrM9revJ9JOw41.jpg" 
                        alt="Lisa Zhang"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">Lisa Zhang</h4>
                  <p className="text-teal-400 text-sm font-medium mb-4">DevOps Engineer</p>
                  <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-6">
                    "DevNexus isn't just another networking platform. It's a community where developers 
                    genuinely help each other grow. Found my dream job through connections here! 
                    Game-changer for my career."
                  </p>
                  <div className="flex text-yellow-400 text-lg">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>

              {/* Testimonial 7 */}
              <div className="flex-shrink-0 w-96 bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-indigo-500/30 shadow-2xl">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-40"></div>
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-indigo-500/50">
                      <img 
                        src="https://t4.ftcdn.net/jpg/02/14/74/61/240_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg" 
                        alt="James Wilson"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">James Wilson</h4>
                  <p className="text-indigo-400 text-sm font-medium mb-4">React Developer</p>
                  <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-6">
                    "The mentorship program through DevNexus is outstanding. Connected with senior 
                    developers who genuinely care about helping others grow. My coding skills improved 
                    dramatically thanks to the community."
                  </p>
                  <div className="flex text-yellow-400 text-lg">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>

              {/* Testimonial 8 */}
              <div className="flex-shrink-0 w-96 bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-rose-500/30 shadow-2xl">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute -inset-1 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full blur opacity-40"></div>
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-rose-500/50">
                      <img 
                        src="https://t3.ftcdn.net/jpg/02/11/65/10/240_F_211651043_dwEPQfpE3acdwhaq0BwZ9xLLBEO3PQRs.jpg" 
                        alt="Emma Davis"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">Emma Davis</h4>
                  <p className="text-rose-400 text-sm font-medium mb-4">UI/UX Designer</p>
                  <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-6">
                    "As a designer working with developers, DevNexus helped me understand the tech 
                    side better. The cross-disciplinary connections I made improved my design skills 
                    and collaboration with dev teams."
                  </p>
                  <div className="flex text-yellow-400 text-lg">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>

              {/* Duplicate first few for seamless loop */}
              <div className="flex-shrink-0 w-96 bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30 shadow-2xl">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-40"></div>
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-purple-500/50">
                      <img 
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww" 
                        alt="Alex Chen"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">Alex Chen</h4>
                  <p className="text-purple-400 text-sm font-medium mb-4">Senior Frontend Developer</p>
                  <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-6">
                    "DevNexus transformed how I connect with other developers. Found amazing mentors 
                    and collaborators for my projects. The platform is intuitive and genuinely helpful 
                    for building meaningful professional relationships."
                  </p>
                  <div className="flex text-yellow-400 text-lg">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 w-96 bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-pink-500/30 shadow-2xl">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-orange-600 rounded-full blur opacity-40"></div>
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-pink-500/50">
                      <img 
                        src="https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww" 
                        alt="Sarah Johnson"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">Sarah Johnson</h4>
                  <p className="text-pink-400 text-sm font-medium mb-4">Full Stack Engineer</p>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    "As a bootcamp graduate, DevNexus helped me find experienced developers willing 
                    to mentor me. The connections I made here changed my career trajectory completely. 
                    Highly recommend for new developers!"
                  </p>
                  <div className="flex text-yellow-400 text-lg">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-800/50 to-pink-800/50 backdrop-blur-sm rounded-2xl p-12 border border-purple-500/30">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Connecting?</h2>
              <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
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