import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/Constant'

const Premium = () => {
  const dispatch = useDispatch();
  const handleBuyClick = async (type) => {
    try {
      // Defensive: ensure Razorpay script is present
      if (!window.Razorpay) {
        alert("Payment system not loaded yet. Please wait a moment and try again.");
        return;
      }

      const resp = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );

      const data = resp?.data || {};
      const keyId = data.keyId;
      const ord = data.order || {};
      const { id: orderId, amount, currency, notes = {} } = ord;

      if (!keyId || !orderId) {
        console.error("Invalid order response:", data);
        alert("Could not start payment. Please login and try again.");
        return;
      }

      const options = {
        key: keyId,
        amount,
        currency,
        name: "DevNexus",
        description: `Premium membership: ${notes.membershipType || type}`,
        order_id: orderId,
        prefill: {
          name: `${notes.firstName || ''} ${notes.lastName || ''}`.trim(),
          email: notes.email || '',
        },
        theme: { color: "#3399cc" },
        handler: async function (response) {
          // Verify on server as a fallback to webhook
          try {
            await axios.post(
              BASE_URL + "/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );
            // Refresh user so UI reflects premium immediately
            try {
              const me = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
              dispatch(addUser(me.data));
            } catch (fetchErr) {
              console.warn("Refresh user failed after verify:", fetchErr?.response?.data || fetchErr?.message || fetchErr);
            }
            alert("Payment verified. Premium is now active.");
          } catch (e) {
            console.error("Verify failed:", e?.response?.data || e?.message || e);
            // Still rely on webhook; inform the user
            alert("Payment received. If premium doesn’t show in 1-2 minutes, refresh.");
          }
        },
        modal: {
          ondismiss: function () {
            console.log("Payment popup closed by user");
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        console.error("Payment failed:", response?.error || response);
        alert("Payment failed. Please try again or use a different method.");
      });
      rzp.open();
    } catch (err) {
      // Common production issue: 401 due to not logged in (no cookie)
      const status = err?.response?.status;
      if (status === 401) {
        alert("Please login to purchase premium.");
      } else {
        console.error("Order creation error:", err?.response?.data || err?.message || err);
        alert("Could not start payment. Please try again.");
      }
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
            ✨ Unlock Your Premium Experience
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Take your DevNexus journey to the next level! Connect with like-minded developers, 
            showcase your expertise, and build meaningful professional relationships.
          </p>
        </div>
        
        {/* Benefits Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="text-lg font-semibold text-white mb-2">Unlimited Chat</h3>
            <p className="text-slate-400 text-sm">Connect and chat with developers worldwide</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="text-lg font-semibold text-white mb-2">Priority Matching</h3>
            <p className="text-slate-400 text-sm">Get matched with top developers first</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20">
            <div className="text-3xl mb-3">⭐</div>
            <h3 className="text-lg font-semibold text-white mb-2">Verified Badge</h3>
            <p className="text-slate-400 text-sm">Stand out with your premium verification</p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Silver Plan */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border border-pink-500/30 hover:border-pink-500/60 transition-all duration-300 transform hover:scale-105">
              
              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-4">
                  <span className="text-2xl">🥈</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Silver Membership</h2>
                <div className="text-4xl font-bold text-pink-400 mb-2">₹30</div>
                <p className="text-slate-400">Perfect for growing developers</p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center">
                    <span className="text-pink-400 text-sm">✓</span>
                  </div>
                  <span className="text-slate-300">Unlimited messaging with other developers</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center">
                    <span className="text-pink-400 text-sm">✓</span>
                  </div>
                  <span className="text-slate-300">100 connection requests per day</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center">
                    <span className="text-pink-400 text-sm">✓</span>
                  </div>
                  <span className="text-slate-300">Silver verified badge on profile</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center">
                    <span className="text-pink-400 text-sm">✓</span>
                  </div>
                  <span className="text-slate-300">Priority in search results</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center">
                    <span className="text-pink-400 text-sm">✓</span>
                  </div>
                  <span className="text-slate-300">Advanced profile customization</span>
                </div>
              </div>

              {/* CTA Button */}
              <button 
                onClick={() => handleBuyClick("silver")}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/25"
              >
                🚀 Upgrade to Silver
              </button>
            </div>
          </div>

          {/* Gold Plan */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-85 transition duration-300"></div>
            <div className="relative bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/40 hover:border-yellow-500/70 transition-all duration-300 transform hover:scale-105">
              
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 text-sm font-bold px-4 py-2 rounded-full">
                  🔥 MOST POPULAR
                </span>
              </div>

              {/* Plan Header */}
              <div className="text-center mb-8 mt-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4">
                  <span className="text-2xl">🥇</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Gold Membership</h2>
                <div className="text-4xl font-bold text-yellow-400 mb-2">₹50</div>
                <p className="text-slate-400">For serious professionals</p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <span className="text-yellow-400 text-sm">✓</span>
                  </div>
                  <span className="text-slate-300">Everything in Silver +</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <span className="text-yellow-400 text-sm">✓</span>
                  </div>
                  <span className="text-slate-300">Unlimited connection requests</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <span className="text-yellow-400 text-sm">✓</span>
                  </div>
                  <span className="text-slate-300">Exclusive Gold verified badge</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <span className="text-yellow-400 text-sm">✓</span>
                  </div>
                  <span className="text-slate-300">See who viewed your profile</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <span className="text-yellow-400 text-sm">✓</span>
                  </div>
                  <span className="text-slate-300">Advanced matching algorithms</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <span className="text-yellow-400 text-sm">✓</span>
                  </div>
                  <span className="text-slate-300">Priority customer support</span>
                </div>
              </div>

              {/* CTA Button */}
              <button 
                onClick={() => handleBuyClick("gold")}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-slate-900 font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
              >
                ⭐ Upgrade to Gold
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16 space-y-4">
          <div className="flex justify-center items-center gap-6 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-400">🔒</span>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400">⚡</span>
              <span>Instant Activation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-400">💎</span>
              <span>Premium Support</span>
            </div>
          </div>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            Join thousands of developers who have already upgraded their networking experience. 
            Your subscription helps us build better features and maintain a high-quality community.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Premium