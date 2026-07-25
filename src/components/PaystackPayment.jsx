// src/components/PaystackPayment.jsx
"use client"
import { usePaystackPayment } from "react-paystack"
import { useState } from "react"

export default function PaystackPayment({ amount, email, name, onSuccess, onClose, label = "Pay Now" }) {
  const amountInKobo = Math.round(amount * 100) // Paystack uses kobo

  const config = {
    reference: `FH_${Date.now()}`,
    email: email || "customer@flavorhub.com",
    amount: amountInKobo,
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

  return (
    <button
      onClick={() => initializePayment(onSuccess, onClose)}
      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-sm"
    >
      <span>🔒</span>
      {label} — ${amount.toFixed(2)}
    </button>
  )
}