import Image from "next/image";
import Link from "next/link";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaPhoneAlt,
  FaRegClock,
} from "react-icons/fa";

import { MdLocationOn, MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-[#1d1f2e] text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <Image
              src="/flavhub.png"
              alt="FlavorHub"
              width={40}
              height={40}
            />

            <h2 className="text-3xl font-bold text-white">
              FlavorHub
            </h2>
          </div>

          <p className="text-gray-400 leading-relaxed mb-8 max-w-xs">
            A complete restaurant management & food ordering
            platform — built for customers, kitchens, and riders.
          </p>

          <div className="space-y-4 text-gray-300">
            <div className="flex items-center gap-3">
              <MdLocationOn size={18} />
              <span>128 Greenwich Ave, New York, NY</span>
            </div>

            <div className="flex items-center gap-3">
              <FaPhoneAlt size={16} />
              <span>(212) 555-0142</span>
            </div>

            <div className="flex items-center gap-3">
              <MdEmail size={18} />
              <span>hello@flavorhub.com</span>
            </div>

            <div className="flex items-center gap-3">
              <FaRegClock size={16} />
              <span>Open daily · 09:00 – 23:30</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-8">
           {[
  { icon: <FaInstagram size={18} />, href: "#" },
  { icon: <FaTwitter size={18} />, href: "#" },
  { icon: <FaFacebookF size={18} />, href: "#" },
  { icon: <FaYoutube size={18} />, href: "#" },
].map((social, index) => (
  <a
    key={index}
    href={social.href}
    className="w-11 h-11 rounded-full bg-[#31344b] hover:bg-orange-500 transition duration-300 flex items-center justify-center"
  >
    {social.icon}
  </a>
))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-bold uppercase mb-6">
            Company
          </h3>

          <ul className="space-y-4">
            {["About", "Careers", "Press", "Partners"].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="hover:text-white transition"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-bold uppercase mb-6">
            Support
          </h3>

          <ul className="space-y-4">
            {[
              "Help center",
              "Order status",
              "Contact us",
              "Refunds",
            ].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="hover:text-white transition"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white font-bold uppercase mb-6">
            Legal
          </h3>

          <ul className="space-y-4">
            {[
              "Terms",
              "Privacy",
              "Cookies",
              "Licensing",
            ].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="hover:text-white transition"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700/50" />

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm">
          © 2026 FlavorHub. All rights reserved.
        </p>

        <p className="text-gray-500 text-sm">
          Crafted with 🔥 in NYC.
        </p>
      </div>
    </footer>
  );
}