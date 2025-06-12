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
  {
    id: 5,
    title: "Sunset Cruiser 32",
    description:
      "Compact yet luxurious, this yacht is perfect for intimate gatherings and sunset cruises. Featuring smart space utilization, premium finishes, and excellent fuel efficiency.",
    price: "$750/day",
    originalPrice: "$900/day",
    specs: {
      length: "32 ft",
      capacity: 6,
      cabins: 1,
      location: "Key West, FL",
    },
    features: ["Bluetooth Audio", "Swim Platform", "Cooler", "Sunpad", "Shower"],
    rating: 4.6,
    reviews: 142,
    imageUrl:
      "https://img.getmyboat.com/images/5ad2fad1a276d/boat-rentals-eivissa-illes-balears-lagoon-450-processed.jpg",
    badge: {
      text: "Best Value",
      color: "bg-green-500",
    },
  },
  {
    id: 6,
    title: "Ocean Voyager 50",
    description:
      "Designed for extended voyages, this yacht combines comfort with performance. Featuring spacious living areas, advanced navigation systems, and excellent fuel range.",
    price: "$2,100/day",
    specs: {
      length: "50 ft",
      capacity: 12,
      cabins: 3,
      location: "Seattle, WA",
    },
    features: ["Autopilot", "Solar Panels", "Desalination System", "Satellite Phone", "Deep Freezer"],
    rating: 4.8,
    reviews: 79,
    imageUrl: "https://img.getmyboat.com/images/62c12837919e7/-processed.jpg",
  },
]

export default function StickyBoatShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !stickyRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const containerTop = containerRect.top
      const containerHeight = containerRect.height
      const windowHeight = window.innerHeight

      // Check if container is in view
      if (containerTop > windowHeight || containerTop + containerHeight < 0) {
        return
      }

      // Calculate progress through the container
      const scrollProgress = Math.max(0, -containerTop / (containerHeight - windowHeight))

      // Calculate which boat should be active based on scroll progress
      const newIndex = Math.min(Math.floor(scrollProgress * boatItems.length), boatItems.length - 1)

      if (newIndex !== activeIndex && newIndex >= 0) {
        setActiveIndex(newIndex)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
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
        <div ref={stickyRef} className="sticky top-0 h-screen flex items-center justify-center z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20">
              <div className="flex flex-col lg:flex-row">
                {/* Content Section */}
                <div className="flex-1 p-8 lg:p-12 space-y-6">
                  {/* Badge */}
                  {currentItem.badge && (
                    <div className="inline-block">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold text-white ${currentItem.badge.color}`}
                      >
                        {currentItem.badge.text}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-3xl lg:text-4xl font-bold text-white">{currentItem.title}</h3>

                  {/* Rating */}
                  <div className="flex items-center">
                    <div className="flex text-lg">{renderStars(currentItem.rating)}</div>
                    <span className="ml-2 text-gray-300">({currentItem.reviews} reviews)</span>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-gray-300 leading-relaxed">{currentItem.description}</p>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 rounded-lg bg-white/10">
                      <p className="text-sm text-gray-400 mb-1">Length</p>
                      <p className="text-lg font-semibold text-white">{currentItem.specs.length}</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-white/10">
                      <p className="text-sm text-gray-400 mb-1">Capacity</p>
                      <p className="text-lg font-semibold text-white">{currentItem.specs.capacity}</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-white/10">
                      <p className="text-sm text-gray-400 mb-1">Cabins</p>
                      <p className="text-lg font-semibold text-white">{currentItem.specs.cabins}</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-white/10">
                      <p className="text-sm text-gray-400 mb-1">Location</p>
                      <p className="text-lg font-semibold text-white">{currentItem.specs.location}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {currentItem.features.map((feature, index) => (
                      <span
                        key={`${currentItem.id}-${feature}-${index}`}
                        className="px-4 py-2 bg-white/10 text-gray-200 rounded-full text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-white">{currentItem.price}</span>
                      {currentItem.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">{currentItem.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
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
                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg font-medium hover:from-blue-600 hover:to-cyan-500 transition-all shadow-lg"
                        data-cursor="button"
                        data-cursor-text="Book"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Image Section */}
                <div className="w-full lg:w-96 h-64 lg:h-auto flex-shrink-0 relative overflow-hidden">
                  <img
                    src={currentItem.imageUrl || "/placeholder.svg"}
                    alt={currentItem.title}
                    className="w-full h-full object-cover transition-all duration-700"
                    key={`image-${activeIndex}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
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
  )
}
