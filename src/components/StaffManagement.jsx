"use client"

import { useState, useEffect, useRef } from "react"
import { FaTrash } from "react-icons/fa6";
import { GiChefToque } from "react-icons/gi";
import { FaMotorcycle } from "react-icons/fa";
import { FaUtensils } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { FaUserSlash } from "react-icons/fa";
import { FaRedoAlt } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";


const roles = [
  { id: "chef", label: "Chef", icon: GiChefToque  },
  { id: "manager", label: "Manager", icon: FaUserTie  },
  { id: "waiter", label: "Waiter", icon: FaUtensils },
  { id: "delivery", label: "Delivery Person", icon: FaMotorcycle },
]

const roleStyles = {
  chef: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800",
  manager: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800",
  waiter: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  delivery: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800",
}

// How long a new hire stays "Pending" before flipping to "Active"
const DEMO_ONBOARD_MS = 8000

const initialStaff = [
  { id: 1, name: "Tunde Bakare", role: "chef", status: "active" },
  { id: 2, name: "Amara Chukwu", role: "manager", status: "active" },
  { id: 3, name: "Ifeoma Okoro", role: "waiter", status: "active" },
]

export default function StaffManagement() {
  const [staff, setStaff] = useState(initialStaff)
  const [showModal, setShowModal] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [name, setName] = useState("")
  const [fireTarget, setFireTarget] = useState(null)
  const [toast, setToast] = useState(null)
  const [toastVisible, setToastVisible] = useState(false)
  const onboardTimers = useRef({})

  // Handles the toast's fade/slide-in and auto-dismiss
  useEffect(() => {
    if (!toast) return

    setToastVisible(false)

    const showTimer = requestAnimationFrame(() =>
      setToastVisible(true)
    )

    const hideTimer = setTimeout(
      () => setToastVisible(false),
      4500
    )

    const clearTimer = setTimeout(
      () => setToast(null),
      4900
    )

    return () => {
      cancelAnimationFrame(showTimer)
      clearTimeout(hideTimer)
      clearTimeout(clearTimer)
    }
  }, [toast])

  // Clean up any pending onboarding timers if the component unmounts
  useEffect(() => {
    return () => {
      Object.values(onboardTimers.current).forEach(clearTimeout)
    }
  }, [])

  const handleHire = () => {
    if (!selectedRole || !name.trim()) return

    const roleLabel = roles.find(
      (r) => r.id === selectedRole
    )?.label

    const newId = Date.now()
    const hiredName = name.trim()

    setStaff((prev) => [
      {
        id: newId,
        name: hiredName,
        role: selectedRole,
        status: "pending",
      },
      ...prev,
    ])

    setShowModal(false)

    setToast(
      `🎉 ${hiredName} has been hired as a ${roleLabel}! They'll be added to your profile within 24 hours.`
    )

    setName("")
    setSelectedRole(null)

    // Demo-only: automatically "complete onboarding" after a short delay
    onboardTimers.current[newId] = setTimeout(() => {
      setStaff((prev) =>
        prev.map((s) =>
          s.id === newId
            ? { ...s, status: "active" }
            : s
        )
      )

      setToast(
        `✅ ${hiredName} has completed onboarding and is now active.`
      )

      delete onboardTimers.current[newId]
    }, DEMO_ONBOARD_MS)
  }

  const handleFire = () => {
  if (!fireTarget) return

  setStaff((prev) =>
    prev.map((s) =>
      s.id === fireTarget.id
        ? { ...s, status: "inactive" }
        : s
    )
  )

  setToast(`${fireTarget.name} has been deactivated.`)
  setFireTarget(null)
}

  const handleReinstate = (member) => {
    setStaff((prev) =>
      prev.map((s) =>
        s.id === member.id
          ? { ...s, status: "active" }
          : s
      )
    )

    setToast(
      `${member.name} has been reinstated.`
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-50 dark:border-gray-800">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-extrabold text-gray-900 dark:text-white">
            Staff Management
          </h3>

          <p className="text-xs text-gray-400 mt-0.5">
            Hire or remove team members
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-linear-to-r from-orange-500 to-red-500 text-white text-sm font-semibold shadow-sm hover:shadow-md hover:brightness-105 transition-all"
        >
          <FaPlus size={14} />
          Hire Worker
        </button>
      </div>

      {/* Staff list */}
      <div className="space-y-3">

        {staff.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-6">
            No staff yet — hire your first team member!
          </p>
        )}

        {staff.map((member) => {
          const roleInfo = roles.find(
            (r) => r.id === member.role
          )

          const Icon =
            roleInfo?.icon || FaUserTie

          const isInactive =
            member.status === "inactive"

          return (
            <div
              key={member.id}
              className={`flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-colors ${
                isInactive
                  ? "border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/30 opacity-70"
                  : "border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
                    isInactive
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700"
                      : roleStyles[member.role]
                  }`}
                >
                  <Icon size={18} />
                </div>

                <div className="min-w-0">
                  <p
                    className={`text-sm font-semibold truncate ${
                      isInactive
                        ? "text-gray-400 line-through decoration-1"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {member.name}
                  </p>

                  <p className="text-xs text-gray-400">
                    {roleInfo?.label}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">

                {/* Pending */}
                {member.status === "pending" && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400">
                    <FaClock size={11} />
                    Pending
                  </span>
                )}

                {/* Active */}
                {member.status === "active" && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                    <FaCheckCircle size={12} />
                    Active
                  </span>
                )}

                {/* Deactivated */}
                {isInactive && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    <FaUserSlash size={12} />
                    Deactivated
                  </span>
                )}

                {/* Reinstate / Fire */}
                {isInactive ? (
                  <button
                    onClick={() =>
                      handleReinstate(member)
                    }
                    className="p-2 rounded-lg text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                    title="Reinstate"
                  >
                    <FaRedoAlt size={15} />
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      setFireTarget(member)
                    }
                    className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    title="Fire"
                  >
                    <FaTrash size={15} />
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Hire modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-800"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">
                Hire a New Team Member
              </h3>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <FaTimesCircle size={16} />
              </button>
            </div>

            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="e.g. John Doe"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white mb-5 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
              Select Role
            </label>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {roles.map((role) => {
                const Icon = role.icon

                const isSelected =
                  selectedRole === role.id

                return (
                  <button
                    key={role.id}
                    onClick={() =>
                      setSelectedRole(role.id)
                    }
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                      isSelected
                        ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                        : "border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        roleStyles[role.id]
                      }`}
                    >
                      <Icon size={18} />
                    </div>

                    <span
                      className={`text-xs font-semibold ${
                        isSelected
                          ? "text-orange-600 dark:text-orange-400"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {role.label}
                    </span>
                  </button>
                )
              })}
            </div>

            <button
              onClick={handleHire}
              disabled={
                !selectedRole || !name.trim()
              }
              className="w-full py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-500 text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition-all"
            >
              Confirm Hire
            </button>
          </div>
        </div>
      )}

      {/* Fire confirmation modal */}
      {fireTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setFireTarget(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-gray-100 dark:border-gray-800 text-center"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
              <FaUserSlash
                size={22}
                className="text-red-500"
              />
            </div>

            <h3 className="text-base font-extrabold text-gray-900 dark:text-white mb-1">
              Deactivate {fireTarget.name}?
            </h3>

            <p className="text-sm text-gray-400 mb-6">
              They'll be marked inactive and can be reinstated later.
            </p>

            <div className="flex gap-3">

              <button
                onClick={() =>
                  setFireTarget(null)
                }
                className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleFire}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
              >
                Yes, Deactivate
              </button>

            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
            toastVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
          }`}
        >
          <div className="flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl max-w-sm bg-white dark:bg-gray-900 border border-green-100 dark:border-green-900/30">

            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-green-50 dark:bg-green-900/20">
              <FaCheckCircle
                size={16}
                className="text-green-500"
              />
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-200 leading-snug">
              {toast}
            </p>

          </div>
        </div>
      )}
    </div>
  )
}