"use client"
import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"        // ← add this
import { FaRegClock } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { LuChefHat } from "react-icons/lu";
import { FaWineGlassAlt } from "react-icons/fa";
import { LuCookingPot } from "react-icons/lu";
import { GiPartyPopper } from "react-icons/gi";

const EXPERIENCES = [
  {
    id: "private-dinner",
    label: "Private Dinner",
    icon: <FaWineGlassAlt className="h-10 w-10 text-red-700" />,
    description: "An intimate chef-curated dinner experience at your home",
    price: 2000,
    duration: "3 hours",
    guests: "2–8 guests",
    includes: ["3-course meal", "Wine pairing", "Table setup", "Cleanup"],
  },
  {
    id: "chefs-table",
    label: "Chef's Table",
    icon: <LuChefHat className="w-10 h-10 text-yellow-400" />,
    description: "Watch the chef create a masterpiece right before your eyes",
    price: 2200,
    duration: "4 hours",
    guests: "2–6 guests",
    includes: ["5-course tasting menu", "Live cooking show", "Chef's commentary", "Dessert pairing"],
  },
  {
    id: "cooking-class",
    label: "Cooking Class",
    icon: <LuCookingPot className="w-10 h-10 text-orange-500" />,
    description: "Learn to cook signature dishes with a professional chef",
    price: 1220,
    duration: "2 hours",
    guests: "2–12 guests",
    includes: ["Hands-on cooking", "Recipe booklet", "Tasting session", "Apron included"],
  },
  {
    id: "catering",
    label: "Catering",
    icon: <GiPartyPopper className="w-10 h-10 text-green-500" />,
    description: "Full-service catering for your events and celebrations",
    price: 2000,
    duration: "5–8 hours",
    guests: "20–100 guests",
    includes: ["Full menu planning", "Staff included", "Setup & cleanup", "Custom menu"],
  },
]

const CHEFS = [
  { id: "c1", name: "Chef Marco", specialty: "Italian Cuisine", rating: 4.9, avatar: "👨‍🍳" },
  { id: "c2", name: "Chef Aisha", specialty: "African Fusion", rating: 4.8, avatar: "👩‍🍳" },
  { id: "c3", name: "Chef James", specialty: "Continental", rating: 4.7, avatar: "🧑‍🍳" },
]

// ── Paystack button as its own inner component ──────────────────────────────
function PayButton({
  amount,
  email,
  name,
  onSuccess,
  onClose,
  disabled,
}) {
  const handlePayment = async () => {
  const PaystackPop = (await import("@paystack/inline-js")).default;

  const popup = new PaystackPop();

  popup.newTransaction({
    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,

    email,

    amount: Math.round(amount * 100),

    currency: "NGN",

    reference: `FH_CHEF_${Date.now()}`,

    metadata: {
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: name,
        },
      ],
    },

    onSuccess: (transaction) => {
      onSuccess(transaction);
    },

    onCancel: () => {
      onClose();
    },
  });
};

  if (disabled) {
    return (
      <div className="w-full mt-6 bg-gray-200 dark:bg-gray-700 text-gray-400 font-bold py-4 rounded-2xl text-center text-sm cursor-not-allowed">
        Fill all details to pay
      </div>
    )
  }

  return (
    <button
      onClick={handlePayment}
      className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
    >
      🔒 Pay ₦{amount.toLocaleString()} with Paystack
    </button>
  )
}

// ────────────────────────────────────────────────────────────────────────────

export default function BookAChefPage() {
  const router = useRouter()
  const { user } = useAuth()                          // ← get logged in user
  const [selected, setSelected] = useState(EXPERIENCES[0])
  const [selectedChef, setSelectedChef] = useState(null)
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [guests, setGuests] = useState(2)
  const [booked, setBooked] = useState(false)
  const [paymentRef, setPaymentRef] = useState(null)  // ← store payment ref
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: "",
    address: "",
    email: user?.email || "",                         // ← add email field
  })

  const serviceFee = 25
  const total = selected.price + serviceFee

  const isFormValid = date && time && form.name && form.phone && form.address && form.email

  // Called when Paystack payment succeeds
  const handlePaymentSuccess = (reference) => {
    setPaymentRef(reference.reference)
    setBooked(true)
    setTimeout(() => router.push("/"), 4000)
  }

  // Called when user closes Paystack popup without paying
  const handlePaymentClose = () => {
    alert("Payment cancelled. You can try again when ready.")
  }

  if (booked) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center text-center px-6 transition-colors">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-10 shadow-sm max-w-md w-full">
        <span className="text-6xl">🎉</span>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-4">
          Booking Confirmed!
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Your <span className="text-orange-500 font-bold">{selected.label}</span> experience
          has been booked for <span className="font-bold">{date}</span> at{" "}
          <span className="font-bold">{time}</span>.
        </p>
        {/* Payment reference */}
        {paymentRef && (
          <div className="mt-4 bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <p className="text-xs text-gray-400">Payment Reference</p>
            <p className="text-sm font-mono font-bold text-gray-900 dark:text-white mt-0.5">
              {paymentRef}
            </p>
          </div>
        )}
        <div className="mt-6 bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-4">
          <p className="text-orange-600 dark:text-orange-400 font-semibold text-sm">
            Your chef will contact you within 24 hours to confirm details. 👨‍🍳
          </p>
        </div>
        <p className="text-sm text-gray-400 mt-6">Redirecting you home...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Navbar />

      {/* Hero */}
      <div className="bg-linear-to-r from-orange-500 to-red-500 px-6 py-14 text-center">
        <p className="text-orange-100 text-sm font-semibold uppercase tracking-widest mb-2">
          Premium Experience
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Book a Private Chef</h1>
        <p className="text-orange-100 mt-3 max-w-lg mx-auto">
          Bring restaurant-quality dining to your home with our world-class chefs
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT — Form */}
        <div className="lg:col-span-2 space-y-6">

          {/* Experience selector */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 dark:text-white text-xl mb-5">
              1. Choose Your Experience
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EXPERIENCES.map(exp => (
                <button
                  key={exp.id}
                  onClick={() => setSelected(exp)}
                  className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                    selected.id === exp.id
                      ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                      : "border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-700 bg-gray-50 dark:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{exp.icon}</span>
                    {selected.id === exp.id && (
                      <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</span>
                    )}
                  </div>
                  <p className="font-bold text-gray-900 dark:text-white">{exp.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{exp.description}</p>
                  <p className="text-orange-500 font-extrabold mt-3">${exp.price}</p>
                  <div className="flex gap-3 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <FaRegClock className="w-3 h-3" /> {exp.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MdPeopleAlt className="w-3 h-3" /> {exp.guests}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* What's included */}
            <div className="mt-5 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                ✅ What's included in {selected.label}:
              </p>
              <div className="grid grid-cols-2 gap-1">
                {selected.includes.map(item => (
                  <p key={item} className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <span className="text-green-500">•</span> {item}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Chef selector */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 dark:text-white text-xl mb-5">
              2. Pick a Chef{" "}
              <span className="text-gray-400 text-sm font-normal">(optional)</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {CHEFS.map(chef => (
                <button
                  key={chef.id}
                  onClick={() => setSelectedChef(chef.id === selectedChef ? null : chef.id)}
                  className={`p-4 rounded-2xl border-2 text-center transition-all duration-200 ${
                    selectedChef === chef.id
                      ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                      : "border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-orange-200"
                  }`}
                >
                  <span className="text-4xl">{chef.avatar}</span>
                  <p className="font-bold text-gray-900 dark:text-white text-sm mt-2">{chef.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{chef.specialty}</p>
                  <p className="text-xs text-yellow-500 font-bold mt-1">⭐ {chef.rating}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Date, time, guests */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 dark:text-white text-xl mb-5">
              3. Date, Time & Guests
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">Guests</label>
                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  <button onClick={() => setGuests(g => Math.max(1, g - 1))} className="px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-bold text-lg">−</button>
                  <span className="flex-1 text-center text-sm font-bold text-gray-900 dark:text-white">{guests}</span>
                  <button onClick={() => setGuests(g => g + 1)} className="px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-bold text-lg">+</button>
                </div>
              </div>
            </div>
          </div>

          {/* Your details — now includes email */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 dark:text-white text-xl mb-5">
              4. Your Details
            </h2>
            <div className="space-y-4">
              {[
                { key: "name", type: "text", placeholder: "Full Name" },
                { key: "email", type: "email", placeholder: "Email Address" },
                { key: "phone", type: "text", placeholder: "Phone Number" },
                { key: "address", type: "text", placeholder: "Address" },
              ].map(field => (
                <input
                  key={field.key}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Booking Summary (sticky) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 dark:text-white text-xl mb-6">
              Booking Summary
            </h2>

            {/* Selected experience */}
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-4 mb-5">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selected.icon}</span>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{selected.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {selected.duration} · {selected.guests}
                  </p>
                </div>
              </div>
            </div>

            {/* Selected chef */}
            {selectedChef && (
              <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                <span className="text-2xl">{CHEFS.find(c => c.id === selectedChef)?.avatar}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {CHEFS.find(c => c.id === selectedChef)?.name}
                  </p>
                  <p className="text-xs text-gray-400">Selected chef</p>
                </div>
              </div>
            )}

            {/* Date/time */}
            {(date || time) && (
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl text-sm text-gray-600 dark:text-gray-300">
                {date && <p>📅 {new Date(date).toDateString()}</p>}
                {time && <p>🕐 {time}</p>}
                <p>👥 {guests} guest{guests > 1 ? "s" : ""}</p>
              </div>
            )}

            {/* Price breakdown */}
            <div className="space-y-3 border-t border-gray-100 dark:border-gray-700 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">{selected.label}</span>
                <span className="font-semibold text-gray-900 dark:text-white">${selected.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Service fee</span>
                <span className="font-semibold text-gray-900 dark:text-white">${serviceFee}</span>
              </div>
              <div className="flex justify-between font-extrabold text-lg border-t border-gray-100 dark:border-gray-700 pt-3">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span className="text-orange-500">${total}</span>
              </div>
            </div>

            {/* Paystack security badge */}
            <div className="mt-5 flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
              <span>🔒</span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Secured by Paystack
                </p>
                <p className="text-[10px] text-gray-400">
                  Visa · Mastercard · Bank Transfer
                </p>
              </div>
              <div className="flex gap-1">
                <div className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">VISA</div>
                <div className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">MC</div>
              </div>
            </div>

            {/* Test mode notice */}
            <div className="mt-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl px-3 py-2">
              <p className="text-[10px] text-yellow-700 dark:text-yellow-400 font-medium">
                ⚠️ Test mode · Card: <span className="font-mono">4084 0840 8408 4081</span> · CVV: <span className="font-mono">408</span>
              </p>
            </div>

            {/* ── Paystack Pay Button ── */}
            <PayButton
              amount={total}
              email={form.email}
              name={form.name}
              onSuccess={handlePaymentSuccess}
              onClose={handlePaymentClose}
              disabled={!isFormValid}
            />

            <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-3">
              No charge until chef confirms · Free cancellation 24h before
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}