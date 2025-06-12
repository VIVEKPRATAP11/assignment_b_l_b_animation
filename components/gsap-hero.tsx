"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Calendar, MapPin, Search, ChevronDown } from "lucide-react"

export default function GSAPHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const yachtImageRef = useRef<HTMLImageElement>(null)
  const statsCard1Ref = useRef<HTMLDivElement>(null)
  const statsCard2Ref = useRef<HTMLDivElement>(null)
  const orbsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current, searchRef.current], {
        opacity: 0,
        y: 50,
      })

      gsap.set(imageRef.current, {
        opacity: 0,
        x: 100,
        scale: 0.8,
      })

      // Create entrance timeline
      const tl = gsap.timeline({ delay: 0.5 })

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      })
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .to(
          searchRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .to(
          imageRef.current,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6",
        )

      // Animate floating orbs
      orbsRef.current.forEach((orb, index) => {
        if (orb) {
          gsap.to(orb, {
            y: "random(-20, 20)",
            x: "random(-20, 20)",
            duration: "random(3, 5)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.2,
          })
        }
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Mouse movement parallax effect
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      // Calculate mouse position as percentage from center
      const xPercent = (clientX / innerWidth - 0.5) * 2 // -1 to 1
      const yPercent = (clientY / innerHeight - 0.5) * 2 // -1 to 1

      // Animate yacht image with parallax
      if (yachtImageRef.current) {
        gsap.to(yachtImageRef.current, {
          x: xPercent * 30,
          y: yPercent * 20,
          rotationY: xPercent * 5,
          rotationX: -yPercent * 3,
          duration: 1,
          ease: "power2.out",
        })
      }

      // Animate stats cards with different intensities
      if (statsCard1Ref.current) {
        gsap.to(statsCard1Ref.current, {
          x: xPercent * 20,
          y: yPercent * 15,
          rotation: xPercent * 2,
          duration: 1.2,
          ease: "power2.out",
        })
      }

      if (statsCard2Ref.current) {
        gsap.to(statsCard2Ref.current, {
          x: xPercent * -15,
          y: yPercent * -10,
          rotation: xPercent * -1.5,
          duration: 1.2,
          ease: "power2.out",
        })
      }

      // Animate floating orbs with mouse movement
      orbsRef.current.forEach((orb, index) => {
        if (orb) {
          const intensity = (index + 1) * 5
          gsap.to(orb, {
            x: xPercent * intensity,
            y: yPercent * intensity,
            duration: 1.5,
            ease: "power2.out",
          })
        }
      })

      // Animate title with subtle movement
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          x: xPercent * 5,
          y: yPercent * 3,
          duration: 1.5,
          ease: "power2.out",
        })
      }

      // Animate subtitle with different movement
      if (subtitleRef.current) {
        gsap.to(subtitleRef.current, {
          x: xPercent * 3,
          y: yPercent * 2,
          duration: 1.8,
          ease: "power2.out",
        })
      }
    }

    // Add mouse move listener
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-teal-400/20" />

        {/* Floating Orbs */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) orbsRef.current[i] = el
            }}
            className={`absolute rounded-full blur-xl opacity-30 ${
              i % 3 === 0 ? "bg-blue-400" : i % 3 === 1 ? "bg-cyan-400" : "bg-teal-400"
            }`}
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml,%3Csvg viewBox=&quot;0 0 256 256&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cfilter id=&quot;noiseFilter&quot;%3E%3CfeTurbulence type=&quot;fractalNoise&quot; baseFrequency=&quot;0.9&quot; numOctaves=&quot;4&quot; stitchTiles=&quot;stitch&quot;/%3E%3C/filter%3E%3Crect width=&quot;100%25&quot; height=&quot;100%25&quot; filter=&quot;url(%23noiseFilter)&quot;/%3E%3C/svg%3E')]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Premium Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium text-blue-300">Premium Yacht Rentals</span>
            </div>

            {/* Main Title */}
            <h1 ref={titleRef} className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                Book Luxury
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Boat
              </span>
            </h1>

            {/* Subtitle */}
            <p ref={subtitleRef} className="text-xl lg:text-2xl text-blue-100/80 mb-8 max-w-2xl">
              Experience luxury on the water with our premium yacht collection. Discover unparalleled comfort and
              elegance.
            </p>

            {/* Search Form */}
            <div
              ref={searchRef}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl"
            >
              <div className="grid md:grid-cols-3 gap-4">
                {/* Location Input */}
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                  <Input
                    placeholder="Destination"
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200/60 focus:border-blue-400 h-12"
                  />
                </div>

                {/* Date Input */}
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                  <Input
                    type="date"
                    className="pl-10 bg-white/10 border-white/20 text-white focus:border-blue-400 h-12"
                  />
                </div>

                {/* Search Button */}
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold h-12 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Search className="w-5 h-5 mr-2" />
                  Search Yachts
                </Button>
              </div>
            </div>
          </div>

          {/* Right Content - Yacht Image */}
          <div ref={imageRef} className="relative" style={{ perspective: "1000px" }}>
            <div className="relative">
              {/* Main Yacht Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  ref={yachtImageRef}
                  src="https://img.getmyboat.com/images/4e92dec8-619a-49ee-8811-6c9064bf8715/-processed.jpg"
                  alt="Luxury Yacht"
                  className="w-full h-auto object-cover transition-transform duration-300"
                  style={{ transformStyle: "preserve-3d" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent pointer-events-none" />
              </div>

              {/* Floating Stats Cards */}
              <div
                ref={statsCard1Ref}
                className="absolute -top-4 -left-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="text-2xl font-bold text-white">150+</div>
                <div className="text-sm text-blue-200">Premium Yachts</div>
              </div>

              <div
                ref={statsCard2Ref}
                className="absolute -bottom-4 -right-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-blue-200">Concierge</div>
              </div>
            </div>
          </div>
        </div>

      </div>
        {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center z-20">
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-400 mb-2 tracking-wider uppercase">Explore our fleet</p>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{
                y: [0, 12, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          </div>
        </div>
      
      </div>
    </section>
  )
}
