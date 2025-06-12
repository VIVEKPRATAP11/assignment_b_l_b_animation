"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import { motion } from "framer-motion"
import { MapPin, Star, Users, Calendar, ArrowRight, Heart, Share2 } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

interface Destination {
  id: number
  name: string
  location: string
  description: string
  boatCount: number
  imageUrl: string
  rating: number
  reviews: number
  price: number
  category: string
  featured: boolean
}
const destinations: Destination[] = [
  {
    id: 1,
    name: "Miami Beach",
    location: "Florida, USA",
    description:
      "Crystal clear waters and vibrant nightlife make Miami a premier boating destination with world-class marinas.",
    boatCount: 48,
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    rating: 4.8,
    reviews: 324,
    price: 299,
    category: "Luxury",
    featured: true,
  },
  {
    id: 2,
    name: "Amalfi Coast",
    location: "Italy",
    description:
      "Explore the dramatic cliffs and picturesque villages of Italy's stunning coastline with breathtaking views.",
    boatCount: 36,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    rating: 4.9,
    reviews: 256,
    price: 450,
    category: "Premium",
    featured: true,
  },
  {
    id: 3,
    name: "French Riviera",
    location: "France",
    description:
      "Experience the glamour and beauty of the Mediterranean's most luxurious coastline and exclusive ports.",
    boatCount: 52,
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    rating: 4.7,
    reviews: 189,
    price: 520,
    category: "Luxury",
    featured: false,
  },
  {
    id: 4,
    name: "Santorini",
    location: "Greece",
    description:
      "Sail around the iconic white-washed buildings and volcanic landscapes of this Mediterranean paradise.",
    boatCount: 29,
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop",
    rating: 4.6,
    reviews: 142,
    price: 380,
    category: "Premium",
    featured: false,
  },
  {
    id: 5,
    name: "Bali",
    location: "Indonesia",
    description: "Discover tropical paradise with Bali's stunning beaches, vibrant marine life, and cultural richness.",
    boatCount: 33,
    imageUrl: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop",
    rating: 4.5,
    reviews: 98,
    price: 220,
    category: "Adventure",
    featured: false,
  },
  {
    id: 6,
    name: "Sydney Harbour",
    location: "Australia",
    description: "Navigate one of the world's most beautiful harbors with iconic views of the Opera House and Bridge.",
    boatCount: 41,
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    rating: 4.8,
    reviews: 267,
    price: 340,
    category: "Premium",
    featured: true,
  },
]

export default function DestinationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      })

      // Split text animation for title
      const titleWords = titleRef.current?.textContent?.split(" ") || []
      if (titleRef.current) {
        titleRef.current.innerHTML = titleWords
          .map((word, i) => `<span class="word-${i} inline-block">${word}</span>`)
          .join(" ")
      }

      // Animate title words
      tl.fromTo(
        titleWords.map((_, i) => `.word-${i}`),
        {
          y: 100,
          rotationX: -90,
          opacity: 0,
          transformOrigin: "50% 50% -50px",
        },
        {
          y: 0,
          rotationX: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
      )

      // Animate subtitle with typewriter effect
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3",
      )

      // Animate decorative line
      tl.fromTo(
        ".title-line",
        { width: 0, opacity: 0 },
        {
          width: "6rem",
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.2",
      )

      // Cards entrance animation
      gsap.fromTo(
        ".destination-card",
        {
          y: 120,
          opacity: 0,
          rotationY: -15,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          scale: 1,
          duration: 1,
          stagger: {
            amount: 0.6,
            from: "start",
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Enhanced parallax for images
      gsap.utils.toArray<HTMLElement>(".destination-image").forEach((image, i) => {
        gsap.to(image, {
          y: -50,
          rotation: i % 2 === 0 ? 1 : -1,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })
      })

      // Background orbs animation
      gsap.to(".bg-orb-1", {
        x: 100,
        y: -50,
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      })

      gsap.to(".bg-orb-2", {
        x: -80,
        y: 60,
        rotation: -360,
        duration: 25,
        repeat: -1,
        ease: "none",
      })

      // CTA button animation
      gsap.fromTo(
        ctaRef.current,
        {
          y: 50,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleCardHover = (cardId: number, isHovering: boolean) => {
    setHoveredCard(isHovering ? cardId : null)

    if (isHovering) {
      gsap.to(`.card-${cardId} .card-content`, {
        y: -10,
        duration: 0.3,
        ease: "power2.out",
      })
      gsap.to(`.card-${cardId} .card-image`, {
        scale: 1.1,
        rotation: 2,
        duration: 0.6,
        ease: "power2.out",
      })
      gsap.to(`.card-${cardId} .card-overlay`, {
        opacity: 0.9,
        duration: 0.3,
      })
    } else {
      gsap.to(`.card-${cardId} .card-content`, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      })
      gsap.to(`.card-${cardId} .card-image`, {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: "power2.out",
      })
      gsap.to(`.card-${cardId} .card-overlay`, {
        opacity: 0.7,
        duration: 0.3,
      })
    }
  }

  return (
    <section
      id="destinations"
      ref={sectionRef}
      className="py-32 md:py-40 px-4 md:px-8 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-orb-1 absolute top-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-[120px]" />
        <div className="bg-orb-2 absolute bottom-1/4 left-1/4 w-[25vw] h-[25vw] rounded-full bg-gradient-to-r from-purple-600/15 to-blue-600/15 blur-[100px]" />

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced section header */}
        <div className="mb-20 md:mb-28 text-center">
          <div className="mb-6">
            <span className="px-4 py-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium">
              ✨ Discover Amazing Places
            </span>
          </div>

          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent"
            style={{ perspective: "1000px" }}
          >
            Popular Destinations
          </h2>

          <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore the world's most breathtaking waterways and coastal paradises where luxury meets adventure
          </p>

          <div className="title-line h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 mx-auto mt-8 rounded-full" />
        </div>

        {/* Enhanced destinations grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              className={`destination-card card-${destination.id} group relative overflow-hidden rounded-2xl h-[420px] cursor-pointer`}
              onMouseEnter={() => handleCardHover(destination.id, true)}
              onMouseLeave={() => handleCardHover(destination.id, false)}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Featured badge */}
              {destination.featured && (
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold rounded-full shadow-lg">
                    ⭐ Featured
                  </span>
                </div>
              )}

              {/* Action buttons */}
              <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                  <Heart className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                  <Share2 className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Enhanced image container */}
              <div className="card-image absolute inset-0 w-full h-full">
                <img
                  src={destination.imageUrl || "/placeholder.svg"}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              </div>

              {/* Enhanced gradient overlay */}
              <div className="card-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />

              {/* Enhanced content */}
              <div className="card-content absolute inset-0 p-6 flex flex-col justify-end">
                {/* Location and rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-blue-400" />
                    <span className="text-sm text-gray-300">{destination.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                    <span className="text-sm text-white font-medium">{destination.rating}</span>
                    <span className="text-xs text-gray-400 ml-1">({destination.reviews})</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
                  {destination.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-300 mb-4 line-clamp-2 leading-relaxed">{destination.description}</p>

                {/* Stats and pricing */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-gray-400" />
                      <span className="text-sm text-gray-400">{destination.boatCount} boats</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                      <span className="text-sm text-gray-400">Available</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-white">${destination.price}</span>
                    <span className="text-sm text-gray-400">/day</span>
                  </div>
                </div>

                {/* Category badge and CTA */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      destination.category === "Luxury"
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                        : destination.category === "Premium"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : "bg-green-500/20 text-green-300 border border-green-500/30"
                    }`}
                  >
                    {destination.category}
                  </span>

                  <button className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105">
                    Explore
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA section */}
        <div ref={ctaRef} className="text-center">
          <motion.button
            className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 text-white font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center">
              Explore All Destinations
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          <p className="text-gray-400 mt-4 text-sm">Discover over 200+ destinations worldwide</p>
        </div>
      </div>
    </section>
  )
}
