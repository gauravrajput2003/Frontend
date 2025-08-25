import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/Constant'

const skillOptions = [
  "C++", "Go", "C", "Python", "JavaScript", "Express", "React", "Node.js", "Java", "TypeScript", "MongoDB", "SQL", "HTML", "CSS", "Django", "Flask", "Vue", "Angular", "Next.js", "Redux"
];

const Login = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Error, setError] = useState();
  const [islogin, setislogin] = useState(true);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [about, setAbout] = useState("");
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setError("Email is incorrect");
      return;
    }
    if (!password.trim()) {
      setError("Password is required");
      return;
    }
    try {
      const res = await axios.post(BASE_URL + "/login", {
        email,
        password
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      dispatch(addUser(res.data.user));
      navigate("/")
    }
    catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignup = async () => {
    if (!firstName.trim()) {
      setError("First name is required");
      return;
    }
    if (!lastName.trim()) {
      setError("Last name is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Email is incorrect");
      return;
    }
    if (!password.trim()) {
      setError("Password is required");
      return;
    }
    if (skills.length < 2) {
      setError("Please select at least 2 skills");
      return;
    }
    if (skills.length > 4) {
      setError("You can select a maximum of 4 skills");
      return;
    }
    if (!about.trim()) {
      setError("Please enter something about yourself");
      return;
    }
    try {
      const res = await axios.post(BASE_URL + "/signup", {
        firstName,
        lastName,
        email,
        password,
        skills,
        about
      }, {
        withCredentials: true
      });
      dispatch(addUser(res.data.data));
      navigate("/profile");
    }
    catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-dots"></div>
      
      <div className="relative w-full max-w-md">
        {/* Login/Signup Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {islogin ? "Welcome Back!" : "Create Account"}
            </h2>
            <p className="text-slate-400">
              {islogin ? "Sign in to your account" : "Join the developer community"}
            </p>
          </div>

          <form className="space-y-6">
            {/* First Name & Last Name - Only for Signup */}
            {!islogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Skills & About - Only for Signup */}
            {!islogin && (
              <>
                {/* Skills Section */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Select Skills (2-4)
                  </label>
                  <div className="flex gap-2 mb-2">
                    <select
                      value={selectedSkill}
                      onChange={e => setSelectedSkill(e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="" disabled>Select a skill</option>
                      {skillOptions.filter(skill => !skills.includes(skill)).map(skill => (
                        <option key={skill} value={skill}>{skill}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!selectedSkill || skills.includes(selectedSkill) || skills.length >= 4}
                      onClick={() => {
                        if (selectedSkill && !skills.includes(selectedSkill) && skills.length < 4) {
                          setSkills([...skills, selectedSkill]);
                          setSelectedSkill("");
                          setError("");
                        }
                      }}
                    >
                      Add
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">Select and add 2 to 4 skills</p>
                  
                  {/* Selected Skills */}
                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {skills.map(skill => (
                        <span key={skill} className="inline-flex items-center px-3 py-1 bg-purple-600/20 border border-purple-500/30 text-purple-200 rounded-full text-sm">
                          {skill}
                          <button
                            type="button"
                            className="ml-2 text-purple-300 hover:text-white transition-colors"
                            onClick={() => setSkills(skills.filter(s => s !== skill))}
                            aria-label={`Remove ${skill}`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* About Section */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    About Yourself
                  </label>
                  <textarea
                    value={about}
                    onChange={e => setAbout(e.target.value)}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                    rows={3}
                    maxLength={300}
                  />
                </div>
              </>
            )}

            {/* Error Message */}
            {Error && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-red-200 text-sm">{Error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={islogin ? handleLogin : handleSignup}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
              {islogin ? "Login" : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-800 text-slate-400">OR</span>
              </div>
            </div>
          </div>

          {/* Toggle Link */}
          <div className="text-center">
            <p className="text-slate-400 mb-3">
              {islogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              type="button"
              onClick={() => {
                setislogin(!islogin);
                setError("");
                setSkills([]);
                setSelectedSkill("");
                setAbout("");
                setFirstName("");
                setLastName("");
                setemail("");
                setpassword("");
              }}
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
            >
              {islogin ? "Sign up here" : "Login here"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login