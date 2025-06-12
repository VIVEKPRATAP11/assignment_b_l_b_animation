"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Anchor, Ship, Search, User, Menu, X } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function GSAPNavigation() {
  const navRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navigation scroll behavior
      ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        onUpdate: (self) => {
          if (self.direction === -1) {
            // Scrolling up
            gsap.to(navRef.current, {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            })
          } else {
            // Scrolling down
            gsap.to(navRef.current, {
              y: -100,
              duration: 0.3,
              ease: "power2.out",
            })
          }
        },
      })

      // Initial navigation animation
      gsap.fromTo(
        navRef.current,
        {
          y: -100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 3, // After loader
        },
      )
    }, navRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isMenuOpen) {
        // Open menu animation
        gsap.fromTo(
          menuRef.current,
          {
            opacity: 0,
            scale: 0.8,
            y: -20,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
        )

        gsap.fromTo(
          ".menu-item",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.1,
          },
        )
      } else {
        // Close menu animation
        gsap.to(menuRef.current, {
          opacity: 0,
          scale: 0.8,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
        })
      }
    }, menuRef)

    return () => ctx.revert()
  }, [isMenuOpen])

  const menuItems = [
    { name: "Boats", href: "#boats", icon: <Ship className="w-4 h-4 mr-2" /> },
    { name: "Destinations", href: "#destinations", icon: <Anchor className="w-4 h-4 mr-2" /> },
    { name: "Search", href: "#search", icon: <Search className="w-4 h-4 mr-2" /> },
    { name: "Account", href: "#account", icon: <User className="w-4 h-4 mr-2" /> },
  ]

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <span className="text-white">Luxury</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Boats</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-blue-400 transition-colors duration-300 flex items-center"
                data-cursor="link"
              >
                {item.icon}
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-8 h-8 flex flex-col justify-center items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-cursor="button"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed top-20 right-4 z-30 bg-[#0a192f]/90 backdrop-blur-sm rounded-lg p-6 md:hidden"
        >
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="menu-item flex items-center text-white hover:text-blue-400 transition-colors duration-300 py-2"
              onClick={() => setIsMenuOpen(false)}
              data-cursor="link"
            >
              {item.icon}
              {item.name}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
