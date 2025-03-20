import { useState } from 'react'
import { FaCreditCard, FaWallet, FaLock } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './payementGateway.css'
import { useNavigate } from 'react-router-dom'

export default function PaymentGateway() {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    amount: '',
    month: '',
    year: '',
    cvc: ''
  })

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    setLoading(false)

    // Show success toast
    toast.success('Payment Successful!')

    await new Promise(resolve => setTimeout(resolve, 2000))

    navigate('/')
  }

  return (
    <div className="payment-container w-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="payment-card">
        <div className="payment-header">
          <h2 className="payment-title">Secure Payment</h2>
          <p className="payment-description">
            Complete your purchase securely with our payment gateway
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="payment-content">
            <div className="payment-method-section">
              <label className="section-label">Payment Method</label>
              <div className="">
                <label className={`method-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <FaCreditCard className="method-icon" />
                  <span>Credit Card</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name">Cardholder Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name on card"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cardNumber">Amount</label>
              <input
                type="text"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="month">Expiry Month</label>
                <select
                  id="month"
                  name="month"
                  value={formData.month}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Month</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                      {String(i + 1).padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="year">Expiry Year</label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Year</option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={String(new Date().getFullYear() + i)}>
                      {new Date().getFullYear() + i}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="cvc">CVC</label>
                <input
                  type="text"
                  id="cvc"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength="4"
                  required
                />
              </div>
            </div>
          </div>

          <div className="payment-footer">
            <button 
              type="submit" 
              className={`submit-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
