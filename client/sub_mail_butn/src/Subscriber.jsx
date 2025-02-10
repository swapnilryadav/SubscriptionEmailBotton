'use client'

import { useState, useEffect } from "react"
import { Mail, X, CheckCircle, AlertCircle } from 'lucide-react'
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const API_URL = "https://subscriptionbuttonemail.onrender.com"

const CustomToast = ({ message, type }) => (
  <div className={`custom-toast ${type}`}>
    {type === 'success' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
    <p>{message}</p>
  </div>
)

const Subscriber = () => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    if (email.includes("@")) {
      checkSubscriptionStatus(email)
    }
  }, [email])

  const checkSubscriptionStatus = async (emailToCheck) => {
    try {
      const response = await axios.post(`${API_URL}/check-status`, { email: emailToCheck })
      setIsSubscribed(response.data.isSubscribed)
    } catch (error) {
      console.error("Error checking subscription status:", error)
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubscribe = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${API_URL}/subscribe`, { email })
      setIsSubscribed(true)
      toast(<CustomToast message={response.data.message} type="success" />, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'custom-toast-container',
      })
    } catch (error) {
      toast(<CustomToast message={error.response?.data?.message || "Subscription failed!"} type="error" />, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'custom-toast-container',
      })
    }
  }

  const handleUnsubscribe = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.delete(`${API_URL}/unsubscribe`, { data: { email } })
      setIsSubscribed(false)
      setEmail("")
      toast(<CustomToast message={response.data.message} type="success" />, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'custom-toast-container',
      })
    } catch (error) {
      toast(<CustomToast message={error.response?.data?.message || "Unsubscription failed!"} type="error" />, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'custom-toast-container',
      })
    }
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1>Email Subscription System</h1>
        <form onSubmit={isSubscribed ? handleUnsubscribe : handleSubscribe}>
          <div className="input-container">
            <input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} required />
          </div>
          <button type="submit" className={isSubscribed ? "unsubscribe-btn" : "subscribe-btn"}>
            {isSubscribed ? (
              <>
                <X size={16} /> Unsubscribe
              </>
            ) : (
              <>
                <Mail size={16} /> Subscribe
              </>
            )}
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default Subscriber
