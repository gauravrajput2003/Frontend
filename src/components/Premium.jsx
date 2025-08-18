import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/Constant'

const Premium = () => {
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
            alert("Payment verified. Premium will reflect shortly.");
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
    <div className='mt-40 p-10'>
        <div className="flex w-full">
  <div className="card bg-base-300 rounded-box grid h-50 grow place-items-center"><h1 className='font-bold text-2xl'>silver Membership</h1>
  <ul>
    <li>-chat with other peole</li>
    <li>-100 connection requests per day</li>
    <li>-get blue tick</li>
  </ul>
  <button  onClick={()=>handleBuyClick("silver")}  className='bg-pink-700'>Buy Silver</button>
  </div>
  <div className="divider divider-horizontal">OR</div>
  <div className="card bg-base-300 rounded-box grid h-50 grow place-items-center"><h1 className='font-bold text-2xl'>gold Membership</h1>
  
    <ul>
    <li>-chat with other peole</li>
    <li>-100 connection requests per day</li>
    <li>-get blue tick</li>
  </ul>
  <button onClick={()=>handleBuyClick("gold")} className='bg-blue-700 rounded'>Buy Gold</button></div>
</div>
    </div>
  )
}

export default Premium