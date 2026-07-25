// src/app/checkout/page.jsx
"use client"
import { useCart } from "@/context/CartContext"
import { useOrderNotification } from "@/context/OrderNotificationContext"
import { useAuth } from "@/context/AuthContext"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import { usePaystackPayment } from "react-paystack"

// ── Paystack button ────────────────────────────────────────────────────────
function PayButton({ amount, email, name, onSuccess, onClose, disabled }) {
  const config = {
    reference: `FH_${Date.now()}`,
    email: email || "customer@flavorhub.com",
    amount: Math.round(amount * 100),
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    metadata: {
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: name || "Customer",
        },
      ],
    },
  }

  const initializePayment = usePaystackPayment(config)

  if (disabled) {
    return (
      <div className="w-full bg-gray-200 dark:bg-gray-700 text-gray-400 font-bold py-4 rounded-2xl text-center text-sm cursor-not-allowed">
        Fill in delivery details to pay
      </div>
    )
  }

  return (
    <button
      onClick={() => initializePayment(onSuccess, onClose)}
      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-sm text-base"
    >
      🔒 Pay ${amount.toFixed(2)} with Paystack
    </button>
  )
}
// ────────────────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const { cartItems, total, clearCart } = useCart()
  const { startOrderTimer } = useOrderNotification()
  const { user } = useAuth()
  const router = useRouter()

  const [placed, setPlaced] = useState(false)
  const [paymentRef, setPaymentRef] = useState(null)
  const [orderDetails, setOrderDetails] = useState(null)
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  })

  const deliveryFee = 2.99
  const grandTotal = total + deliveryFee
  const isFormValid = form.name && form.email && form.phone && form.address

  const handlePaymentSuccess = (reference) => {
    const orderId = `ORD-${Date.now()}`

    const order = {
      id: orderId,
      name: form.name,
      phone: form.phone,
      address: form.address,
      email: form.email,
      items: cartItems,
      total: grandTotal.toFixed(2),
      paymentRef: reference.reference,
      placedAt: new Date().toISOString(),
    }

    // 1. Save to localStorage for tracking page
    localStorage.setItem("lastOrder", JSON.stringify(order))

    // 2. Start 5-minute notification timer
    startOrderTimer({ id: orderId, name: form.name })

    // 3. Clear cart immediately
    clearCart()

    // 4. Save details and show success screen
    setOrderDetails(order)
    setPaymentRef(reference.reference)
    setPlaced(true)
  }

  const handlePaymentClose = () => {
    // User closed Paystack without paying — do nothing, keep cart
  }

  // ── Payment success screen ───────────────────────────────────────────────
  if (placed) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 transition-colors">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm max-w-md w-full text-center">

        {/* Success icon */}
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
          <span className="text-5xl">✅</span>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Payment Successful!
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
          Hey <span className="font-bold text-orange-500">{orderDetails?.name}</span>,
          your order has been confirmed and is being prepared!
        </p>

        {/* Payment ref */}
        {paymentRef && (
          <div className="mt-4 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3 text-left">
            <p className="text-xs text-gray-400 mb-0.5">Payment Reference</p>
            <p className="text-sm font-mono font-bold text-gray-900 dark:text-white break-all">
              {paymentRef}
            </p>
          </div>
        )}

        {/* Order info */}
        <div className="mt-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-4 text-left space-y-1">
          <p className="text-xs font-bold text-orange-500 uppercase tracking-wide mb-2">
            Order Details
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            📍 {orderDetails?.address}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            📞 {orderDetails?.phone}
          </p>
          <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
            💰 Total Paid: ${orderDetails?.total}
          </p>
        </div>

        {/* Timer notice */}
        <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl p-4">
          <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
            ⏱️ You'll get a notification in 5 minutes when your order is ready!
          </p>
        </div>

        {/* TWO ACTION BUTTONS */}
        <div className="mt-6 space-y-3">
          {/* Track order */}
          <button
            onClick={() => router.push("/order-tracking")}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2"
          >
            🛵 Track My Order
          </button>

          {/* Dismiss — go home */}
          <button
            onClick={() => router.push("/")}
            className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2"
          >
            🏠 Back to Home
          </button>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-600 mt-4">
          You'll still receive a notification when your order is ready,
          even if you go home.
        </p>
      </div>
    </div>
  )

  // ── Main checkout page ───────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
          Checkout
        </h1>

        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm mb-6">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">
            🧾 Order Summary
          </h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">
              Your cart is empty.
            </p>
          ) : (
            <>
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between py-2.5 border-b border-gray-50 dark:border-gray-800 last:border-0 text-sm"
                >
                  <span className="text-gray-700 dark:text-gray-300">
                    {item.name} × {item.qty}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Delivery fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-extrabold text-lg pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-orange-500">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Delivery Details */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm mb-6">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">
            📍 Delivery Details
          </h2>
          <div className="space-y-4">
            {[
              { key: "name",    label: "Full Name",        type: "text",  placeholder: "John Doe" },
              { key: "email",   label: "Email Address",    type: "email", placeholder: "you@example.com" },
              { key: "phone",   label: "Phone Number",     type: "tel",   placeholder: "+234 800 000 0000" },
              { key: "address", label: "Delivery Address", type: "text",  placeholder: "123 Main St, Port Harcourt" },
            ].map(field => (
              <div key={field.key}>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm">
          <h2 className="font-bold text-gray-900 dark:text-white mb-2">
            💳 Payment
          </h2>
          <p className="text-sm text-gray-400 mb-5">
            Secure payment powered by Paystack.
          </p>

          {/* Security badge */}
          <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <span className="text-2xl">🔒</span>
            <div>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Secured by Paystack
              </p>
              <p className="text-xs text-gray-400">
                Visa · Mastercard · Bank Transfer · USSD
              </p>
            </div>
            <div className="ml-auto flex gap-1.5">
              <div className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">VISA</div>
              <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">MC</div>
            </div>
          </div>

          {/* Test card notice */}
          <div className="flex items-start gap-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl px-4 py-3 mb-5">
            <span>⚠️</span>
            <p className="text-xs text-yellow-700 dark:text-yellow-400 font-medium">
              Test mode · Card:{" "}
              <span className="font-mono font-bold">4084 0840 8408 4081</span>
              {" "}· CVV: <span className="font-mono font-bold">408</span>
              {" "}· Any future expiry date
            </p>
          </div>

          {/* Pay button */}
          {cartItems.length === 0 ? (
            <div className="w-full bg-gray-200 dark:bg-gray-700 text-gray-400 font-bold py-4 rounded-2xl text-center text-sm">
              Your cart is empty
            </div>
          ) : (
            <PayButton
              amount={grandTotal}
              email={form.email}
              name={form.name}
              onSuccess={handlePaymentSuccess}
              onClose={handlePaymentClose}
              disabled={!isFormValid}
            />
          )}
        </div>
      </div>
    </div>
  )
}