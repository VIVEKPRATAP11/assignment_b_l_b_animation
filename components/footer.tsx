"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Ship, Anchor, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  const footerLinks = [
    { name: "Boats", href: "#boats", icon: <Ship className="w-4 h-4 mr-2" /> },
    { name: "Destinations", href: "#destinations", icon: <Anchor className="w-4 h-4 mr-2" /> },
    { name: "About Us", href: "#about", icon: <Ship className="w-4 h-4 mr-2" /> },
    { name: "Contact", href: "#contact", icon: <Phone className="w-4 h-4 mr-2" /> },
  ]

  const socialLinks = [
    { name: "Facebook", href: "#", icon: <Facebook className="w-5 h-5" /> },
    { name: "Twitter", href: "#", icon: <Twitter className="w-5 h-5" /> },
    { name: "Instagram", href: "#", icon: <Instagram className="w-5 h-5" /> },
    { name: "LinkedIn", href: "#", icon: <Linkedin className="w-5 h-5" /> },
  ]

  return (
    <footer className="py-20 md:py-32 px-4 md:px-8 bg-[#0a192f] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center mr-4">
                <Ship className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  <span className="text-white">Luxury</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    Boats
                  </span>
                </h3>
                <p className="text-gray-400 text-sm">Premium Boat Rental Service</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 max-w-md">
              Experience the ultimate freedom on water with our premium yacht and boat rentals. We offer a curated
              selection of luxury vessels for unforgettable adventures.
            </p>

            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Phone className="w-5 h-5 mr-3 text-blue-400" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="w-5 h-5 mr-3 text-blue-400" />
                <span>info@luxuryboats.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-3 text-blue-400" />
                <span>123 Marina Drive, Miami, FL 33101</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center"
                      data-cursor="link"
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <h3 className="text-lg font-medium mb-4 mt-8">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-500/20 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    data-cursor="link"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Newsletter</h3>
              <p className="text-gray-400 text-sm mb-4">
                Subscribe to our newsletter for the latest updates on luxury boats and exclusive offers.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-cursor="button"
                >
                  Subscribe
                </motion.button>
              </form>
            </div>
          </div>
        </div>

        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-gray-500 border-t border-white/10 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p>© 2025 LuxuryBoats. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex gap-4">
            <Link href="#" className="hover:text-blue-400 transition-colors duration-300" data-cursor="link">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-blue-400 transition-colors duration-300" data-cursor="link">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-blue-400 transition-colors duration-300" data-cursor="link">
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
