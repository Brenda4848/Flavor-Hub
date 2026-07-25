// src/components/FAQ.jsx
"use client"
import { useState } from "react"

const faqs = [
  {
    id: 1,
    question: "How fast is delivery?",
    answer: "We deliver most orders within 20–35 minutes depending on your location and the restaurant's preparation time. You can track your order in real time once it's been confirmed.",
  },
  {
    id: 2,
    question: "Can I book a private chef?",
    answer: "Yes! FlavorHub offers private chef bookings for intimate dinners, chef's table experiences, cooking classes, and full catering services. Visit our 'Book a Chef' page to choose your experience and preferred chef.",
  },
  {
    id: 3,
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards (Visa, Mastercard), bank transfers, and popular mobile payment options. All transactions are encrypted and secure.",
  },
  {
    id: 4,
    question: "Is there a loyalty program?",
    answer: "Yes! Every order earns you FlavorPoints. Accumulate points and redeem them for discounts, free dishes, and exclusive member-only deals. Sign up to start earning today.",
  },
  {
    id: 5,
    question: "Can I schedule an order in advance?",
    answer: "Absolutely. You can schedule orders up to 7 days in advance. Simply select your preferred delivery date and time during checkout.",
  },
 
]

export default function FAQ() {
    const [openId, setOpenId] = useState(null)

  const toggle = (id) => {
    setOpenId(prev => prev === id ? null : id)
  }

  return (
   <div>
    <section className="bg-white dark:bg-gray-950 py-20 px-6 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
            Frequently asked questions
          </h2>
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map(faq => (
            <div
              key={faq.id}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                openId === faq.id
                  ? "border-orange-200 dark:border-orange-800 shadow-sm"
                  : "border-gray-200 dark:border-gray-800"
              } bg-white dark:bg-gray-900`}
            >
              {/* Question row */}
              <button
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between px-6 py-5 text-left group"
              >
                <span className={`font-bold text-base transition-colors ${
                  openId === faq.id
                    ? "text-orange-500"
                    : "text-gray-900 dark:text-white group-hover:text-orange-500"
                }`}>
                  {faq.question}
                </span>

                {/* +/- icon */}
                <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ml-4 transition-all duration-300 ${
                  openId === faq.id
                    ? "border-orange-500 bg-orange-500 text-white rotate-45"
                    : "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 group-hover:border-orange-400 group-hover:text-orange-400"
                }`}>
                  <span className="text-lg font-light leading-none">+</span>
                </span>
              </button>

              {/* Answer — animated */}
              <div className={`transition-all duration-300 ease-in-out ${
                openId === faq.id ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}>
                <p className="px-6 pb-6 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

       

      </div>
    </section>
   </div>
  )
}

