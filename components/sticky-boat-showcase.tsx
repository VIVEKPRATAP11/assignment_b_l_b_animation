"use client"

import { useState, useEffect, useRef } from "react"

interface BoatItem {
  id: number
  title: string
  description: string
  price: string
  originalPrice?: string
  specs: {
    length: string
    capacity: number
    cabins: number
    location: string
  }
  features: string[]
  rating: number
  reviews: number
  imageUrl: string
  badge?: {
    text: string
    color: string
  }
}

const boatItems: BoatItem[] = [
  {
    id: 1,
    title: "Oceanic Voyager 42",
    description:
      "Experience luxury on the water with this premium yacht featuring spacious decks, state-of-the-art navigation, and elegant interiors designed for the ultimate sailing experience.",
    price: "$1,200/day",
    originalPrice: "$1,500/day",
    specs: {
      length: "42 ft",
      capacity: 10,
      cabins: 3,
      location: "Miami, FL",
    },
    features: ["Jacuzzi", "Underwater Lights", "Premium Sound System", "Water Toys", "Gourmet Kitchen"],
    rating: 4.9,
    reviews: 124,
    imageUrl: "https://img.getmyboat.com/images/6217c44dd3dc7/-processed.jpg",
    badge: {
      text: "Most Popular",
      color: "bg-blue-500",
    },
  },
  {
    id: 2,
    title: "Azure Horizon 55",
    description:
      "Discover the perfect blend of performance and luxury with this sleek yacht. Featuring panoramic views, premium finishes, and powerful engines for an unforgettable ocean adventure.",
    price: "$2,400/day",
    specs: {
      length: "55 ft",
      capacity: 15,
      cabins: 4,
      location: "San Diego, CA",
    },
    features: ["Flybridge", "Stabilizers", "Beach Club", "Wine Cellar", "Satellite TV"],
    rating: 4.8,
    reviews: 87,
    imageUrl: "https://img.getmyboat.com/images/624c2967a3a88/-processed.JPG",
    badge: {
      text: "Luxury",
      color: "bg-purple-500",
    },
  },
  {
    id: 3,
    title: "Coastal Explorer 38",
    description:
      "Perfect for day trips and coastal exploration, this versatile yacht offers excellent handling, fuel efficiency, and comfortable accommodations for memorable journeys along the shoreline.",
    price: "$950/day",
    originalPrice: "$1,100/day",
    specs: {
      length: "38 ft",
      capacity: 8,
      cabins: 2,
      location: "Newport, RI",
    },
    features: ["Fishing Equipment", "Snorkeling Gear", "Paddleboards", "Outdoor Grill", "Shower"],
    rating: 4.7,
    reviews: 103,
    imageUrl: "https://img.getmyboat.com/images/ba2fa045-0bce-4077-8600-a68a3a132287/-processed.jpg",
  },
  {
    id: 4,
    title: "Majestic Wave 65",
    description:
      "The ultimate luxury yacht experience with expansive entertainment areas, premium finishes, and cutting-edge technology. Perfect for hosting exclusive events or extended voyages.",
    price: "$3,800/day",
    specs: {
      length: "65 ft",
      capacity: 20,
      cabins: 5,
      location: "Los Angeles, CA",
    },
    features: ["Helipad", "Infinity Pool", "Cinema Room", "Gym", "Master Suite"],
    rating: 5.0,
    reviews: 56,
    imageUrl: "https://img.getmyboat.com/images/62a2e86557ca6/-processed.jpg",
    badge: {
      text: "Ultra Luxury",
      color: "bg-indigo-500",
    },
  },
]

export default function StickyBoatShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [cardProgress, setCardProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        if (!containerRef.current) return

        const containerRect = containerRef.current.getBoundingClientRect()
        const containerTop = containerRect.top
        const containerHeight = containerRect.height
        const windowHeight = window.innerHeight

        // Check if container is in view
        if (containerTop > windowHeight || containerTop + containerHeight < 0) {
          return
        }

        // Calculate smooth progress (0 to 1)
        const rawProgress = Math.max(0, Math.min(1, -containerTop / (containerHeight - windowHeight)))

        // Apply easing for smoother transitions
        const easedProgress = rawProgress * rawProgress * (3 - 2 * rawProgress) // smoothstep

        setScrollProgress(easedProgress)

        // Calculate which boat should be active with hysteresis to prevent flickering
        const exactIndex = easedProgress * (boatItems.length - 1)
        const newIndex = Math.round(exactIndex)

        // Calculate progress within current card section
        const sectionProgress = exactIndex % 1
        const currentCardProgress = newIndex === activeIndex ? sectionProgress : 0
        setCardProgress(currentCardProgress)

        if (newIndex !== activeIndex && newIndex >= 0 && newIndex < boatItems.length) {
          // Add small delay to prevent rapid switching
          setTimeout(() => setActiveIndex(newIndex), 50)
        }
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [activeIndex])

  const currentItem = boatItems[activeIndex]

  // Generate star rating display
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`star-${i}`} className="text-yellow-400">
          ★
        </span>,
      )
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half-star" className="text-yellow-400">
          ★
        </span>,
      )
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          ★
        </span>,
      )
    }

    return stars
  }

  return (
    <>
      <style jsx global>{`
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        #fleet-showcase {
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 30px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translate3d(50px, 0, 0) scale(1.2);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1.1);
          }
        }
      `}</style>
      <section id="fleet-showcase" className="bg-[#0a192f] relative">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="text-white">Explore Our </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Fleet</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our premium selection of luxury yachts available for charter
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mt-6 mx-auto" />
          </div>
        </div>

        {/* Sticky Container */}
        <div ref={containerRef} className="relative" style={{ height: `${boatItems.length * 100}vh` }}>
          {/* Sticky Card */}
          <div
            ref={stickyRef}
            className="sticky top-0 h-screen flex items-center justify-center z-10"
            style={{
              willChange: "transform",
              transform: "translate3d(0, 0, 0)", // Force hardware acceleration
            }}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div
                className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20 relative"
                style={{
                  willChange: "transform, opacity",
                  transform: `translate3d(0, ${Math.sin(scrollProgress * Math.PI) * -10}px, 0) scale(${0.95 + scrollProgress * 0.05})`,
                  transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out",
                }}
              >
                {/* Card Progress Indicator - Top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-20">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 ease-out"
                    style={{
                      width: `${((activeIndex + 1) / boatItems.length) * 100}%`,
                      boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
                    }}
                  />
                </div>

                {/* Card Progress Indicator - Side */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/10 z-20">
                  <div
                    className="w-full bg-gradient-to-b from-blue-500 to-cyan-400 transition-all duration-300 ease-out"
                    style={{
                      height: `${((activeIndex + 1) / boatItems.length) * 100}%`,
                      boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
                    }}
                  />
                </div>

                {/* Card Number Indicator */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-2">
                    <span className="text-white text-sm font-medium">
                      {activeIndex + 1} / {boatItems.length}
                    </span>
                    <div className="w-8 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 ease-out"
                        style={{ width: `${((activeIndex + 1) / boatItems.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row">
                  {/* Content Section */}
                  <div
                    className="flex-1 p-8 lg:p-12 space-y-6"
                    style={{
                      willChange: "transform",
                      transform: "translate3d(0, 0, 0)",
                    }}
                  >
                    {/* Badge */}
                    {currentItem.badge && (
                      <div
                        className="inline-block"
                        style={{
                          willChange: "transform, opacity",
                          transform: "translate3d(0, 0, 0)",
                          animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
                        }}
                      >
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold text-white ${currentItem.badge.color}`}
                        >
                          {currentItem.badge.text}
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h3
                      className="text-3xl lg:text-4xl font-bold text-white"
                      style={{
                        willChange: "transform, opacity",
                        transform: "translate3d(0, 0, 0)",
                        animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both",
                      }}
                    >
                      {currentItem.title}
                    </h3>

                    {/* Rating */}
                    <div
                      className="flex items-center"
                      style={{
                        willChange: "transform, opacity",
                        transform: "translate3d(0, 0, 0)",
                        animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both",
                      }}
                    >
                      <div className="flex text-lg">{renderStars(currentItem.rating)}</div>
                      <span className="ml-2 text-gray-300">({currentItem.reviews} reviews)</span>
                    </div>

                    {/* Description */}
                    <p
                      className="text-lg text-gray-300 leading-relaxed"
                      style={{
                        willChange: "transform, opacity",
                        transform: "translate3d(0, 0, 0)",
                        animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both",
                      }}
                    >
                      {currentItem.description}
                    </p>

                    {/* Specs Grid */}
                    <div
                      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                      style={{
                        willChange: "transform, opacity",
                        transform: "translate3d(0, 0, 0)",
                      }}
                    >
                      {[
                        { label: "Length", value: currentItem.specs.length },
                        { label: "Capacity", value: currentItem.specs.capacity },
                        { label: "Cabins", value: currentItem.specs.cabins },
                        { label: "Location", value: currentItem.specs.location },
                      ].map((spec, index) => (
                        <div
                          key={spec.label}
                          className="text-center p-4 rounded-lg bg-white/10 hover:bg-white/20 relative overflow-hidden"
                          style={{
                            willChange: "transform, opacity",
                            transform: "translate3d(0, 0, 0)",
                            animation: `fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + index * 0.1}s both`,
                            transition: "background-color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translate3d(0, -2px, 0) scale(1.02)"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translate3d(0, 0, 0) scale(1)"
                          }}
                        >
                          {/* Mini progress indicator for each spec */}
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 ease-out"
                              style={{
                                width: `${((activeIndex + 1) / boatItems.length) * 100}%`,
                                transitionDelay: `${index * 100}ms`,
                              }}
                            />
                          </div>
                          <p className="text-sm text-gray-400 mb-1">{spec.label}</p>
                          <p className="text-lg font-semibold text-white">{spec.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {currentItem.features.map((feature, index) => (
                        <span
                          key={`${currentItem.id}-${feature}-${index}`}
                          className="px-4 py-2 bg-white/10 text-gray-200 rounded-full text-sm font-medium hover:bg-white/20 relative overflow-hidden"
                          style={{
                            willChange: "transform, opacity",
                            transform: "translate3d(0, 0, 0)",
                            animation: `fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.8 + index * 0.1}s both`,
                            transition: "background-color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translate3d(0, -1px, 0) scale(1.05)"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translate3d(0, 0, 0) scale(1)"
                          }}
                        >
                          {/* Feature progress indicator */}
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700 ease-out"
                              style={{
                                width: `${((activeIndex + 1) / boatItems.length) * 100}%`,
                                transitionDelay: `${index * 150}ms`,
                              }}
                            />
                          </div>
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Price and CTA */}
                    <div
                      className="flex items-center justify-between pt-4"
                      style={{
                        willChange: "transform, opacity",
                        transform: "translate3d(0, 0, 0)",
                        animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.2s both",
                      }}
                    >
                      <div className="flex flex-col">
                        <span className="text-3xl font-bold text-white">{currentItem.price}</span>
                        {currentItem.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">{currentItem.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          className="p-3 rounded-full bg-white/10 hover:bg-white/20"
                          style={{
                            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                            willChange: "transform",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translate3d(0, -2px, 0) scale(1.1)"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translate3d(0, 0, 0) scale(1)"
                          }}
                          data-cursor="button"
                          data-cursor-text="Like"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                        <button
                          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg font-medium hover:from-blue-600 hover:to-cyan-500 shadow-lg"
                          style={{
                            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                            willChange: "transform",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translate3d(0, -2px, 0) scale(1.05)"
                            e.currentTarget.style.boxShadow =
                              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translate3d(0, 0, 0) scale(1)"
                            e.currentTarget.style.boxShadow =
                              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                          }}
                          data-cursor="button"
                          data-cursor-text="Book"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Image Section */}
                  <div
                    className="w-full lg:w-96 h-64 lg:h-auto flex-shrink-0 relative overflow-hidden"
                    style={{
                      willChange: "transform",
                    }}
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={currentItem.imageUrl || "/placeholder.svg"}
                        alt={currentItem.title}
                        className="w-full h-full object-cover"
                        style={{
                          willChange: "transform, opacity",
                          transform: `translate3d(0, 0, 0) scale(${1.1 + scrollProgress * 0.1})`,
                          transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out",
                          animation: "slideInRight 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both",
                        }}
                        key={`image-${activeIndex}`}
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                        style={{
                          transition: "opacity 0.8s ease-out",
                        }}
                      />

                      {/* Image Progress Overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white text-sm font-medium">Viewing</span>
                            <span className="text-white text-sm">
                              {activeIndex + 1}/{boatItems.length}
                            </span>
                          </div>
                          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 ease-out"
                              style={{ width: `${((activeIndex + 1) / boatItems.length) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <div className="flex space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
              {boatItems.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "w-8 bg-blue-500" : "bg-gray-400 hover:bg-gray-300"
                  }`}
                  data-cursor="button"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] rounded-full bg-blue-600/10 blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[25vw] h-[25vw] rounded-full bg-cyan-600/10 blur-[100px]" />
        </div>
      </section>
    </>
  )
}
